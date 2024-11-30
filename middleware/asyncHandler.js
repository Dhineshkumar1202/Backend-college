const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // Automatically catches async errors
};

module.exports = asyncHandler;
