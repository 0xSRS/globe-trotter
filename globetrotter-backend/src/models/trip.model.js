const prisma = require('../config/db');
const toDate = require('../utils/toDate.util');

async function createTrip(userId, { name, startDate, endDate, description, coverPhoto }) {
  return prisma.trip.create({
    data: {
      userId,
      name,
      startDate: toDate(startDate),
      endDate: toDate(endDate),
      description,
      coverPhoto,
    },
  });
}

async function findTripsByUser(userId) {
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { startDate: 'asc' },
    include: {
      stops: {
        orderBy: { orderIndex: 'asc' },
        include: { city: true },
      },
    },
  });
}

// Scoped to userId so a trip only comes back if it actually belongs to the
// requesting user — used for both reads and as an ownership check before
// update/delete.
async function findTripById(tripId, userId) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      stops: {
        orderBy: { orderIndex: 'asc' },
        include: { city: true },
      },
    },
  });

  if (!trip || trip.userId !== userId) {
    return null;
  }

  return trip;
}

async function updateTrip(tripId, userId, updateData) {
  const data = {};

  if (updateData.name !== undefined) data.name = updateData.name;
  if (updateData.startDate !== undefined) data.startDate = toDate(updateData.startDate);
  if (updateData.endDate !== undefined) data.endDate = toDate(updateData.endDate);
  if (updateData.description !== undefined) data.description = updateData.description;
  if (updateData.coverPhoto !== undefined) data.coverPhoto = updateData.coverPhoto;

  // updateMany with the ownership filter baked in means an update can never
  // touch a trip belonging to another user, even if the caller already
  // validated ownership earlier — defense in depth.
  const result = await prisma.trip.updateMany({
    where: { id: tripId, userId },
    data,
  });

  if (result.count === 0) {
    const err = new Error('Trip not found or access denied');
    err.statusCode = 404;
    throw err;
  }

  return prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      stops: {
        orderBy: { orderIndex: 'asc' },
        include: { city: true },
      },
    },
  });
}

async function deleteTrip(tripId, userId) {
  const result = await prisma.trip.deleteMany({
    where: { id: tripId, userId },
  });

  if (result.count === 0) {
    const err = new Error('Trip not found or access denied');
    err.statusCode = 404;
    throw err;
  }

  return true;
}

// Used by GET /api/trips/recommendations — most popular cities across the app,
// independent of any single user's trips.
async function getPopularCities() {
  return prisma.city.findMany({
    orderBy: { popularity: 'desc' },
    take: 10,
  });
}

module.exports = {
  createTrip,
  findTripsByUser,
  findTripById,
  updateTrip,
  deleteTrip,
  getPopularCities,
};