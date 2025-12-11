const express = require("express");
const cors = require("cors");
const { authRouter, router } = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", (_, res) => res.send("Welcome message from server"));
app.use("/auth", authRouter);
app.use("/api", router);

module.exports = app;