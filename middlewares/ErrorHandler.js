

const errorHandler = (err, req, res, next) => {
    console.log("error handler");
  console.log(err.stack);
  console.log(err.message);
  const { statusCode = 500 } = err;
  return res.status(statusCode).json({
    "error-code": statusCode,
    message: err.message,
  });
};

module.exports = errorHandler;
