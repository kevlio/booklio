const books = require("../models/books.model");
const lend = require("../models/lend.model");

// GET ALL RETURNED BOOKS
async function getAllReturnedBooks(req, res) {
  const count = await lend.getReturnedBooksCount();
  const amount = count[0]["COUNT(*)"];
  const result = await lend.getReturnedBooks();
  res.status(200).json({ amount, result });
}

// GE ALL RETURNED BOOKS BY RATING
async function getAllReturnedBooksByRating(req, res) {
  const rating = req.query.rating && req.query.rating.toUpperCase();
  if (rating) {
    if (rating !== "ASC" && rating !== "DESC") {
      return res
        .status(404)
        .json({ message: "Wrong Rating filter Query", status: 404 });
    }
  }
  const result = await lend.getReturnedBooksFilterRating(rating);
  res.status(200).json(result);
}

// RETURN ONE LEND BOK (POST TO DB: RETURNED BOOKS, DELETE IN DB: BOOKS)
async function returnOneBook(req, res) {
  // const username = req.body.id;
  const id = req.body.id;
  console.log(id);
  console.log(typeof id);

  if (!id)
    return res.status(400).json({ message: "Book ID is missing", status: 400 });

  const returnedBook = await books.getOneBook(id);

  if (!returnedBook.length)
    return res.status(404).json({ message: "Book not found", status: 404 });

  await lend.returnBook(returnedBook[0]);
  await books.deleteBook(id);

  res.status(200).json({
    message: `Book returnd with ${id}`,
    book: returnedBook,
    status: 200,
  });
}

module.exports = {
  returnOneBook,
  getAllReturnedBooks,
  getAllReturnedBooksByRating,
};
