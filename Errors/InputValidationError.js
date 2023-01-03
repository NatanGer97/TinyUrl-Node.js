class InputValidationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'InputValidationError';
    this.status = 400;
  }
}

exports.InputValidationError = InputValidationError;