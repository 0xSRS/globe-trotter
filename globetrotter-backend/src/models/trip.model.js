const prisma = require('../config/db');
const toDate = require('../utils/toDate.util');

const TRIP_DETAIL_INCLUDE = {
  stops: {
    include: {
      city: true,
      activities: {
        include: {
          activity: true,
        },
      },
    },
  },
};

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
    orderBy: { startDate: 'desc' },
    include: TRIP_DETAIL_INCLUDE,
  });
}

async function findTripById(tripId, userId) {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    include: TRIP_DETAIL_INCLUDE,
  });
  return trip || null;
}

async function updateTrip(tripId, userId, updateData) {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    const err = new Error('Trip not found');
    err.statusCode = 404;
    throw err;
  }

  if (trip.userId !== userId) {
    const err = new Error('Not authorized to edit this trip');
    err.statusCode = 403;
    throw err;
  }

  const data = { ...updateData };
  if (data.startDate !== undefined) data.startDate = toDate(data.startDate);
  if (data.endDate !== undefined) data.endDate = toDate(data.endDate);

  return prisma.trip.update({
    where: { id: tripId },
    data,
  });
}

async function deleteTrip(tripId, userId) {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    const err = new Error('Trip not found');
    err.statusCode = 404;
    throw err;
  }

  if (trip.userId !== userId) {
    const err = new Error('Not authorized to edit this trip');
    err.statusCode = 403;
    throw err;
  }

  return prisma.trip.delete({
    where: { id: tripId },
  });
}

async function getPopularCities(limit = 6) {
  return prisma.city.findMany({
    orderBy: { popularity: 'desc' },
    take: limit,
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