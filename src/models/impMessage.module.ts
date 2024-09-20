import mongoose from "mongoose";

const impMessageSchema = new mongoose.Schema({
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

export const impMessageModel = mongoose.model("impMessage", impMessageSchema);