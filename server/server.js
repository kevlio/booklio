require("dotenv").config();
const express = require("express");

const md5 = require("md5");
const jwt = require("jsonwebtoken");

const app = express();
const cors = require("cors");

app.use(cors());
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(express.json());

const usersRouter = require("./routers/users.router");
app.use(usersRouter);
const booksRouter = require("./routers/books.router");
app.use(booksRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
