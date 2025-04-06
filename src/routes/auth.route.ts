import {  Router } from "express";
import * as authController from "../controllers/auth.controller";
import { catchAsync } from "../ErrorHandling/catchAsync";

const authRouter = Router();

authRouter.post('/login', catchAsync(authController.login))
authRouter.post('/signup', catchAsync(authController.signup))
authRouter.post('/change-password', catchAsync(authController.changePassword))
authRouter.post('/upload-image', catchAsync(authController.uploadImage))
authRouter.get('/me', catchAsync(authController.me))

export default authRouter;
