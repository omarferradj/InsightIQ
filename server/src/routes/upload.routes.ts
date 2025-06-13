import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadDocument } from "../controllers/upload.controller";

const router = Router();
const upload = multer({
  dest: path.join(__dirname, "../../uploads/"),
});

router.post("/", upload.single("file"), uploadDocument);

export default router;
