import express from "express";
import AppConfig from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.static('/src/public'))
app.use(cors({ origin: AppConfig.origin_url, credentials: true }))
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

/* Error Handling */
app.use(errorHandler);

export default app;