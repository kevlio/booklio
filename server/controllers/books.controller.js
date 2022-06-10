const model = require("../models/books.model");
const users = require("../models/users.model");

const axios = require("axios").default;

async function getGoogleBooks(req, res) {
  const volumeSearch = req.query.volumeSearch;
  const authorSearch = req.query.authorSearch;

  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${volumeSearch}+$inauthor:${authorSearch}&key=${process.env.API_KEY}`
    )
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(404).send("Global books failed");
    });
}

async function getAllBooks(req, res) {
  const result = await model.getBooks();
  res.status(200).json(result);
}

async function getUserBooks(req, res) {
  console.log("GET USER BOOKS");
  let completed = req.query.completed && req.query.completed.toLowerCase();
  const rating = req.query.rating && req.query.rating.toUpperCase();
  const username = req.params.username;

  const userExist = await users.userCheck(username);
  console.log(userExist);

  if (!userExist) {
    return res.status(404).send("Användaren finns inte");
  }

  if (completed === undefined && rating === undefined) {
    console.log("get books");
    const result = await model.userBooks(username);
    return res.status(200).json(result);
  }

  if (rating) {
    if (rating !== "ASC" && rating !== "DESC") {
      return res.status(404).send("Wrong Rating filter Query");
    }
  }

  //   Get User Books By Rating
  if (rating && !completed) {
    console.log("ONLY RATING");
    const result = await model.userBooksRating(username, rating);
    return res.status(200).json(result);
  }

  if (completed) {
    if (completed !== "true" && completed !== "false") {
      return res.status(404).send("Wrong Completion filter Query");
    } else if (completed === "true") {
      completed = 1;
    } else if (completed === "false") {
      completed = 0;
    }
  }

  if (typeof completed === "number" && rating) {
    console.log("BOTH");
    const result = await model.userBooksCompletionAndRating(
      username,
      completed,
      rating
    );
    return res.status(200).json(result);
  }

  if (typeof completed === "number" && !rating) {
    //  Get User Books By Completion Status
    console.log("ONLY COMPLETE");
    const result = await model.userBooksCompletion(username, completed);
    return res.status(200).json(result);
  }
}

async function deleteOneBook(req, res) {
  const id = req.params.id;
  await model.deleteBook(id);
  res.status(200).json({ message: "Book deleted", status: 200 });
}

async function returnOneBook(req, res) {
  const id = req.body.id;
  console.log(id);
  const returnedBook = await model.getOneBook(id);
  await model.returnBook(returnedBook[0]);
  await model.deleteBook(id);
  res.status(200).json({ message: "Book returned", status: 200 });
}

async function getAllReturnedBooks(req, res) {
  console.log("get returned books");
  const result = await model.getReturnedBooks();
  res.status(200).json(result);
}

async function getAllReturnedBooksByRating(req, res) {
  console.log("Get Returned Books By Rating");
  const rating = req.query.rating && req.query.rating.toUpperCase();
  if (rating) {
    if (rating !== "ASC" && rating !== "DESC") {
      return res.status(404).send("Wrong Rating filter Query");
    }
  }
  const result = await model.getReturnedBooksFilterRating(rating);
  res.status(200).json(result);
}

async function getBook(req, res) {
  const id = req.params.id;
  const result = await model.getOneBook(id);
  res.status(200).json(result);
}

async function completeOneBook(req, res) {
  const id = req.params.id;
  const status = req.body.completed;
  await model.completionBook(id, status);
  res.status(200).json({ message: "Book Completion Updated", status: 200 });
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
  res.status(200).json({ message: "Book Review Updated", status: 200 });
}

async function addOneBook(req, res) {
  console.log(req);
  console.log(req.url);
  if (!req.is("application/json"))
    return res
      .status(400)
      .json({ message: "Invalid Content Type", status: 400 });
  console.log(req.is("application/json"));

  console.log("POST");
  console.log(req.body);

  const { id, title, review, completed, rating, username, activationCode } =
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

  if (!title)
    return res.status(400).json({ message: "Title is missing", status: 400 });
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
    if (req.url === "/users/lend/returned") {
      console.log("delete returned");
      await model.deleteReturnedBook(id);
    }
    await model.addBook(newBook);
    res.status(200).json(newBook);
  }
}

module.exports = {
  getAllBooks,
  getBook,
  addOneBook,
  deleteOneBook,
  completeOneBook,
  reviewOneBook,
  getUserBooks,
  returnOneBook,
  getAllReturnedBooks,
  getAllReturnedBooksByRating,
  getGoogleBooks,
};
