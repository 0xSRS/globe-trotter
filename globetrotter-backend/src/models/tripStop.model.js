const prisma = require('../config/db');
const toDate = require('../utils/toDate.util');

async function createStop(tripId, { cityId, startDate, endDate, budgetForSection }) {
  const maxOrder = await prisma.tripStop.aggregate({
    where: { tripId },
    _max: { orderIndex: true },
  });

  const nextOrderIndex = maxOrder._max.orderIndex === null ? 0 : maxOrder._max.orderIndex + 1;

  return prisma.tripStop.create({
    data: {
      tripId,
      cityId,
      startDate: toDate(startDate),
      endDate: toDate(endDate),
      budgetForSection,
      orderIndex: nextOrderIndex,
    },
    include: {
      city: true,
    },
  });
}

async function findStopById(stopId) {
  const stop = await prisma.tripStop.findUnique({
    where: { id: stopId },
    include: {
      city: true,
    },
  });
  return stop || null;
}

async function updateStop(stopId, updateData) {
  const data = {};

  if (updateData.cityId !== undefined) data.cityId = updateData.cityId;
  if (updateData.startDate !== undefined) data.startDate = toDate(updateData.startDate);
  if (updateData.endDate !== undefined) data.endDate = toDate(updateData.endDate);
  if (updateData.budgetForSection !== undefined) data.budgetForSection = updateData.budgetForSection;

  return prisma.tripStop.update({
    where: { id: stopId },
    data,
    include: {
      city: true,
    },
  });
}

async function deleteStop(stopId) {
  return prisma.tripStop.delete({
    where: { id: stopId },
  });
}

async function reorderStops(tripId, stopsArray) {
  const stopIds = stopsArray.map(({ stopId }) => stopId);

  // Ensure every stop in the payload actually belongs to this trip before
  // writing anything — otherwise a caller could pass stopIds from a trip
  // they don't own and silently rewrite its ordering.
  const existingStops = await prisma.tripStop.findMany({
    where: { id: { in: stopIds }, tripId },
    select: { id: true },
  });

  if (existingStops.length !== stopIds.length) {
    const err = new Error('One or more stops do not belong to this trip');
    err.statusCode = 400;
    throw err;
  }

  const updates = stopsArray.map(({ stopId, orderIndex }) =>
    prisma.tripStop.update({
      where: { id: stopId },
      data: { orderIndex },
    })
  );

  await prisma.$transaction(updates);

  return prisma.tripStop.findMany({
    where: { tripId },
    orderBy: { orderIndex: 'asc' },
    include: {
      city: true,
    },
  });
}

async function findStopsByTripId(tripId) {
  return prisma.tripStop.findMany({
    where: { tripId },
    orderBy: { orderIndex: 'asc' },
    include: {
      city: true,
    },
  });
}

module.exports = {
  createStop,
  findStopById,
  updateStop,
  deleteStop,
  reorderStops,
  findStopsByTripId,
};