

const errorHandler = (err, req, res, next) => {
    console.log("error handler");
  console.log(err.stack);
  const { statusCode = 500 } = err;
  res.status(statusCode).json({
    "error-code": statusCode,
    message: err.message,
  });
};

module.exports = errorHandler;
