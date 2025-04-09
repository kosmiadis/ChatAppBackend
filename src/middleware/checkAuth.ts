import { NextFunction, Response, Request } from "express";
import { decodeToken } from "../util/jwt/decodeToken";
import { verifyToken } from "../util/jwt/verifyToken";
import { ApiError } from "../ErrorHandling/ApiError";
import { AuthJwtPayload } from "../types/AuthJwtPayload";

export function checkAuth (req: Request, res: Response, next: NextFunction) {

    const token = req.cookies._t;

    if (!token) {
        throw new ApiError(401, 'Authorization Missing');
    }
    //verify the token then decode it and return the user object in the next handler;
    const isVerified = verifyToken(token);
    if (!isVerified) {
        throw new ApiError(401, 'Unauthorized!')
    }
    const decoded = decodeToken(token) as AuthJwtPayload;
    
    req.email = decoded.email;
    req._id = decoded._id;
    next();
}