import { Router } from "express";
import {
  chatWithDocument,
  getChatHistory,
  getMessagesByChatId,
} from "../controllers/chat.controller";

const router = Router();

router.post("/", chatWithDocument);
router.get("/history/:userId", getChatHistory);
router.get("/:chatId/messages", getMessagesByChatId);

export default router;
