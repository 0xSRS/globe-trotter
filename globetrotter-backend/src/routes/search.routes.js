const express = require('express');
const searchController = require('../controllers/search.controller');

// This file exports TWO separate routers since /api/cities and /api/activities
// both need a /search path but call different controller functions.
//
// Mount in app.js as:
//   app.use('/api/cities', require('./routes/search.routes').cityRouter);
//   app.use('/api/activities', require('./routes/search.routes').activityRouter);

const cityRouter = express.Router();
cityRouter.get('/search', searchController.searchCitiesHandler);

const activityRouter = express.Router();
activityRouter.get('/search', searchController.searchActivitiesHandler);

module.exports = { cityRouter, activityRouter };