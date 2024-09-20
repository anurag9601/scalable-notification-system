import express, { urlencoded } from "express";
import { connectMongoose } from "./database/db";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routers/user.router";
import messageRouter from "./routers/message.router";

const app = express();
dotEnv.config();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectMongoose();
})