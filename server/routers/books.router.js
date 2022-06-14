const express = require("express");

const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

const auth = require("../middlewares/auth");

booksRouter.get("/books/global", booksController.getGoogleBooks);
// Basic Requirements
booksRouter.get("/books", booksController.getAllBooks);
booksRouter.post("/books", booksController.addOneBook);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.delete("/books/:id", booksController.deleteOneBook);

booksRouter.patch("/books/:id", booksController.completeOneBook);
booksRouter.put("/books/:id", booksController.reviewOneBook);

// Bonus Requirements
booksRouter.get("/me/:username/books", auth, booksController.getUserBooks);
booksRouter.get("/me/:username/all", auth, booksController.getUserBooksAndInfo);

module.exports = booksRouter;
