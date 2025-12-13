import express from "express";
import cors from "cors";
import { authRouter, router } from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", (_, res) => res.send("Welcome message from server"));
app.use("/auth", authRouter);
app.use("/api", router);

export default app;