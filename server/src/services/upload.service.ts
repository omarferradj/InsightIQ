import { Document } from "../models/Document.model";
import { extractTextFromFile } from "../utils/fileHandler";
import { embedDocumentChunks } from "./embedding.service";

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

  await embedDocumentChunks(rawText, {
    docId: doc._id.toString(),
    title: originalName,
    userId: userId,
  });
  return await doc.save();
}
