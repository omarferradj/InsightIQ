import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { geminiEmbedder } from "./embedder";
import { supabase } from "../config/supabase";

export const getVectorStore = async () => {
  return await SupabaseVectorStore.fromExistingIndex(geminiEmbedder, {
    client: supabase,
    tableName: "documents",
    queryName: "match_documents",
  });
};
