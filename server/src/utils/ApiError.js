// ApiError.js
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong..⚠️",
        res = null,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        
        if (res) {
            this.sendResponse(res);
        }
    }

    toJSON() {
        return {
            success: this.success,
            message: this.message,
            errors: this.errors,
            statusCode: this.statusCode
        };
    }

    sendResponse(res) {
        res.status(this.statusCode).json(this.toJSON());
    }
}

export { ApiError };
