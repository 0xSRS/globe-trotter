const prisma = require('../config/db');

async function searchCities({ name, country, region }) {
  const where = {};

  if (name !== undefined) {
    where.name = { contains: name };
  }

  if (country !== undefined) {
    where.country = { contains: country };
  }

  if (region !== undefined) {
    where.region = { contains: region };
  }

  return prisma.city.findMany({
    where,
    orderBy: { popularity: 'desc' },
    take: 50,
  });
}

async function findCityById(cityId) {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
  });
  return city || null;
}

module.exports = {
  searchCities,
  findCityById,
};