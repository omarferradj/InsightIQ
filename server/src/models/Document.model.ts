import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileType: { type: String },
    rawText: { type: String },
    uploadDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", DocumentSchema);
