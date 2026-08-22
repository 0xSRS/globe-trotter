const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth.middleware');
const sharingController = require('../controllers/sharing.controller');

// Mounted at /api/trips -> POST /api/trips/:tripId/share
router.post('/:tripId/share', authenticateJWT, sharingController.shareTrip);

// Mounted at /api/public -> GET /api/public/trips/:slug (no auth)
router.get('/trips/:slug', sharingController.getPublicTrip);

// Mounted at /api/public -> POST /api/public/trips/:slug/copy (auth required)
router.post('/trips/:slug/copy', authenticateJWT, sharingController.copyPublicTrip);

module.exports = router;