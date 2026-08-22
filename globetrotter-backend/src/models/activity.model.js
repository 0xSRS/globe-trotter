const prisma = require('../config/db');

async function searchActivities({ cityId, category, minCost, maxCost, duration }) {
  const where = {};

  if (cityId !== undefined) {
    where.cityId = parseInt(cityId, 10);
  }

  if (category !== undefined) {
    where.category = { equals: category };
  }

  if (minCost !== undefined || maxCost !== undefined) {
    where.cost = {};
    if (minCost !== undefined) where.cost.gte = minCost;
    if (maxCost !== undefined) where.cost.lte = maxCost;
  }

  if (duration !== undefined) {
    where.duration = { contains: duration };
  }

  return prisma.activity.findMany({
    where,
    include: {
      city: true,
    },
    orderBy: { cost: 'asc' },
    take: 50,
  });
}

async function findActivityById(activityId) {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      city: true,
    },
  });
  return activity || null;
}

module.exports = {
  searchActivities,
  findActivityById,
};