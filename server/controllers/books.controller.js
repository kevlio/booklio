const model = require("../models/books.model");

async function getAllBooks(req, res) {
  const result = await model.getBooks();
  res.json(result);
}

async function getUserBooks(req, res) {
  const username = req.params.user;
  const activationCode = req.params.code;
  const result = await model.userBooks(username, activationCode);
  res.json(result);
}

async function filterUserBooks(req, res) {
  const filterMode = req.body.filterMode;
  const username = req.body.username;
  const activationCode = req.body.activationCode;

  console.log(username);
  console.log(activationCode);
  console.log(filterMode);
  console.log(typeof filterMode);

  //   if (typeof filterMode !== "number") {
  const result = await model.filterBooks(username, activationCode, filterMode);
  res.json(result);
  //   }
}

async function deleteOneBook(req, res) {
  const id = req.params.id;
  await model.deleteBook(id);
  res.send("todo deleted");
}

async function completeOneBook(req, res) {
  const id = req.params.id;
  const status = req.body.completed;
  await model.completionBook(id, status);
  res.send("todo updated");
}

async function reviewOneBook(req, res) {
  const id = req.params.id;

  const {
    title,
    authors,
    review,
    completed,
    image,
    rating,
    username,
    activationCode,
  } = req.body;

  const updatedBook = {
    id,
    title,
    authors,
    review,
    completed,
    image,
    rating,
    username,
    activationCode,
  };

  await model.reviewBook(updatedBook);
  res.send("todo updated");
}

async function addOneBook(req, res) {
  console.log("POST");
  console.log(req.body);

  const { title, review, completed, rating, username, activationCode } =
    req.body;
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
  console.log(pages);
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
    typeof rating === "number",
    typeof username === "string",
    typeof activationCode === "string",
    typeof image === "string")
  ) {
    console.log("conditions ok");
    const newBook = {
      title,
      authors,
      pages,
      published,
      image,
      review,
      rating,
      completed,
      username,
      activationCode,
    };
    await model.addBook(newBook);
    res.json(newBook);
  }
}

module.exports = {
  getAllBooks,
  addOneBook,
  deleteOneBook,
  completeOneBook,
  reviewOneBook,
  getUserBooks,
  filterUserBooks,
};
