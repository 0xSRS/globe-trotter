const prisma = require('../config/db');

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
    await removeLike(postId, userId);
    return { liked: false };
  }

  await addLike(postId, userId);
  return { liked: true };
}

module.exports = {
  findLike,
  addLike,
  removeLike,
  toggleLike,
};