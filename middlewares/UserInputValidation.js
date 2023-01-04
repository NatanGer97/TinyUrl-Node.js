const { InputValidationError } = require("../Errors/InputValidationError");
const {UserValidationSchema} = require("../validations/UserValidationSchema");

module.exports.validateUserInput = (req, res, next) => 
{
    const {error} = UserValidationSchema.validate(req.body);

    if (error) {
        const message = error.details.map(err => err.message).join(",");
        
        console.log(message);
        throw new InputValidationError(message, 400);
    }
    else {
        next();
    }
};

