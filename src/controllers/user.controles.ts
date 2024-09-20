import { Request, Response } from "express";
import { userModel } from "../models/user.module";
import bcrypt from "bcrypt";
import { userProducer } from "../kafka/producer";
import userConsumer from "../kafka/consumer";

export const handleUserSignup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Fill all the fields" });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User alread exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await userProducer(email, hashedPassword);

        function returnResponse(email: string, _id: string) {
            return res.status(201).json({
                status: "successful",
                data: {
                    email,
                    _id,
                }
            })
        }

        await userConsumer("user", returnResponse);

    } catch (err) {
        console.log("Error in handleUserSignup function", err);
        return res.status(500).json({ error: "Unexpected error occured" });
    }
}