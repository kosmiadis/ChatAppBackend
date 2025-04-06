import { Request, Response } from "express";
import User from "../models/User";
import { createToken } from "../util/jwt/createToken";
import { ApiError } from "../ErrorHandling/ApiError";

export async function login (req: Request<{},{},{email: string, password: string}>, res: Response) {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
        throw new ApiError(404, 'User not found');
    }
    const isValid = await foundUser.isValidPassword(password);

    if (!isValid) {
        throw new ApiError(401, 'Bad Credentials')
    }
    const token = createToken(foundUser.email);
    return res.status(200).cookie('_t', token).send({ user: foundUser })
}

export async function signup (req: Request<{}, {}, {username: string, email: string, password: string}>, res: Response) {
    const { username, email, password } = req.body;
    await new User({ username, email, password }).save()
    .then((user) => {
        const token = createToken(user.email);
        return res.cookie('_t', token).status(201).send({ user });
    })
    .catch((e: Error) => {
        if (e.message.includes('User validation failed')) {
            throw e;
        }
        throw new ApiError(404, e.message);
    })
}

export async function changePassword (req: Request, res: Response) {

}

export async function uploadImage (req: Request, res: Response) {

}

export async function me (req: Request, res: Response) {

}