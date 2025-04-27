import { Request, Response } from "express";
import User from "../models/User";
import { sendError, sendSuccess } from "../util/responses/responseTemplate";
import mongoose, { isValidObjectId, ModifiedPathsSnapshot, mongo, Mongoose } from "mongoose";
import { ApiError } from "../ErrorHandling/ApiError";
import Message from "../models/Message";

export async function getContacts (req: Request, res: Response) {
    const { email } = req;
    
    await User.findOne({ email })
    .then(async (user) => {
        if (user!.contacts.length > 0) {
            await User.find({ _id: { $in: user?.contacts }})
            .then((contacts) => {
                sendSuccess(res, 'Contacts loaded successfuly', { contacts });
            })
            .catch(e => {
                console.log(e);
                throw e;
            })
        }
        else {
            sendSuccess(res, 'Contacts loaded successfuly', { contacts: []})
        }  
    })
    .catch(e => {
        throw e;
    })
}

export async function addContact (req: Request, res: Response) {
    const { contactId } = req.query
    const { email } = req;
    const { _id } = req;

    if (isValidObjectId(contactId) && contactId !== _id) {
        const foundUser = await User.findOne({ _id: contactId})
        if (foundUser) {
            await User.findOneAndUpdate({ email }, {
                $addToSet: { contacts: contactId },
            })
            .then(async (update) => {
                await User.findOneAndUpdate({ _id: contactId }, {
                    $addToSet: {contacts: _id }
                }).then(() => {
                    sendSuccess(res, 'Contact added successfuly', { update })
                })
            })
            .catch(e => {
                throw e
            })
        }
        else {
            sendError(res, 'Could not find a Contact with that ID', { message: 'Could not find a Contact with that ID'})
        }
        
    }
    else {
        sendError(res, 'This is not a valid ID', { message: 'Invalid ID'}, 400)
    }
}

export async function deleteContact (req: Request, res: Response) {
    const { contactId } = req.query;
    const { email, _id } = req;

    await User.updateOne({ email }, {
        $pull: { contacts: contactId }
    })
    .then(async (updateResponse) => {
        if (updateResponse.modifiedCount === 1) {
            const deleteRes = await Message.deleteMany({ $or: [{ senderId: contactId, receiverId: _id}, { senderId: _id, receiverId: contactId}]})
            if (deleteRes.deletedCount > 0) {
                sendSuccess(res, 'Contact deleted successfuly.', { updateResponse })
            }
            else {
                throw new ApiError(400, 'Something went wrong deleting messages.')
            }
        }
        else {
            throw new ApiError(400, 'Contact was not deleted.')
        }
    })
    .catch(e => {
        throw e
    })
}

export async function setContactStatus (req: Request, res: Response) {
    const { contactId } = req.query;
    const { status } = req.body;

    await User.updateOne({ _id: contactId }, {
        $set: { status }
    })
    .then((updateResponse) => {
        if (updateResponse.modifiedCount === 1) {
            sendSuccess(res, 'Contact status was updated!');
        }
        else {
            throw new ApiError(400, 'Contact status was not updated!')
        }
    })
    .catch(e => {
        throw e
    })
}



