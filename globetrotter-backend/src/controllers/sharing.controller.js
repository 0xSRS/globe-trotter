const prisma = require('../config/db');
const { generateShareSlug } = require('../utils/slug.util');
const { groupTripStopsByDay } = require('../utils/dateGrouping.util');
const { TRIP_ITINERARY_INCLUDE } = require('./itineraryView.controller');

async function shareTrip(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found', statusCode: 404 });
    }

    if (trip.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to share this trip', statusCode: 403 });
    }

    let shareSlug = trip.shareSlug;
    if (!shareSlug) {
      shareSlug = generateShareSlug();
    }

    const updated = await prisma.trip.update({
      where: { id: tripId },
      data: { isPublic: true, shareSlug },
    });

    const publicUrl = `${req.protocol}://${req.get('host')}/api/public/trips/${updated.shareSlug}`;

    return res.status(200).json({ publicUrl });
  } catch (err) {
    return next(err);
  }
}

async function getPublicTrip(req, res, next) {
  try {
    const { slug } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { shareSlug: slug },
      include: TRIP_ITINERARY_INCLUDE,
    });

    if (!trip || !trip.isPublic) {
      return res.status(404).json({ error: 'Trip not found', statusCode: 404 });
    }

    const days = groupTripStopsByDay(trip);

    return res.status(200).json({
      tripName: trip.name,
      description: trip.description,
      coverPhoto: trip.coverPhoto,
      startDate: trip.startDate,
      endDate: trip.endDate,
      days,
    });
  } catch (err) {
    return next(err);
  }
}

async function copyPublicTrip(req, res, next) {
  try {
    const { slug } = req.params;

    const sourceTrip = await prisma.trip.findUnique({
      where: { shareSlug: slug },
      include: {
        stops: {
          include: { activities: true },
        },
      },
    });

    if (!sourceTrip || !sourceTrip.isPublic) {
      return res.status(404).json({ error: 'Trip not found', statusCode: 404 });
    }

    const newTrip = await prisma.$transaction(async (tx) => {
      const created = await tx.trip.create({
        data: {
          userId: req.user.id,
          name: sourceTrip.name,
          startDate: sourceTrip.startDate,
          endDate: sourceTrip.endDate,
          description: sourceTrip.description,
          coverPhoto: sourceTrip.coverPhoto,
          isPublic: false,
          shareSlug: null,
        },
      });

      for (const stop of sourceTrip.stops) {
        const newStop = await tx.tripStop.create({
          data: {
            tripId: created.id,
            cityId: stop.cityId,
            startDate: stop.startDate,
            endDate: stop.endDate,
            orderIndex: stop.orderIndex,
            budgetForSection: stop.budgetForSection,
          },
        });

        for (const tsa of stop.activities) {
          await tx.tripStopActivity.create({
            data: {
              tripStopId: newStop.id,
              activityId: tsa.activityId,
              scheduledDate: tsa.scheduledDate,
              scheduledTime: tsa.scheduledTime,
              costOverride: tsa.costOverride,
            },
          });
        }
      }

      return created;
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return next(err);
  }
}

module.exports = { shareTrip, getPublicTrip, copyPublicTrip };