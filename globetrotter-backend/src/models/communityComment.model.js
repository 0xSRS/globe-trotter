const prisma = require('../config/db');

async function addComment(postId, userId, content) {
  return prisma.communityComment.create({
    data: { postId, userId, content },
  });
}

async function listCommentsByPost(postId) {
  return prisma.communityComment.findMany({
    where: { postId },
    orderBy: { createdAt: 'asc' },
  });
}

module.exports = {
  addComment,
  listCommentsByPost,
};