// Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message),
    });
  }

  // Mongoose Cast Error
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
      message: err.message,
    });
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate entry',
      message: 'This entry already exists',
    });
  }

  // Default Error Response
  res.status(err.statusCode || 500).json({
    error: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Async Handler Wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Not Found Handler
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
};
