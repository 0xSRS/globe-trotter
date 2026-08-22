const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      statusCode: 400,
      details: errors.array().map((e) => e.msg),
    });
  }
  next();
}

module.exports = handleValidationErrors;