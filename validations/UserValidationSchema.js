const Joi = require("joi");

module.exports.UserValidationSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[a-zA-Z+$]/)
    .min(1)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z+$]/)
    .min(1)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

module.exports.UserLoginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

module.exports.tinyUrlRequestValidationSchema = Joi.object({
  url: Joi.string().required(),
  email: Joi.string().email().required(),
});
