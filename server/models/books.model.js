const db = require("../config/db");

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

function userBooks(username, activationCode) {
  const sql = "SELECT * FROM books WHERE username = ? AND activation_code = ?";
  return new Promise((resolve, reject) => {
    db.all(sql, [username, activationCode], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

// Activation code already used in create/log in. Överflödigt.
function filterBooks(username, activationCode, filterMode) {
  // IF FILTERMODE STRING = "ALL" hantera snyggare, mindre kod
  console.log(typeof filterMode);
  if (typeof filterMode !== "number") {
    const sql =
      "SELECT * FROM books WHERE username = ? AND activation_code = ?";
    return new Promise((resolve, reject) => {
      db.all(sql, [username, activationCode], (error, rows) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(rows);
      });
    });
  }

  // Fixa detta tillsammans med kodstycke ovan
  if (typeof filterMode === "number") {
    const sql =
      "SELECT * FROM books WHERE completed = ? AND username = ? AND activation_code = ?";
    return new Promise((resolve, reject) => {
      db.all(sql, [filterMode, username, activationCode], (error, rows) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(rows);
      });
    });
  }
}

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

function deleteBook(id) {
  const sql = "DELETE from books where id = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, [id], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

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

module.exports = {
  getBooks,
  addBook,
  deleteBook,
  completionBook,
  reviewBook,
  userBooks,
  filterBooks,
};
