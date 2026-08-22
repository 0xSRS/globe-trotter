const express = require('express');
const { body } = require('express-validator');
const tripController = require('../controllers/trip.controller');
const authenticateJWT = require('../middleware/auth.middleware');
const handleValidationErrors = require('../middleware/validate.middleware');

const router = express.Router();

router.use(authenticateJWT);

router.get('/recommendations', tripController.getRecommendations);

router.get('/', tripController.getTrips);

router.post(
  '/',
  [
    body('name').notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('description').optional(),
    body('coverPhoto').optional(),
  ],
  handleValidationErrors,
  tripController.createTrip
);

router.get('/:id', tripController.getTripById);

router.put(
  '/:id',
  [
    body('name').optional().notEmpty(),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601(),
    body('description').optional(),
    body('coverPhoto').optional(),
  ],
  handleValidationErrors,
  tripController.updateTrip
);

router.delete('/:id', tripController.deleteTrip);

module.exports = router;