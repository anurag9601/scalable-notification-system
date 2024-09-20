import express, { urlencoded } from "express";
import { connectMongoose } from "./database/db";
import dotEnv from "dotenv";

const app = express();
dotEnv.config();

app.use(express.json());
app.use(urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectMongoose();
})