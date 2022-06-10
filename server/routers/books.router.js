const express = require("express");

const booksController = require("../controllers/books.controller");
const usersController = require("../controllers/users.controller");

const combinedController = require("../controllers/users.books.controller");
const booksRouter = express.Router();

const auth = require("../middlewares/auth");

booksRouter.get("/books/global", booksController.getGoogleBooks);
// Basic Requirements
booksRouter.get("/books", booksController.getAllBooks);
booksRouter.get("/books/:id", booksController.getBook);
booksRouter.post("/books", booksController.addOneBook);
booksRouter.delete("/books/:id", auth, booksController.deleteOneBook);

booksRouter.patch("/books/:id", auth, booksController.completeOneBook);
booksRouter.put("/books/:id", auth, booksController.reviewOneBook);

// Bonus Requirements
booksRouter.get("/:username/books", auth, booksController.getUserBooks);
booksRouter.post("/users/lend", auth, booksController.addOneBook);

booksRouter.post("/users/lend/returned", auth, booksController.addOneBook);

booksRouter.post("/users/return", auth, booksController.returnOneBook);

booksRouter.get("/returned", auth, booksController.getAllReturnedBooks);

booksRouter.get(
  "/returned/filter",
  auth,
  booksController.getAllReturnedBooksByRating
);

booksRouter.get("/me/:username", auth, combinedController.getUserBooksAndInfo);

module.exports = booksRouter;
