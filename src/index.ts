import express, { urlencoded } from "express";
import { connectMongoose } from "./database/db";
import dotEnv from "dotenv";

import router from "./routers/user.router";

const app = express();
dotEnv.config();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api/user", router)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectMongoose();
})