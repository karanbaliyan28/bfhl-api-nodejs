const logger = require("../utils/logger");
const { EMAIL } = require("../config/env");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.logError(err.stack || err.message);
  const statusCode = err.statusCode || err.status || 500;
  const errorMessage = statusCode >= 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({
    is_success: false,
    official_email: EMAIL,
    error: errorMessage
  });
};
