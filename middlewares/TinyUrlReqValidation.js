const { InputValidationError } = require('../Errors/InputValidationError');
const {tinyUrlRequestValidationSchema} = require('../validations/UserValidationSchema');

module.exports.tinyUrlRequestValidation = (req, res, next) => 
{
    const {error} = tinyUrlRequestValidationSchema.validate(req.body);

    if (error) {
        const message = error.details.map(err => err.message).join(",");
        
        console.log(message);
        throw new InputValidationError(message, 400);
    }
    else {
        next();
    }
}