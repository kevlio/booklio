const express = require("express");

const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

booksRouter.get("/books", booksController.getAllBooks);
booksRouter.get("/books/:user/:code", booksController.getUserBooks);
booksRouter.post("/books", booksController.addOneBook);
booksRouter.post("/books/filter", booksController.filterUserBooks);
booksRouter.delete("/books/:id", booksController.deleteOneBook);
booksRouter.patch("/books/:id", booksController.completeOneBook);
booksRouter.put("/books/:id", booksController.reviewOneBook);

module.exports = booksRouter;
