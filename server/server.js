require("dotenv").config();
const express = require("express");

const md5 = require("md5");
const jwt = require("jsonwebtoken");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const usersRouter = require("./routers/users.router");
const booksRouter = require("./routers/books.router");
const authRouter = require("./routers/auth.router");
const lendRouter = require("./routers/lend.router");

app.use("/users", usersRouter);
app.use(booksRouter);
app.use("/auth", authRouter);
app.use("/lend", lendRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
