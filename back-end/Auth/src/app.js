const express = require("express");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/auth");
const app = express();
app.use(express.json());

app.use("/api/v1/auth",authRouter);
module.exports = app;


