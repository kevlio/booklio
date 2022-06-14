const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  const books =
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, authors TEXT, pages INT, published TEXT, image TEXT, username TEXT, activation_code TEXT, rating INT, review TEXT, completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)))";

  const returnedBooks =
    "CREATE TABLE IF NOT EXISTS returned_books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, authors TEXT, pages INT, published TEXT, image TEXT, username TEXT, activation_code TEXT, rating INT, review TEXT, completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)))";

  const users =
    "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT, activation_code TEXT)";

  db.run(books, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Books table already created");
    }
  });

  db.run(returnedBooks, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Returned books table already created");
    }
  });

  db.run(users, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    } else {
      console.log("Users table already created");
    }
  });
});

module.exports = db;
