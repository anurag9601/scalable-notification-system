import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    sendBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    receiveBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    message: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });

export const emailModel = mongoose.model("email", emailSchema);
