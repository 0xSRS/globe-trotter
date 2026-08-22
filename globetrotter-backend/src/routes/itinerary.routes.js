const express = require('express');
const { body } = require('express-validator');
const itineraryController = require('../controllers/itinerary.controller');
const authenticateJWT = require('../middleware/auth.middleware');
const handleValidationErrors = require('../middleware/validate.middleware');

const router = express.Router({ mergeParams: true });

router.use(authenticateJWT);

router.post(
  '/:tripId/stops',
  [
    body('cityId').isInt().toInt(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('budgetForSection').optional().isFloat().toFloat(),
  ],
  handleValidationErrors,
  itineraryController.addStop
);

// IMPORTANT: reorder route must come before /:tripId/stops/:stopId
router.put(
  '/:tripId/stops/reorder',
  [
    body('stops').isArray(),
    body('stops.*.stopId').isInt().toInt(),
    body('stops.*.orderIndex').isInt().toInt(),
  ],
  handleValidationErrors,
  itineraryController.reorderStops
);

router.put(
  '/:tripId/stops/:stopId',
  [
    body('cityId').optional().isInt().toInt(),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601(),
    body('budgetForSection').optional().isFloat().toFloat(),
  ],
  handleValidationErrors,
  itineraryController.updateStop
);

router.delete('/:tripId/stops/:stopId', itineraryController.deleteStop);

router.post(
  '/:tripId/stops/:stopId/activities',
  [
    body('activityId').isInt().toInt(),
    body('scheduledDate').optional().isISO8601(),
    body('scheduledTime').optional(),
    body('costOverride').optional().isFloat().toFloat(),
  ],
  handleValidationErrors,
  itineraryController.addActivity
);

router.delete('/:tripId/stops/:stopId/activities/:activityId', itineraryController.removeActivity);

module.exports = router;