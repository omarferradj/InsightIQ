import { Chat } from "../models/Chat.model";
import { Message } from "../models/Message.model";
import { runChatQA } from "../langchain/chatChain";

export async function handleChatMessage({
  userId,
  documentId,
  chatId,
  message,
}: {
  userId: string;
  documentId: string;
  chatId?: string;
  message: string;
}) {
  let chat = chatId
    ? await Chat.findById(chatId)
    : await Chat.create({ user: userId, document: documentId });

  const userMsg = await Message.create({
    chat: chat?._id,
    sender: "user",
    content: message,
  });

  const aiResponse = await runChatQA(documentId, message);

  const aiMsg = await Message.create({
    chat: chat?._id,
    sender: "ai",
    content: aiResponse,
  });

  return { chatId: chat?._id, messages: [userMsg, aiMsg] };
}

export async function getUserChats(userId: string) {
  return Chat.find({ user: userId }).populate("document", "title");
}

export async function getChatMessages(chatId: string) {
  return Message.find({ chat: chatId }).sort({ timestamp: 1 });
}
