import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  createdAt: { type: Date, default: Date.now },
});

export const Chat = mongoose.model("Chat", ChatSchema);
