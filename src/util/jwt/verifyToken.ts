import jwt, { JwtPayload } from 'jsonwebtoken';
import AppConfig from '../../config/config';

export function verifyToken (token: string): JwtPayload | string {
    return jwt.verify(token, AppConfig.jwt_secret);
}