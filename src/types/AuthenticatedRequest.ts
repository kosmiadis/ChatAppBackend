import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface AuthenticatedRequest extends Request {
    _id: ObjectId,
    email: string;
}