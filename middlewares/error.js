// Creating a class for handling error (which should be done in utils folder)
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // by default err message and code
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
