import mongoose from "mongoose";

export const connectMongoose = () =>{
    const url = process.env.MONGO_DB as string;
    mongoose.connect(url).then((e)=>{
        console.log("Mongoose connected");
    })
}