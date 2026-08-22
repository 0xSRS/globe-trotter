const communityPostModel = require('../models/communityPost.model');
const communityCommentModel = require('../models/communityComment.model');
const communityLikeModel = require('../models/communityLike.model');
const parsePaginationParams = require('../utils/pagination.util');

function shapePost(post, currentUserId) {
  const { likes, ...rest } = post;
  return {
    ...rest,
    likesCount: likes.length,
    likedByMe: likes.some((like) => like.userId === currentUserId),
    commentCount: post.comments.length,
  };
}

async function createPost(req, res, next) {
  try {
    const { content, tripId } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'content is required', statusCode: 400 });
    }

    const post = await communityPostModel.createPost(req.user.id, {
      content,
      tripId: tripId ? Number(tripId) : undefined,
    });

    return res.status(201).json(shapePost(post, req.user.id));
  } catch (err) {
    return next(err);
  }
}

async function getPosts(req, res, next) {
  try {
    const { page, limit, skip, take } = parsePaginationParams(req.query);

    let [posts, total] = await Promise.all([
      communityPostModel.listPosts({ skip, take }),
      communityPostModel.countPosts(),
    ]);

    posts = posts.map((post) => shapePost(post, req.user.id));

    if (req.query.filter === 'hasComments') {
      posts = posts.filter((p) => p.commentCount > 0);
    }

    if (req.query.sortBy === 'likes') {
      posts.sort((a, b) => b.likesCount - a.likesCount);
    } else if (req.query.sortBy === 'comments') {
      posts.sort((a, b) => b.commentCount - a.commentCount);
    }

    if (req.query.groupBy === 'tripId') {
      const grouped = posts.reduce((acc, post) => {
        const key = post.tripId ?? 'none';
        if (!acc[key]) acc[key] = [];
        acc[key].push(post);
        return acc;
      }, {});
      return res.status(200).json({ page, limit, total, data: grouped });
    }

    return res.status(200).json({ page, limit, total, data: posts });
  } catch (err) {
    return next(err);
  }
}

async function toggleLike(req, res, next) {
  try {
    const postId = Number(req.params.id);

    const post = await communityPostModel.findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found', statusCode: 404 });
    }

    const result = await communityLikeModel.toggleLike(postId, req.user.id);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

async function addComment(req, res, next) {
  try {
    const postId = Number(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'content is required', statusCode: 400 });
    }

    const post = await communityPostModel.findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found', statusCode: 404 });
    }

    const comment = await communityCommentModel.addComment(postId, req.user.id, content);
    return res.status(201).json(comment);
  } catch (err) {
    return next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = Number(req.params.id);

    const post = await communityPostModel.findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found', statusCode: 404 });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post', statusCode: 403 });
    }

    await communityPostModel.deletePost(postId);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { createPost, getPosts, toggleLike, addComment, deletePost };