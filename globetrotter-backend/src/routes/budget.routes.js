const express = require('express');
const { body } = require('express-validator');
const budgetController = require('../controllers/budget.controller');
const authenticateJWT = require('../middleware/auth.middleware');
const handleValidationErrors = require('../middleware/validate.middleware');

const router = express.Router({ mergeParams: true });

router.use(authenticateJWT);

router.get('/:tripId/budget', budgetController.getBudget);

router.post(
  '/:tripId/budget',
  [
    body('category').isIn(['transport', 'stay', 'meals']),
    body('amount').isFloat({ min: 0 }),
  ],
  handleValidationErrors,
  budgetController.upsertBudget
);

module.exports = router;