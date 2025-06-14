import { Request, Response } from "express";
import { handleChatMessage } from "../services/chat.service";
import { getUserChats } from "../services/chat.service";
import { getChatMessages } from "../services/chat.service";

export async function chatWithDocument(req: Request, res: Response) {
  try {
    const { documentId, chatId, message } = req.body;
    const userId = "684ad87b61bbb11ae4ee6a08"; // replace with real auth

    const result = await handleChatMessage({
      userId,
      documentId,
      chatId,
      message,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
}
export async function getChatHistory(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const chats = await getUserChats(userId);
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
}

export async function getMessagesByChatId(req: Request, res: Response) {
  try {
    const chatId = req.params.chatId;
    const messages = await getChatMessages(chatId);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
