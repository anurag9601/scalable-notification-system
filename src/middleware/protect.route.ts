import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "../services/jwt";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({ error: "Token not found" });
        }

        const validToken = await verifyUserToken(token);

        if (!validToken) {
            return res.status(401).json({ error: "Invalid token" })
        }

        //when we will try to insert value of user by declaring varibale key then it will give us type error that user con't exist in Response so for solving this problem we will create <file_name>.d.ts file in this file name d stands for declaration so we will create typescript declaration file and then define type of user using interface for example: open express.d.ts file

        res.user = validToken;
    } catch (err) {
        console.log("Error in protectRoute function", err);
        res.status(500).json({ error: "Unexpected error occured" });
    } finally {
        next();
    }
}