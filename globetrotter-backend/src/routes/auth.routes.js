const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const handleValidationErrors = require('../middleware/validate.middleware');

const router = express.Router();

router.post('/register', [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('phone').optional(),
  body('city').optional(),
  body('country').optional(),
  body('additionalInfo').optional(),
], handleValidationErrors, authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], handleValidationErrors, authController.login);

router.post('/forgot-password', [
  body('email').isEmail(),
], handleValidationErrors, authController.forgotPassword);

module.exports = router;