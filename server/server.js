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
// sql =
//   "CREATE TABLE books(id INTEGER PRIMARY KEY, title VARCHAR(255), pages int, published VARCHAR(255), review VARCHAR(255), completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)))";
// db.run(sql);

// POST

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  sql = "DELETE from books where id = ?";
  db.run(sql, [id], (err) => {
    if (err) throw err;
    res.send("Todo deleted");
  });
});

app.post("/books", (req, res) => {
  console.log("POST");
  const title = req.body.title;
  const review = req.body.review;
  if (!title) return;
  let pages = req.body.pages;
  if (pages === undefined) pages = 0;
  let published = req.body.published;
  if (published === undefined) published = 0;
  const completed = req.body.completed;

  if (
    (title,
    typeof pages === "number",
    typeof published === "string",
    typeof completed === "number",
    typeof review === "string")
  ) {
    console.log("conditions true");
    sql =
      "INSERT INTO books (title, pages, published, completed, review) VALUES (?,?,?,?,?)";
    db.run(sql, [title, pages, published, completed, review], (err) => {
      if (err) throw err;
      res.send("Values inserted");
    });
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
  const review = req.body.review;
  const completed = req.body.completed;
  sql = "UPDATE books SET title = ?, review = ?, completed = ? where id = ?";
  db.run(sql, [title, review, completed, id], (err) => {
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

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
