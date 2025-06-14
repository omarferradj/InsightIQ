import { getVectorStore } from "./vectorStore";

export async function getDocumentRetriever(docId: string) {
  const store = await getVectorStore();
  return store.asRetriever({
    filter: {
      docId,
    },
    k: 4,
  });
}
