const model = require("../models/users.model");

async function getAllUsers(req, res) {
  const result = await model.getUsers();
  res.status(200).json(result);
}

async function getUser(req, res) {
  const username = req.params.username;
  const result = await model.getOneUser(username);
  res.status(200).json(result);
}

module.exports = {
  getAllUsers,
  getUser,
};
