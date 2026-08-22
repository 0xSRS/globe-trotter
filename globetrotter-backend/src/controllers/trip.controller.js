const tripModel = require('../models/trip.model');
const computeTripStatus = require('../utils/tripStatus.util');

function assertDateOrderValid(startDate, endDate) {
  if (startDate === undefined || endDate === undefined) return;
  if (new Date(endDate) < new Date(startDate)) {
    const err = new Error('endDate cannot be before startDate');
    err.statusCode = 400;
    throw err;
  }
}

async function createTrip(req, res, next) {
  try {
    const { name, startDate, endDate, description, coverPhoto } = req.body;

    assertDateOrderValid(startDate, endDate);

    const trip = await tripModel.createTrip(req.user.id, {
      name,
      startDate,
      endDate,
      description,
      coverPhoto,
    });

    return res.status(201).json(trip);
  } catch (err) {
    return next(err);
  }
}

async function getTrips(req, res, next) {
  try {
    let trips = await tripModel.findTripsByUser(req.user.id);

    trips = trips.map((trip) => ({
      ...trip,
      status: computeTripStatus(trip),
    }));

    if (req.query.status) {
      trips = trips.filter((trip) => trip.status === req.query.status);
    }

    if (req.query.sortBy === 'startDate') {
      trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    if (req.query.groupBy === 'status') {
      const grouped = trips.reduce((acc, trip) => {
        if (!acc[trip.status]) {
          acc[trip.status] = [];
        }
        acc[trip.status].push(trip);
        return acc;
      }, {});
      return res.status(200).json(grouped);
    }

    return res.status(200).json(trips);
  } catch (err) {
    return next(err);
  }
}

async function getTripById(req, res, next) {
  try {
    const tripId = Number(req.params.id);
    const trip = await tripModel.findTripById(tripId, req.user.id);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found', statusCode: 404 });
    }

    trip.status = computeTripStatus(trip);

    return res.status(200).json(trip);
  } catch (err) {
    return next(err);
  }
}

async function updateTrip(req, res, next) {
  try {
    const tripId = Number(req.params.id);

    // Only forward fields the user is actually allowed to change via this
    // endpoint. Without this whitelist, req.body was being spread straight
    // into the Prisma update, letting a caller inject columns like userId,
    // isPublic, or shareSlug that were never validated by the route.
    const { name, startDate, endDate, description, coverPhoto } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (description !== undefined) updateData.description = description;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;

    // If only one side of the range is being changed, validate against the
    // existing trip's other date so a partial update can't invert the range.
    const existingTrip = await tripModel.findTripById(tripId, req.user.id);
    if (!existingTrip) {
      const err = new Error('Trip not found or access denied');
      err.statusCode = 404;
      throw err;
    }
    const effectiveStart = startDate !== undefined ? startDate : existingTrip.startDate;
    const effectiveEnd = endDate !== undefined ? endDate : existingTrip.endDate;
    assertDateOrderValid(effectiveStart, effectiveEnd);

    const updatedTrip = await tripModel.updateTrip(tripId, req.user.id, updateData);

    return res.status(200).json(updatedTrip);
  } catch (err) {
    return next(err);
  }
}

async function deleteTrip(req, res, next) {
  try {
    const tripId = Number(req.params.id);
    await tripModel.deleteTrip(tripId, req.user.id);

    return res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (err) {
    return next(err);
  }
}

async function getRecommendations(req, res, next) {
  try {
    const cities = await tripModel.getPopularCities();
    return res.status(200).json(cities);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getRecommendations,
};