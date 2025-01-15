const routeNotFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "ValidationError") {
    statusCode = 400;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  req.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : null,
  });
};

export { routeNotFound, errorHandler };
