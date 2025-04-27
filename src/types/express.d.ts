import "express";
import mongoose from 'mongoose'
import { IFile } from "./IFile";

declare module "express-serve-static-core" {
    interface Request {
        email?: string | undefined,
        _id?: mongoose.Types.ObjectId,
        files: IFile 
    }
}