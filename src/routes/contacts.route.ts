import { Router } from "express";
import { catchAsync } from "../ErrorHandling/catchAsync";
import * as contactsController from '../controllers/contacts.controller';
import { checkAuth } from "../middleware/checkAuth";


const contactsRouter = Router();

contactsRouter.get('/contacts', checkAuth,  catchAsync(contactsController.getContacts))
contactsRouter.post('/contacts', checkAuth, catchAsync(contactsController.addContact));
contactsRouter.delete('/contacts', checkAuth, catchAsync(contactsController.deleteContact))

export default contactsRouter;