const db = require("../config/db");

// RETURN ONE LEND BOK (POST TO DB: RETURNED BOOKS, DELETE IN DB: BOOKS)
function returnBook(book) {
  console.log(book);
  const sql =
    "INSERT INTO returned_books (title, authors, pages, published, image, review, rating, completed, username, activation_code) VALUES (?,?,?,?,?,?,?,?,?,?)";
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        book.title,
        book.authors,
        book.pages,
        book.published,
        book.image,
        book.review,
        book.rating,
        book.completed,
        book.username,
        book.activationCode,
      ],
      (error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve();
      }
    );
  });
}

// DELETE RETURNED BOOK
function deleteReturnedBook(id) {
  const sql = "DELETE from returned_books where id = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, [id], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

// GET ALL RETURNED BOOKS
function getReturnedBooks() {
  const sql = "SELECT * FROM returned_books";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log("fail");
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// GET AMOUNT RETURNED BOOKS
function getReturnedBooksCount() {
  const sql = "SELECT COUNT(*) FROM returned_books";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// GE ALL RETURNED BOOKS BY RATING
function getReturnedBooksFilterRating(ascDesc) {
  const sql = `SELECT * FROM returned_books ORDER BY rating ${ascDesc}`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  returnBook,
  getReturnedBooks,
  deleteReturnedBook,
  getReturnedBooksCount,
  getReturnedBooksFilterRating,
};
