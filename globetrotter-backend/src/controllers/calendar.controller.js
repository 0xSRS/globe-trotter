const prisma = require('../config/db');
const { getTripWithOwnershipCheck } = require('./itineraryView.controller');
const { groupTripStopsByDay } = require('../utils/dateGrouping.util');

const COLOR_PALETTE = ['#F97316', '#3B82F6', '#10B981', '#A855F7', '#EF4444', '#EAB308', '#14B8A6', '#EC4899'];

function colorTagForTripId(tripId) {
  const index = tripId % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
}

async function getCalendarTrips(req, res, next) {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!month || !year || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Valid month and year query params are required', statusCode: 400 });
    }

    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0, 23, 59, 59, 999);

    const trips = await prisma.trip.findMany({
      where: {
        userId: req.user.id,
        startDate: { lte: monthEnd },
        endDate: { gte: monthStart },
      },
      orderBy: { startDate: 'asc' },
    });

    const result = trips.map((trip) => ({
      tripId: trip.id,
      tripName: trip.name,
      startDate: trip.startDate,
      endDate: trip.endDate,
      colorTag: colorTagForTripId(trip.id),
    }));

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

async function getTripTimeline(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);
    const trip = await getTripWithOwnershipCheck(tripId, req.user.id);

    const days = groupTripStopsByDay(trip);

    const timeline = days.flatMap((day) =>
      day.stops.flatMap((stop) =>
        stop.activities.map((activity) => ({
          day: day.day,
          date: day.date,
          city: stop.city.name,
          activityName: activity.name,
          time: activity.time,
          cost: activity.cost,
        }))
      )
    );

    return res.status(200).json(timeline);
  } catch (err) {
    return next(err);
  }
}

module.exports = { getCalendarTrips, getTripTimeline };