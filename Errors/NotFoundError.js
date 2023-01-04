class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
};
exports.NotFoundError = NotFoundError;