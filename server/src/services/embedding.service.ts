import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getVectorStore } from "../langchain/vectorStore";

export async function embedDocumentChunks(
  documentText: string,
  metadata: object = {}
) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.createDocuments([documentText], metadata);
  console.log(`Split into ${chunks.length} chunks`);

  const vectorStore = await getVectorStore();
  console.log("🔗 Connected to Supabase vector store");

  await vectorStore.addDocuments(chunks);

  console.log("✅ Embedded & saved to Supabase");
  return { success: true, chunksStored: chunks.length };
}
