const express = require("express");

const app = express();

const sqlite3 = require("sqlite3");
const cors = require("cors");

app.use(cors());
app.use(express.json());

let sql;

// Connect to DB
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});

// Create table
sql =
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY, title VARCHAR(255), authors VARCHAR(255), pages int, published VARCHAR(255), image VARCHAR(255), review VARCHAR(255), completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)))";
db.run(sql);
let sql2 =
  "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username VARCHAR(255), Activation_code VARCHAR(255))";
db.run(sql2);

// POST

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  sql = "DELETE from books where id = ?";
  db.run(sql, [id], (err) => {
    if (err) throw err;
    res.send("Todo deleted");
  });
});

app.post("/users", (req, res) => {
  const username = req.body.username;
  const activationCode = req.body.activationCode;

  if (typeof username !== "string" && typeof activationCode !== "string")
    return;

  console.log(username);
  console.log(activationCode);

  let sql = "INSERT INTO users(username, Activation_code) VALUES (?,?)";
  db.run(sql, [username, activationCode], (err) => {
    if (err) throw err;
    console.log("POST SUCCESS");
  });
  res.send({ username: username, activationCode: activationCode });
});

app.post("/books", (req, res) => {
  console.log("POST");

  console.log(req.body);

  const title = req.body.title;
  const review = req.body.review;
  const completed = req.body.completed;

  let authors = req.body.authors;
  console.log(authors.length);
  if (typeof authors === "object") {
    console.log(typeof authors);
    console.log(authors);

    if (authors.length === 1) {
      console.log(authors);
      console.log(typeof authors);
      authors = authors[0];
    } else if (authors.length > 1) {
      console.log(authors);
      authors = authors.join(", ");
    }
  }

  if (!title) return;
  let pages = req.body.pages;
  if (pages === undefined) pages = 0;
  let published = req.body.published;
  if (published === undefined) published = 0;
  let image = req.body.image;
  if (image === undefined) image = 0;

  console.log(typeof authors);

  if (
    (title,
    typeof authors === "string",
    typeof pages === "number",
    typeof published === "string",
    typeof completed === "number",
    typeof review === "string",
    typeof image === "string")
  ) {
    console.log("conditions ok");
    sql =
      "INSERT INTO books (title, authors, pages, published, image, review, completed) VALUES (?,?,?,?,?,?,?)";
    db.run(
      sql,
      [title, authors, pages, published, image, review, completed],
      (err) => {
        if (err) throw err;
        res.send("Values inserted");
      }
    );
  }
});

app.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;
  sql = "UPDATE books SET completed = ? where id = ?";
  db.run(sql, [completed, id], (err) => {
    if (err) throw err;
    res.send("Completed updated");
  });
});

app.put("/books/:id", (req, res) => {
  console.log("PUT");
  const id = req.params.id;
  const title = req.body.title;
  const authors = req.body.authors;
  const review = req.body.review;
  const completed = req.body.completed;
  const image = req.body.image;
  console.log(req.body);
  sql =
    "UPDATE books SET title = ?, authors = ?, review = ?, completed = ?, image = ? where id = ?";
  db.run(sql, [title, authors, review, completed, image, id], (err) => {
    if (err) throw err;
    res.send("Completed updated");
  });
});

app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/books/filter", (req, res) => {
  const filterMode = req.body.filterMode;
  console.log(filterMode);
  console.log(typeof filterMode);
  if (typeof filterMode !== "number") {
    db.all("SELECT * FROM books", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  }
  if (typeof filterMode === "number") {
    db.all(
      `SELECT * FROM books WHERE completed = ${filterMode}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
