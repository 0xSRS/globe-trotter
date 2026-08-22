const prisma = require('../config/db');
const { groupTripStopsByDay } = require('../utils/dateGrouping.util');

const TRIP_ITINERARY_INCLUDE = {
  stops: {
    orderBy: { orderIndex: 'asc' },
    include: {
      city: true,
      activities: {
        include: { activity: true },
      },
    },
  },
};

async function getTripWithOwnershipCheck(tripId, userId) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: TRIP_ITINERARY_INCLUDE,
  });

  if (!trip) {
    const err = new Error('Trip not found');
    err.statusCode = 404;
    throw err;
  }

  if (trip.userId !== userId) {
    const err = new Error('Not authorized to view this trip');
    err.statusCode = 403;
    throw err;
  }

  return trip;
}

async function getItineraryView(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const trip = await getTripWithOwnershipCheck(tripId, req.user.id);

    const days = groupTripStopsByDay(trip);

    return res.status(200).json(days);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getItineraryView,
  getTripWithOwnershipCheck,
  TRIP_ITINERARY_INCLUDE,
};