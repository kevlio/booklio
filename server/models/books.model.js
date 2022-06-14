const db = require("../config/db");

// BASIC REQUIREMENTS (GET ALL, GET/ID, DELETE/ID, POST, PUT, PATCH)

// GET ALL BOOKS
function getBooks() {
  const sql = "SELECT * FROM books";
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

// GET ONE BOOK
function getOneBook(id) {
  const sql = "SELECT * FROM books where id = ?";
  return new Promise((resolve, reject) => {
    db.all(sql, [id], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// DELETE ONE BOOK
function deleteBook(id) {
  const sql = "DELETE from books where id = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, [id], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// ADD ONE BOOK
function addBook(book) {
  const sql =
    "INSERT INTO books (title, authors, pages, published, image, review, rating, completed, username, activation_code) VALUES (?,?,?,?,?,?,?,?,?,?)";
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

// UPDATE ONE BOOK (PARTIAL,COMPLETION, REQ PATCH)
function completionBook(id, status) {
  const sql = "UPDATE books SET completed = ? where id = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, [status, id], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

// UPDATE ONE BOOK (COMPLETELY, REQ PUT)
function reviewBook(book) {
  console.log("book");
  console.log(book);
  const sql =
    "UPDATE books SET title = ?, authors = ?, pages = ?, review = ?, completed = ?, image = ?, rating = ?, username = ?, activation_code = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        book.title,
        book.authors,
        book.pages,
        book.review,
        book.completed,
        book.image,
        book.rating,
        book.username,
        book.activationCode,
        book.id,
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

// BONUS REQUIREMENTS

// GET USER BOOKS
function userBooks(username) {
  const sql = "SELECT * FROM books WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.all(sql, username, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// FILTER USER BOOKS BY COMPLETION STATUS
function userBooksCompletion(username, completionStatus) {
  const sql = "SELECT * FROM books WHERE completed = ? AND username = ?";
  return new Promise((resolve, reject) => {
    db.all(sql, [completionStatus, username], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// FILTER USER BOOKS BY RATING
function userBooksRating(username, ascDesc) {
  const sql = `SELECT * FROM books WHERE username = ? ORDER BY rating ${ascDesc}`;
  return new Promise((resolve, reject) => {
    db.all(sql, [username], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// FILTER USER BOOKS BY COMPLETION AND RATING
function userBooksCompletionAndRating(username, completionStatus, ascDesc) {
  const sql = `SELECT * FROM books WHERE username = ? AND completed = ? ORDER BY rating ${ascDesc}`;
  return new Promise((resolve, reject) => {
    db.all(sql, [username, completionStatus], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// CONTROL FUNCTIONS
function checkBookObject(book) {
  if (
    typeof book.title === "string" &&
    typeof book.authors === "string" &&
    typeof book.pages === "number" &&
    typeof book.published === "string" &&
    typeof book.completed === "number" &&
    typeof book.review === "string" &&
    typeof book.rating === "number" &&
    typeof book.username === "string" &&
    typeof book.activationCode === "string" &&
    typeof book.image === "string"
  ) {
    console.log("Conditions true");
    return true;
  }
  console.log("Conditions false");
  return false;
}

module.exports = {
  getBooks,
  getOneBook,
  addBook,
  deleteBook,
  completionBook,
  reviewBook,
  userBooks,
  userBooksCompletion,
  userBooksRating,
  userBooksCompletionAndRating,
  checkBookObject,
};
