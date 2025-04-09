import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface AuthJwtPayload extends JwtPayload {
    _id?: mongoose.Types.ObjectId,
    email?: string,
}