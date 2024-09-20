import { kafka } from "./admin";
import { userModel } from "../models/user.module";
import { createUserToken } from "../services/jwt";
import { emailModel } from "../models/email.module";

// const group = process.argv[2];

export async function userConsumer(group: string, returnResponse: Function) {

    const consumer = kafka.consumer({ groupId: group });

    console.log("Consumer connecting...");

    await consumer.connect();

    console.log("Consumer connected successfully");

    await consumer.subscribe({ topic: "user" });

    await consumer.run({
        eachMessage: async ({ message, pause }) => {
            const values = message.value?.toString();
            if (values) {
                const value = JSON.parse(values);
                try {
                    const newUser = await userModel.create({
                        email: value.email,
                        password: value.password
                    });

                    if (newUser) {

                        const token = await createUserToken(newUser);

                        await returnResponse(newUser.email, newUser._id, token);
                    }

                } catch (err) {
                    console.log("error", err)
                    console.log("Something went wrong");
                    pause();
                    setTimeout(() => {
                        consumer.resume([{ topic: "user" }]);
                    }, 60 * 1000)
                }
            }
        }
    });
}

export async function emailConsumer(group: string, returnResponse: Function) {
    const consumer = await kafka.consumer({ groupId: group });

    console.log("Consumer connecting...")
    await consumer.connect();


    await consumer.subscribe({ topic: "email-message" });

    await consumer.run({
        eachMessage: async ({ message, pause }) => {
            const values = message.value?.toString();
            console.log("values", values);
            if (values) {
                const value = JSON.parse(values);
                console.log("value", value)
                try {
                    const newEmail = await emailModel.create({
                        sendBy: value.sendBy,
                        receiveBy: value.receiveBy,
                        message: value.message,
                    });

                    console.log("newEmail",newEmail);

                    if (newEmail) {
                        const resValues = {
                            _id: newEmail._id,
                            sendBy: newEmail.sendBy,
                            receiveBy: newEmail.receiveBy,
                            message: newEmail.message,
                        }
                        await returnResponse(resValues)
                    }

                } catch (err) {
                    console.log("error", err)
                    console.log("Something went wrong");
                    pause();
                    setTimeout(() => {
                        consumer.resume([{ topic: "email-message" }]);
                    }, 60 * 1000)
                }
            }
        }
    })
}