type HttpCode = 301 | 400 | 401 | 404 | 500

export class ApiError extends Error {
    public httpCode: HttpCode;
    public message: string;

    constructor(httpCode: HttpCode, message: string) {
        super()
        this.httpCode = httpCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}