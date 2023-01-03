class CredentialsError extends Error {
    constructor(message) {
        this.message = message;
        this.name = "CredentialsError";
        this.status = 400;
    }
}

module.exports = CredentialsError;