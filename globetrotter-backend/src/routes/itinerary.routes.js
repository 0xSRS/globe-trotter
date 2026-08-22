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
    body('cityId').isInt(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('budgetForSection').optional().isFloat(),
  ],
  handleValidationErrors,
  itineraryController.addStop
);

// IMPORTANT: reorder route must come before /:tripId/stops/:stopId
router.put(
  '/:tripId/stops/reorder',
  [
    body('stops').isArray(),
  ],
  handleValidationErrors,
  itineraryController.reorderStops
);

router.put(
  '/:tripId/stops/:stopId',
  [
    body('cityId').optional().isInt(),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601(),
    body('budgetForSection').optional().isFloat(),
  ],
  handleValidationErrors,
  itineraryController.updateStop
);

router.delete('/:tripId/stops/:stopId', itineraryController.deleteStop);

router.post(
  '/:tripId/stops/:stopId/activities',
  [
    body('activityId').isInt(),
    body('scheduledDate').optional().isISO8601(),
    body('scheduledTime').optional(),
    body('costOverride').optional().isFloat(),
  ],
  handleValidationErrors,
  itineraryController.addActivity
);

router.delete('/:tripId/stops/:stopId/activities/:activityId', itineraryController.removeActivity);

module.exports = router;