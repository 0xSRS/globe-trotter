const tripModel = require('../models/trip.model');
const computeTripStatus = require('../utils/tripStatus.util');

async function createTrip(req, res, next) {
  try {
    const { name, startDate, endDate, description, coverPhoto } = req.body;

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
    const updatedTrip = await tripModel.updateTrip(tripId, req.user.id, req.body);

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