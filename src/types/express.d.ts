import "express";
import mongoose from 'mongoose'

declare module "express-serve-static-core" {
    interface Request {
        email?: string,
        _id?: mongoose.Types.ObjectId
    }
}