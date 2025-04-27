import { Request, Response } from "express";
import Message from "../models/Message";
import { sendError, sendSuccess } from "../util/responses/responseTemplate";

export async function getMessages (req: Request<{receiverId: string}>, res: Response) {
    const { receiverId } = req.query; //the receiver
    const { _id } = req; //the sender

    //here might be the bug
    await Message.find({ $or: [ { senderId: _id, receiverId: receiverId }, { senderId: receiverId, receiverId: _id } ] })
    .then((messages) => {
        sendSuccess(res, 'Messages loaded successfuly', { messages })
    })
    .catch(e => {
        sendError(res, 'Something went wrong, message could not be loaded :(', { message: e.message })
    })
    
}

export async function sendMessage (req: Request<{receiverId: string}, {}, {content: string}>, res: Response) {
    const { content } = req.body;
    const { receiverId } = req.query; //the receiver
    const { _id } = req; //the sender
    
    const newMessage = new Message({ receiverId, senderId: _id, content })
    await newMessage.save()
    .then((message) => {
        sendSuccess(res, 'Message send successfuly!', { message })
    })
    .catch(e => {
        sendError(res, 'Message was not sent!', { message: e.message })
    })
}

export async function deleteMessage (req: Request<{receiverId: string}>, res: Response) {
    const { receiverId } = req.query; //the receiver
    const { _id } = req; //the sender

    await Message.deleteOne({ receiverId, senderId: _id })
    .then((deleteResponse) => {
        sendSuccess(res, 'Message deleted successfuly', { deleteResponse })
    })
    .catch(e => {
        sendError(res, 'Message was not deleted!', { message: e.message })
    })
}

export async function editMessage (req: Request<{receiverId: string}, {}, {content: string}>, res: Response) {
    const { content } = req.body;
    const { receiverId } = req.query; //the receiver
    const { _id } = req; //the sender

    await Message.updateOne({ receiverId, senderId: _id }, { $set: { content }})
    .then((updateResponse) => {
        sendSuccess(res, 'Message was edited successfuly!', { updateResponse });
    })
    .catch(e => {
        sendError(res, 'Message was not edited!', { message: e.message })
    })
}