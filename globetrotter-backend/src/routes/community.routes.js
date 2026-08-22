const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth.middleware');
const communityController = require('../controllers/community.controller');

router.use(authenticateJWT);

router.post('/posts', communityController.createPost);
router.get('/posts', communityController.getPosts);
router.post('/posts/:id/like', communityController.toggleLike);
router.post('/posts/:id/comments', communityController.addComment);
router.delete('/posts/:id', communityController.deletePost);

module.exports = router;