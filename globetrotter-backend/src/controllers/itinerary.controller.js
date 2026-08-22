const tripModel = require('../models/trip.model');
const tripStopModel = require('../models/tripStop.model');
const tripStopActivityModel = require('../models/tripStopActivity.model');
const cityModel = require('../models/city.model');
const activityModel = require('../models/activity.model');

async function verifyTripOwnership(tripId, userId) {
  const trip = await tripModel.findTripById(tripId, userId);
  if (!trip) {
    const err = new Error('Trip not found or access denied');
    err.statusCode = 404;
    throw err;
  }
  return trip;
}

async function verifyStopBelongsToTrip(stopId, tripId) {
  const stop = await tripStopModel.findStopById(stopId);
  if (!stop || stop.tripId !== tripId) {
    const err = new Error('Stop not found on this trip');
    err.statusCode = 404;
    throw err;
  }
  return stop;
}

async function verifyCityExists(cityId) {
  const city = await cityModel.findCityById(cityId);
  if (!city) {
    const err = new Error('City not found');
    err.statusCode = 404;
    throw err;
  }
  return city;
}

async function verifyActivityExists(activityId) {
  const activity = await activityModel.findActivityById(activityId);
  if (!activity) {
    const err = new Error('Activity not found');
    err.statusCode = 404;
    throw err;
  }
  return activity;
}

function assertDateOrderValid(startDate, endDate) {
  if (startDate === undefined || endDate === undefined) return;
  if (new Date(endDate) < new Date(startDate)) {
    const err = new Error('endDate cannot be before startDate');
    err.statusCode = 400;
    throw err;
  }
}

async function addStop(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const { cityId, startDate, endDate, budgetForSection } = req.body;

    const trip = await verifyTripOwnership(tripId, req.user.id);
    await verifyCityExists(cityId);
    assertDateOrderValid(startDate, endDate);

    // Keep each stop's dates inside the parent trip's date range.
    if (new Date(startDate) < new Date(trip.startDate) || new Date(endDate) > new Date(trip.endDate)) {
      const err = new Error('Stop dates must fall within the trip date range');
      err.statusCode = 400;
      throw err;
    }

    const stop = await tripStopModel.createStop(tripId, {
      cityId,
      startDate,
      endDate,
      budgetForSection,
    });

    return res.status(201).json(stop);
  } catch (err) {
    return next(err);
  }
}

async function updateStop(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const stopId = Number(req.params.stopId);
    const { cityId, startDate, endDate } = req.body;

    const trip = await verifyTripOwnership(tripId, req.user.id);
    const existingStop = await verifyStopBelongsToTrip(stopId, tripId);

    if (cityId !== undefined) {
      await verifyCityExists(cityId);
    }

    // Validate the effective date range (fall back to existing values for
    // whichever side of the range wasn't included in this update).
    const effectiveStart = startDate !== undefined ? startDate : existingStop.startDate;
    const effectiveEnd = endDate !== undefined ? endDate : existingStop.endDate;
    assertDateOrderValid(effectiveStart, effectiveEnd);

    if (new Date(effectiveStart) < new Date(trip.startDate) || new Date(effectiveEnd) > new Date(trip.endDate)) {
      const err = new Error('Stop dates must fall within the trip date range');
      err.statusCode = 400;
      throw err;
    }

    const updatedStop = await tripStopModel.updateStop(stopId, req.body);

    return res.status(200).json(updatedStop);
  } catch (err) {
    return next(err);
  }
}

async function deleteStop(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const stopId = Number(req.params.stopId);

    await verifyTripOwnership(tripId, req.user.id);
    await verifyStopBelongsToTrip(stopId, tripId);

    await tripStopModel.deleteStop(stopId);

    return res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (err) {
    return next(err);
  }
}

async function reorderStops(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);

    await verifyTripOwnership(tripId, req.user.id);

    const reorderedStops = await tripStopModel.reorderStops(tripId, req.body.stops);

    return res.status(200).json(reorderedStops);
  } catch (err) {
    return next(err);
  }
}

async function addActivity(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const stopId = Number(req.params.stopId);
    const { activityId, scheduledDate, scheduledTime, costOverride } = req.body;

    await verifyTripOwnership(tripId, req.user.id);
    await verifyStopBelongsToTrip(stopId, tripId);
    await verifyActivityExists(activityId);

    const activityRow = await tripStopActivityModel.attachActivity(stopId, {
      activityId,
      scheduledDate,
      scheduledTime,
      costOverride,
    });

    return res.status(201).json(activityRow);
  } catch (err) {
    return next(err);
  }
}

async function removeActivity(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const stopId = Number(req.params.stopId);
    const activityId = Number(req.params.activityId);

    await verifyTripOwnership(tripId, req.user.id);
    await verifyStopBelongsToTrip(stopId, tripId);

    await tripStopActivityModel.removeActivity(stopId, activityId);

    return res.status(200).json({ message: 'Activity removed successfully' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  addStop,
  updateStop,
  deleteStop,
  reorderStops,
  addActivity,
  removeActivity,
};