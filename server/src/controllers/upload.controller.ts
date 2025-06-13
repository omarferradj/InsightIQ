import { Request, Response } from "express";
import { handleDocumentUpload } from "../services/upload.service";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
    interface Request {
      user?: User;
    }
  }
}

export async function uploadDocument(req: Request, res: Response) {
  try {
    const file = req.file;
    const userId = "684ad87b61bbb11ae4ee6a08"; // Replace with real auth

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const savedDoc = await handleDocumentUpload({
      userId,
      filePath: file.path,
      originalName: file.originalname,
      mimeType: file.mimetype,
    });

    res.status(201).json({ message: "File uploaded", document: savedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}
