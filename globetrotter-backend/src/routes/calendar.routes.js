const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth.middleware');
const calendarController = require('../controllers/calendar.controller');

router.get('/calendar', authenticateJWT, calendarController.getCalendarTrips);
router.get('/:tripId/timeline', authenticateJWT, calendarController.getTripTimeline);

module.exports = router;