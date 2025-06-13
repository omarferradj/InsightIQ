import { Document } from "../models/Document.model";
import { extractTextFromFile } from "../utils/fileHandler";

export async function handleDocumentUpload({
  userId,
  filePath,
  originalName,
  mimeType,
}: {
  userId: string;
  filePath: string;
  originalName: string;
  mimeType: string;
}) {
  const rawText = await extractTextFromFile(filePath, mimeType);

  const doc = new Document({
    title: originalName,
    user: userId,
    fileType: mimeType,
    rawText,
  });

  return await doc.save();
}
