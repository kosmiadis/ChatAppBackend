import express from "express";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Hello world');
})
app.use(errorHandler);


export default app;