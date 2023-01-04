const { InputValidationError } = require("../Errors/InputValidationError");
const {
  UserLoginValidationSchema,
} = require("../validations/UserValidationSchema");

module.exports.loginInputValidation = (req, res, next) => {
  const { error } = UserLoginValidationSchema.validate(req.body);
  if (error) {
    const message = error.details.map((err) => err.message).join(",");
    console.log(message);
    throw new InputValidationError(message, 400);
  } else {
    next();
  }
};
