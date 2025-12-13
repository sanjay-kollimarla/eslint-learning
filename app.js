
import cors from "cors";
import express from "express";
import { authRouter, router } from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", router);

export default app;
