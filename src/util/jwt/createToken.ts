import mongoose, { Mongoose, ObjectId } from 'mongoose';
import AppConfig from '../../config/config';
import jwt from 'jsonwebtoken';

export function createToken (_id: mongoose.Types.ObjectId, email: string): string {
    return jwt.sign({ _id, email }, AppConfig.jwt_secret)
}