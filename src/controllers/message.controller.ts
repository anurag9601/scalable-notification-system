import { Request, Response } from "express";
import { emailProducer } from "../kafka/producer";
import { emailConsumer } from "../kafka/consumer";

export const handleUserSendEmail = async (req: Request, res: Response) => {
    try {
        const { id: receiveBy } = req.params;

        const user = res.user;

        const sendBy = user._id;

        const { message, type } = req.body;

        if (!message || !type) {
            return res.status(400).json({ error: "Fill all the fields" });
        }

        await emailProducer(sendBy, receiveBy, message, type);

        function returnResponse(resValues: Object) {
            return res.status(200).json({
                status: "send",
                data: resValues
            });
        };

        await emailConsumer("email-message", returnResponse)

    } catch (err) {

    }
}