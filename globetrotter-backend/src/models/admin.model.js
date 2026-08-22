const prisma = require('../config/db');

async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalUsers, totalTrips, tripsThisMonth, trips] = await Promise.all([
    prisma.user.count(),
    prisma.trip.count(),
    prisma.trip.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.trip.findMany({ select: { startDate: true, endDate: true } }),
  ]);

  let averageTripDurationDays = 0;
  if (trips.length > 0) {
    const totalDays = trips.reduce((sum, t) => {
      const days = (new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0);
    averageTripDurationDays = Math.round((totalDays / trips.length) * 10) / 10;
  }

  return { totalUsers, totalTrips, tripsThisMonth, averageTripDurationDays };
}

async function getTopCities(limit = 10) {
  const grouped = await prisma.tripStop.groupBy({
    by: ['cityId'],
    _count: { cityId: true },
    orderBy: { _count: { cityId: 'desc' } },
    take: limit,
  });

  const cityIds = grouped.map((g) => g.cityId);
  const cities = await prisma.city.findMany({ where: { id: { in: cityIds } } });
  const cityMap = new Map(cities.map((c) => [c.id, c]));

  return grouped.map((g) => ({
    city: cityMap.get(g.cityId) || null,
    stopCount: g._count.cityId,
  }));
}

async function getTopActivities(limit = 10) {
  const grouped = await prisma.tripStopActivity.groupBy({
    by: ['activityId'],
    _count: { activityId: true },
    orderBy: { _count: { activityId: 'desc' } },
    take: limit,
  });

  const activityIds = grouped.map((g) => g.activityId);
  const activities = await prisma.activity.findMany({ where: { id: { in: activityIds } } });
  const activityMap = new Map(activities.map((a) => [a.id, a]));

  return grouped.map((g) => ({
    activity: activityMap.get(g.activityId) || null,
    bookingCount: g._count.activityId,
  }));
}

async function listUsers({ skip, take, search }) {
  const where = search
    ? {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isAdmin: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total };
}

async function getUserAdminFlag(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true, isActive: true },
  });
}

async function setUserActiveStatus(userId, isActive) {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  return prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });
}

module.exports = {
  getStats,
  getTopCities,
  getTopActivities,
  listUsers,
  getUserAdminFlag,
  setUserActiveStatus,
};