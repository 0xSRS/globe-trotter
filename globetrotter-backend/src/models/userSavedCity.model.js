const prisma = require('../config/db');

async function listSavedCities(userId) {
  return prisma.userSavedCity.findMany({
    where: { userId },
    include: { city: true },
    orderBy: { createdAt: 'desc' },
  });
}

async function findSavedCity(userId, cityId) {
  return prisma.userSavedCity.findFirst({
    where: { userId, cityId },
  });
}

async function saveCity(userId, cityId) {
  return prisma.userSavedCity.create({
    data: { userId, cityId },
  });
}

async function removeSavedCity(userId, cityId) {
  const existing = await prisma.userSavedCity.findFirst({
    where: { userId, cityId },
  });

  if (!existing) {
    const err = new Error('Saved destination not found');
    err.statusCode = 404;
    throw err;
  }

  return prisma.userSavedCity.delete({
    where: { id: existing.id },
  });
}

module.exports = {
  listSavedCities,
  findSavedCity,
  saveCity,
  removeSavedCity,
};