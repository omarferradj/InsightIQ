import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RetrievalQAChain } from "langchain/chains";
import { getDocumentRetriever } from "./retriever";
import dotenv from "dotenv";

dotenv.config();

export async function runChatQA(docId: string, question: string) {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.3,
  });

  const retriever = await getDocumentRetriever(docId);

  const chain = RetrievalQAChain.fromLLM(model, retriever, {
    returnSourceDocuments: false,
  });

  const result = await chain.call({ query: question });
  return result.text;
}
