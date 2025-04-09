import {  Router } from "express";
import * as authController from "../controllers/auth.controller";
import { catchAsync } from "../ErrorHandling/catchAsync";
import { checkAuth } from "../middleware/checkAuth";

const authRouter = Router();

authRouter.post('/login', catchAsync(authController.login))
authRouter.post('/signup', catchAsync(authController.signup))
authRouter.put('/reset-password', checkAuth, catchAsync(authController.resetPassword))
authRouter.delete('/delete-account', checkAuth, catchAsync(authController.deleteAccount))
authRouter.post('/upload-image', checkAuth, catchAsync(authController.uploadImage))
authRouter.get('/me', checkAuth, catchAsync(authController.me))

export default authRouter;
