const tripModel = require('../models/trip.model');
const tripStopModel = require('../models/tripStop.model');
const tripStopActivityModel = require('../models/tripStopActivity.model');

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

async function addStop(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const { cityId, startDate, endDate, budgetForSection } = req.body;

    await verifyTripOwnership(tripId, req.user.id);

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

    await verifyTripOwnership(tripId, req.user.id);
    await verifyStopBelongsToTrip(stopId, tripId);

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