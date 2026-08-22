const prisma = require('../config/db');

const POST_INCLUDE = {
  user: {
    select: { id: true, firstName: true, lastName: true, profilePhoto: true },
  },
  comments: {
    include: {
      user: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  },
  likes: true,
};

async function createPost(userId, { content, tripId }) {
  return prisma.communityPost.create({
    data: { userId, tripId: tripId ?? null, content },
    include: POST_INCLUDE,
  });
}

async function listPosts({ skip, take }) {
  return prisma.communityPost.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    include: POST_INCLUDE,
  });
}

async function countPosts() {
  return prisma.communityPost.count();
}

async function findPostById(id) {
  return prisma.communityPost.findUnique({
    where: { id },
    include: POST_INCLUDE,
  });
}

async function deletePost(id) {
  return prisma.communityPost.delete({ where: { id } });
}

module.exports = {
  createPost,
  listPosts,
  countPosts,
  findPostById,
  deletePost,
};