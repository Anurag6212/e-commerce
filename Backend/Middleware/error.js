const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const message = "Resource not found =>" + err.path;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "jsonwebTokenError") {
    const message = "Json web token error. Please try again";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "tokenExpireError") {
    const message = "Json web token expire. Please try again";
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  next();
};
