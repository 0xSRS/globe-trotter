function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const response = {
    error: err.message || 'Internal server error',
    statusCode: err.statusCode || 500,
  };

  if (err.details) {
    response.details = err.details;
  }

  res.status(err.statusCode || 500).json(response);
}

module.exports = errorHandler;