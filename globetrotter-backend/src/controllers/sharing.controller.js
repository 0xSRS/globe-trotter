const express = require('express');
const authenticateJWT = require('../middleware/auth.middleware');
const sharingController = require('../controllers/sharing.controller');

// This file exports TWO separate routers, since /api/trips and /api/public
// each need only a subset of these routes. Mounting a single shared router
// under both prefixes would expose every route under both — e.g. the
// owner-only share action would also become reachable at
// /api/public/:tripId/share, and the public view/copy routes would be
// duplicated under /api/trips/trips/:slug.
//
// Mount in app.js as:
//   app.use('/api/trips', require('./routes/sharing.routes').tripRouter);
//   app.use('/api/public', require('./routes/sharing.routes').publicRouter);

const tripRouter = express.Router();
// -> POST /api/trips/:tripId/share
tripRouter.post('/:tripId/share', authenticateJWT, sharingController.shareTrip);

const publicRouter = express.Router();
// -> GET /api/public/trips/:slug (no auth)
publicRouter.get('/trips/:slug', sharingController.getPublicTrip);
// -> POST /api/public/trips/:slug/copy (auth required)
publicRouter.post('/trips/:slug/copy', authenticateJWT, sharingController.copyPublicTrip);

module.exports = { tripRouter, publicRouter };