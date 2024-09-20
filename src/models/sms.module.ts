import mongoose from "mongoose";

const smsSchema = new mongoose.Schema({
    sendBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    message: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });

export const smsModel = mongoose.model("sms", smsSchema);