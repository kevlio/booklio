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

function getReturnedBooks() {
  const sql = "SELECT * FROM returned_books";
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

function userBooksRating(username, ascDesc) {
  // Går detta att göra utan ``?
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
    db.run(sql, [id], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

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
  getOneBook,
  addBook,
  deleteBook,
  completionBook,
  reviewBook,
  userBooks,
  userBooksCompletion,
  userBooksRating,
  userBooksCompletionAndRating,
  returnBook,
  getReturnedBooks,
  deleteReturnedBook,
  getReturnedBooksFilterRating,
};
