const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth.middleware');
const itineraryViewController = require('../controllers/itineraryView.controller');

router.get('/:tripId/itinerary-view', authenticateJWT, itineraryViewController.getItineraryView);

module.exports = router;