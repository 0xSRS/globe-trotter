const express = require('express');
const { query } = require('express-validator');
const searchController = require('../controllers/search.controller');
const handleValidationErrors = require('../middleware/validate.middleware');

const cityRouter = express.Router();
cityRouter.get(
  '/search',
  [
    query('name').optional().isString().trim(),
    query('country').optional().isString().trim(),
    query('region').optional().isString().trim(),
  ],
  handleValidationErrors,
  searchController.searchCitiesHandler
);

const activityRouter = express.Router();
activityRouter.get(
  '/search',
  [
    query('cityId').optional().isInt({ min: 1 }).withMessage('cityId must be a positive integer'),
    query('category').optional().isString().trim(),
    query('minCost').optional().isFloat({ min: 0 }).withMessage('minCost must be a non-negative number'),
    query('maxCost').optional().isFloat({ min: 0 }).withMessage('maxCost must be a non-negative number'),
    query('duration').optional().isString().trim(),
  ],
  handleValidationErrors,
  searchController.searchActivitiesHandler
);

module.exports = { cityRouter, activityRouter };