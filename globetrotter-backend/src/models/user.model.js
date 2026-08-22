const prisma = require('../config/db');

function stripPasswordHash(user) {
  if (!user) return user;
  const { passwordHash, ...rest } = user;
  return rest;
}

async function createUser({ firstName, lastName, email, phone, city, country, additionalInfo, passwordHash }) {
  const user = await prisma.user.create({
    data: { firstName, lastName, email, phone, city, country, additionalInfo, passwordHash },
  });
  return stripPasswordHash(user);
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findUserById(id) {
  const user = await prisma.user.findUnique({ where: { id } });
  return stripPasswordHash(user);
}

async function updateUser(id, updateData) {
  const user = await prisma.user.update({ where: { id }, data: updateData });
  return stripPasswordHash(user);
}

module.exports = { createUser, findUserByEmail, findUserById, updateUser };