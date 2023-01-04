class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = "NotFoundError";
        this.code = 404;
    }
};
exports.NotFoundError = NotFoundError;