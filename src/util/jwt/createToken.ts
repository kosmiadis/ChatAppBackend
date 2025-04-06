import AppConfig from '../../config/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function createToken (email: string): string {
    return jwt.sign({ email }, AppConfig.jwt_secret)
}