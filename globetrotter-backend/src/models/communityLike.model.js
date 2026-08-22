const prisma = require('../config/db');

const PRISMA_UNIQUE_CONSTRAINT_ERROR = 'P2002';
const PRISMA_RECORD_NOT_FOUND_ERROR = 'P2025';

async function findLike(postId, userId) {
  return prisma.communityLike.findUnique({
    where: { postId_userId: { postId, userId } },
  });
}

async function addLike(postId, userId) {
  return prisma.communityLike.create({
    data: { postId, userId },
  });
}

async function removeLike(postId, userId) {
  return prisma.communityLike.delete({
    where: { postId_userId: { postId, userId } },
  });
}

async function toggleLike(postId, userId) {
  const existing = await findLike(postId, userId);

  if (existing) {
    try {
      await removeLike(postId, userId);
    } catch (err) {
      if (err.code !== PRISMA_RECORD_NOT_FOUND_ERROR) throw err;
    }
    return { liked: false };
  }

  try {
    await addLike(postId, userId);
  } catch (err) {
    if (err.code !== PRISMA_UNIQUE_CONSTRAINT_ERROR) throw err;
  }
  return { liked: true };
}

module.exports = {
  findLike,
  addLike,
  removeLike,
  toggleLike,
};