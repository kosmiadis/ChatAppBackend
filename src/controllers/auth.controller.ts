import { Request, Response } from "express";
import User from "../models/User";
import { createToken } from "../util/jwt/createToken";
import { ApiError } from "../ErrorHandling/ApiError";
import { sendSuccess, sendCookie, sendError } from "../util/responses/responseTemplate";
import { hash } from "bcrypt";
import { UserI } from '../models/User';

export async function login (req: Request<{},{},{email: string, password: string}>, res: Response) {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
        throw new ApiError(404, 'User not found');
    }
    const isValid = await foundUser.isValidPassword(password);

    if (!isValid) {
        throw new ApiError(401, 'Invalid Credentials')
    }
    const token = createToken(foundUser._id, foundUser.email);
    sendCookie(res, '_t', token, 'Login Successful', foundUser);
}

export async function signup (req: Request<{}, {}, {username: string, email: string, password: string}>, res: Response) {
    const { username, email, password } = req.body;
    await new User({ username, email, password }).save()
    .then((user) => {
        const token = createToken(user._id, user.email);
        sendCookie(res, '_t', token, 'SignUp Successful', user);
    })
    .catch((e: Error) => {
        if (e.message.includes('User validation failed')) {
            throw e;
        }
        throw new ApiError(404, e.message);
    })
}

export async function resetPassword (req: Request<{},{},{ password: string, newPassword: string}>, res: Response) {
    const { email } = req;
    const { password, newPassword } = req.body;

    await User.findOne({ email })
    .then( async (foundUser) => {
        
        const isValidPass = await foundUser?.isValidPassword(password) 
        if (!isValidPass) {
            throw new ApiError(401, 'Incorrect Password');
        }

        const hashedNewPassword = await hash(newPassword, 10);

        await User.updateOne({ email }, {
            $set: { password: hashedNewPassword }
        })
        .then(({ modifiedCount, upsertedId }) => {
            sendSuccess(res, 'Password reset was successful', { upsertedId, modifiedCount });
        })
        .catch(e => {
            throw e;
        })
    })
    .catch(e => {
        throw e;
    })
}

export async function uploadImage (req: Request, res: Response) {
    if (!req.file) sendError(res, 'Something went wrong while uploading file', {})
    sendSuccess(res, 'Image uploaded!');
}

export async function me (req: Request, res: Response) {
    const { email } = req;
    await User.findOne({ email })
    .then((foundUser) => {
        sendSuccess(res, 'Authenticated', { user: foundUser });
    })
    .catch(e => {
        sendError(res, 'Something went wrong while loading account information...', { message: e.message });
    })
}   

export async function updateAccountInfo (req: Request<{}, {}, {updates: UserI}>, res: Response) {
    const { email } = req;
    const updates = req.body.updates;

    await User.updateOne({ email }, {
        $set: { ...updates }
    })
    .then(({ upsertedId }) => {
        sendSuccess(res, 'Account info updated successfuly!', { upsertedId });
    })
    .catch(e => {
        throw new ApiError(400, 'Account was not updated, something went wrong!');
    })
}

export async function deleteAccount (req: Request, res: Response) {
    const { email } = req;
    await User.deleteOne({ email })
    .then(({ deletedCount }) => {
        sendSuccess(res, 'Account deleted successfuly', { deletedCount });
    })
    .catch(e => {
        throw e;
    })
}

