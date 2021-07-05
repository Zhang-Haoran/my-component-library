const express = require("express");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const db = require("./utils/db");
const auth = require("../src/middleware/auth");
const app = express();
app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",auth,userRouter);
db.connectToDB();
module.exports = app;


