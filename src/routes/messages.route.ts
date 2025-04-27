import { Router } from "express";
import * as messagesController from '../controllers/messages.controller';
import { checkAuth } from "../middleware/checkAuth";
import { catchAsync } from "../ErrorHandling/catchAsync";


const messagesRouter = Router();


messagesRouter.get('/messages', checkAuth, catchAsync(messagesController.getMessages));
messagesRouter.post('/messages', checkAuth, catchAsync(messagesController.sendMessage));
messagesRouter.put('/messages', checkAuth, catchAsync(messagesController.editMessage));
messagesRouter.delete('/messages', checkAuth, catchAsync(messagesController.deleteMessage));


export default messagesRouter;