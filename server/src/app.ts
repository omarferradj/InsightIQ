import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import chatRoutes from "./routes/chat.routes";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("server in running");
});

export default app;
