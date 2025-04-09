import {  Router } from "express";
import * as authController from "../controllers/auth.controller";
import { catchAsync } from "../ErrorHandling/catchAsync";
import { checkAuth } from "../middleware/checkAuth";
import { upload } from "../util/multer/upload";
import { MulterConfig } from "../util/multer/multer.config";

const authRouter = Router();

authRouter.post('/login', catchAsync(authController.login))
authRouter.post('/signup', catchAsync(authController.signup))
authRouter.put('/reset-password', checkAuth, catchAsync(authController.resetPassword))
authRouter.delete('/delete-account', checkAuth, catchAsync(authController.deleteAccount))
authRouter.get('/me', checkAuth, catchAsync(authController.me))
authRouter.post('/upload-image', checkAuth, upload.single(MulterConfig.fileNameId), catchAsync(authController.uploadImage))

export default authRouter;
