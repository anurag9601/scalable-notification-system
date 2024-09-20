import { kafka } from "./admin";
import { userModel } from "../models/user.module";

// const group = process.argv[2];

export default async function userConsumer(group: string, returnResponse: Function) {

    const consumer = kafka.consumer({ groupId: group });

    console.log("Consumer connecting...");

    await consumer.connect();

    console.log("Consumer connected successfully");

    await consumer.subscribe({ topics: ["user"] });

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
                        await returnResponse(newUser.email, newUser._id);
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