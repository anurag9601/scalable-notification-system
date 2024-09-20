import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface userObjectType {
    _id: Types.ObjectId,
    email: string,
}

export const createUserToken = (user: userObjectType) => {
    const secret = process.env.SECRET as string;

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = jwt.sign(payload, secret);
    return token
}

export const verifyUserToken = (token: string) => {

    const secret = process.env.SECRET as string;

    const payload = jwt.verify(token, secret)

    return payload;
}