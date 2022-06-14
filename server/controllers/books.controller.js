const books = require("../models/books.model");
const users = require("../models/users.model");

const axios = require("axios").default;

// GET GLOBAL BOOKS
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
      res.status(404).send("The requested Books not found.");
    });
}

// BASIC REQUIREMENTS (GET ALL, GET/ID, DELETE/ID, POST, PUT, PATCH)

// GET ALL BOOKS
async function getAllBooks(req, res) {
  const result = await books.getBooks();
  res.status(200).json(result);
}

// GET ONE BOOK
async function getBook(req, res) {
  const id = req.params.id;
  const result = await books.getOneBook(id);
  if (!result.length)
    return res.status(404).json({ message: "Book not found", status: 404 });
  res.status(200).json(result);
}

// DELETE ONE BOOK
async function deleteOneBook(req, res) {
  const id = req.params.id;
  const result = await books.getOneBook(id);
  if (!result.length)
    return res.status(404).json({ message: "Book not found", status: 404 });

  await books.deleteBook(id);

  res.status(200).json({
    message: `Book deleted with ID ${result[0].id}`,
    book: result,
    status: 200,
  });
}

// ADD ONE BOOK
async function addOneBook(req, res) {
  if (!req.is("application/json"))
    return res
      .status(400)
      .json({ message: "Invalid Content Type", status: 400 });

  const { id, title, review, completed, rating, username, activationCode } =
    req.body;
  let authors = req.body.authors;

  if (typeof authors === "object") {
    if (authors.length === 1) {
      authors = authors[0];
    } else if (authors.length > 1) {
      authors = authors.join(", ");
    }
  }

  if (!title)
    return res.status(400).json({ message: "Title is missing", status: 400 });
  let pages = req.body.pages;
  console.log(pages);
  if (pages === undefined) pages = 0;
  let published = req.body.published;
  if (published === undefined) published = "NULL";
  let image = req.body.image;
  if (image === undefined) image = "NULL";

  console.log(typeof authors);

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

  const checkDatatypes = books.checkBookObject(newBook);
  if (!checkDatatypes)
    return res.status(422).json({
      message: "Object Keys missing or Incorrect Value Datatypes",
      status: 422,
    });

  if (req.url === "/users/lend/returned") {
    console.log("delete returned");
    await books.deleteReturnedBook(id);
  }

  await books.addBook(newBook);
  res.status(201).json(newBook);
}

// UPDATE ONE BOOK (PARTIAL,COMPLETION, REQ PATCH)
async function completeOneBook(req, res) {
  const id = req.params.id;
  const status = req.body.completed;
  console.log(typeof status);
  const result = await books.getOneBook(id);

  console.log("update one book");

  if (!req.is("application/json"))
    return res
      .status(400)
      .json({ message: "Invalid Content Type", status: 400 });

  if (!status === 0 && !status === 1)
    return res
      .status(400)
      .json({ message: "Completion Status is missing", status: 400 });

  if (!result.length)
    return res.status(404).json({ message: "Book not found", status: 404 });

  await books.completionBook(id, status);
  const resultUpdated = await books.getOneBook(id);

  res.status(200).json({
    message: `Book partially updated with ID ${result[0].id}`,
    book: resultUpdated,
    status: 200,
  });
}

// UPDATE ONE BOOK (COMPLETELY, REQ PUT)
async function reviewOneBook(req, res) {
  const id = req.params.id;
  const {
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
  } = req.body;

  const updatedBook = {
    id,
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

  console.log(updatedBook);

  if (!req.is("application/json"))
    return res
      .status(400)
      .json({ message: "Invalid Content Type", status: 400 });

  const result = await books.getOneBook(id);

  if (!result.length)
    return res.status(404).json({ message: "Book not found", status: 404 });

  const checkDatatypes = books.checkBookObject(updatedBook);
  if (!checkDatatypes)
    return res.status(422).json({
      message: "Object Keys missing or Incorrect Value Datatypes",
      status: 422,
    });

  await books.reviewBook(updatedBook);
  const resultUpdated = await books.getOneBook(id);

  res.status(200).json({
    message: `Book updated with ID ${result[0].id}`,
    book: resultUpdated,
    status: 200,
  });
}

// BONUS REQUIREMENTS

// GET USER BOOKS
async function getUserBooks(req, res) {
  const username = req.params.username;
  let completed = req.query.completed && req.query.completed.toLowerCase();
  const rating = req.query.rating && req.query.rating.toUpperCase();

  const userExist = await users.userCheck(username);
  console.log(userExist);

  if (!userExist) {
    return res.status(404).json({
      message: `User: ${username} doesn't exist`,
      status: 404,
    });
  }

  if (completed === undefined && rating === undefined) {
    console.log("get books");
    const result = await books.userBooks(username);
    return res.status(200).json(result);
  }

  if (completed || rating) {
    filterUserBooks(username, completed, rating, req, res);
  }
}

// FILTER USER BOOKS BY COMPLETION AND RATING
async function filterUserBooks(username, completed, rating, req, res) {
  if (rating) {
    if (rating !== "ASC" && rating !== "DESC") {
      return res.status(404).send("Wrong Rating filter Query");
    }
  }
  //   Get User Books By Rating
  if (rating && !completed) {
    console.log("ONLY RATING");
    const result = await books.userBooksRating(username, rating);
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
    const result = await books.userBooksCompletionAndRating(
      username,
      completed,
      rating
    );
    return res.status(200).json(result);
  }

  //  Get User Books By Completion Status
  if (typeof completed === "number" && !rating) {
    console.log("ONLY COMPLETE");
    const result = await books.userBooksCompletion(username, completed);
    return res.status(200).json(result);
  }
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

  await books.returnBook(returnedBook[0]);
  await books.deleteBook(id);

  res.status(200).json({
    message: `Book returnd with ${id}`,
    book: returnedBook,
    status: 200,
  });
}

// GET ALL RETURNED BOOKS
async function getAllReturnedBooks(req, res) {
  const count = await books.getReturnedBooksCount();
  const amount = count[0]["COUNT(*)"];
  const result = await books.getReturnedBooks();
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
  const result = await books.getReturnedBooksFilterRating(rating);
  res.status(200).json(result);
}

// GET USER BOOKS AND INFO
async function getUserBooksAndInfo(req, res) {
  console.log("GET USER BOOKS + INFO");
  const username = req.params.username;
  console.log(username);

  const userExist = await users.userCheck(username);
  console.log(userExist);

  if (!userExist) {
    return res.status(404).send("Användaren finns inte");
  }
  const usersBooks = await books.userBooks(username);
  const usersInfo = await users.getOneUser(username);
  res.status(200).json({ usersInfo, usersBooks });
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
  getUserBooksAndInfo,
};
