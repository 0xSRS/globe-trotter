const prisma = require('../config/db');

async function attachActivity(tripStopId, { activityId, scheduledDate, scheduledTime, costOverride }) {
  return prisma.tripStopActivity.create({
    data: {
      tripStopId,
      activityId,
      scheduledDate,
      scheduledTime,
      costOverride,
    },
    include: {
      activity: true,
    },
  });
}

async function removeActivity(tripStopId, activityRowId) {
  const existing = await prisma.tripStopActivity.findFirst({
    where: {
      id: activityRowId,
      tripStopId,
    },
  });

  if (!existing) {
    const err = new Error('Activity not found on this stop');
    err.statusCode = 404;
    throw err;
  }

  return prisma.tripStopActivity.delete({
    where: { id: activityRowId },
  });
}

async function findActivityRowById(activityRowId) {
  const row = await prisma.tripStopActivity.findUnique({
    where: { id: activityRowId },
  });
  return row || null;
}

module.exports = {
  attachActivity,
  removeActivity,
  findActivityRowById,
};