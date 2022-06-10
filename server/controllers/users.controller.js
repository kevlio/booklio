const model = require("../models/users.model");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

async function getAllUsers(req, res) {
  const result = await model.getUsers();
  res.status(200).json(result);
}

async function getUser(req, res) {
  const username = req.params.username;
  const result = await model.getOneUser(username);
  res.status(200).json(result);
}

async function registerUser(req, res) {
  const { username, activationCode, email, password } = req.body;

  if (typeof username !== "string" && typeof activationCode !== "string")
    return res.status(400).send("Wrong format users");

  const newUser = {
    username,
    activationCode,
    email,
    password: md5(password),
  };

  await model.addUser(newUser);

  const token = jwt.sign(
    {
      id: newUser.id,
      username: newUser.username,
    },
    process.env.SECRET_KEY
  );
  res.status(201).json(token);
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Du måste skicka in username och lösenord");
  }

  const userExist = await model.userCheck(username);
  console.log(userExist);

  if (!userExist) {
    return res.status(404).send("Användaren finns inte");
  }

  const hashedPassword = md5(password);
  if (userExist.password !== hashedPassword) {
    return res.status(400).send("Lösenordet matchade inte");
  }

  const token = jwt.sign(
    {
      id: userExist.id,
      username: userExist.username,
    },
    process.env.SECRET_KEY
  );

  res.status(200).json(token);
}

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
};
