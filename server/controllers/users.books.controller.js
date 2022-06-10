const books = require("../models/books.model");
const users = require("../models/users.model");

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
  getUserBooksAndInfo,
};
