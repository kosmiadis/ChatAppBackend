import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthJwtPayload } from '../../types/AuthJwtPayload';

export function decodeToken (token: string): string | AuthJwtPayload | null {
    return (jwt.decode(token) as AuthJwtPayload)!;
}