const express = require("express");

const booksController = require("../controllers/books.controller");

const lendController = require("../controllers/lend.controller");
const lendRouter = express.Router();

const auth = require("../middlewares/auth");

// lend from global or returned books
lendRouter.post("/", auth, booksController.addOneBook);

// Return book to returned books
lendRouter.post("/return", auth, lendController.returnOneBook);

// Get all returned books
lendRouter.get("/returned", auth, lendController.getAllReturnedBooks);

// Filter all returned books
lendRouter.get(
  "/returned/filter",
  auth,
  lendController.getAllReturnedBooksByRating
);

module.exports = lendRouter;
