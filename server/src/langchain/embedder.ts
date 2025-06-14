import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

export const geminiEmbedder = new GoogleGenerativeAIEmbeddings({
  model: "embedding-001",
  apiKey: process.env.GEMINI_API_KEY,
});
