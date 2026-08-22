const prisma = require('../config/db');
const { generateShareSlug } = require('../utils/slug.util');

// POST /api/trips/:tripId/share  (auth required, owner only)
// Makes a trip public and returns its share slug (generating one if needed).
async function shareTrip(req, res, next) {
  try {
    const tripId = Number(req.params.tripId);

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });

    if (!trip || trip.userId !== req.user.id) {
      return res.status(404).json({ error: 'Trip not found', statusCode: 404 });
    }

    const shareSlug = trip.shareSlug || generateShareSlug();

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: { isPublic: true, shareSlug },
    });

    return res.status(200).json({
      shareUrl: `/api/public/trips/${updatedTrip.shareSlug}`,
      shareSlug: updatedTrip.shareSlug,
      isPublic: updatedTrip.isPublic,
    });
  } catch (err) {
    return next(err);
  }
}

// GET /api/public/trips/:slug  (no auth)
// Returns a public, read-only view of a shared trip.
async function getPublicTrip(req, res, next) {
  try {
    const { slug } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { shareSlug: slug },
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: { city: true },
        },
      },
    });

    if (!trip || !trip.isPublic) {
      return res.status(404).json({ error: 'Shared trip not found', statusCode: 404 });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return next(err);
  }
}

// POST /api/public/trips/:slug/copy  (auth required)
// Copies a publicly shared trip (and its stops) into the requesting user's own trips.
async function copyPublicTrip(req, res, next) {
  try {
    const { slug } = req.params;

    const sourceTrip = await prisma.trip.findUnique({
      where: { shareSlug: slug },
      include: { stops: true },
    });

    if (!sourceTrip || !sourceTrip.isPublic) {
      return res.status(404).json({ error: 'Shared trip not found', statusCode: 404 });
    }

    const newTrip = await prisma.trip.create({
      data: {
        userId: req.user.id,
        name: sourceTrip.name,
        startDate: sourceTrip.startDate,
        endDate: sourceTrip.endDate,
        description: sourceTrip.description,
        coverPhoto: sourceTrip.coverPhoto,
        stops: {
          create: sourceTrip.stops.map((stop) => ({
            cityId: stop.cityId,
            startDate: stop.startDate,
            endDate: stop.endDate,
            orderIndex: stop.orderIndex,
            budgetForSection: stop.budgetForSection,
          })),
        },
      },
      include: { stops: { include: { city: true } } },
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return next(err);
  }
}

module.exports = { shareTrip, getPublicTrip, copyPublicTrip };