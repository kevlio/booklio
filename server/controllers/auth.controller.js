const auth = require("../models/auth.model");
const users = require("../models/users.model");

const md5 = require("md5");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, activationCode, email, password } = req.body;

  const userExist = await users.userCheck(username);

  if (userExist) {
    return res.status(400).json({
      message: "User already exist",
      status: 400,
    });
  }

  if (
    typeof username !== "string" ||
    typeof activationCode !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    username.length === 0 ||
    activationCode.length === 0 ||
    email.length === 0 ||
    password.length === 0
  )
    return res.status(422).json({
      message: "Object Keys missing or Incorrect Value Datatypes",
      status: 422,
    });

  const newUser = {
    username,
    activationCode,
    email,
    password: md5(password),
  };

  await auth.addUser(newUser);

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
    return res.status(400).json({
      message: "Please send username and password to login",
      status: 400,
    });
  }

  const userExist = await users.userCheck(username);
  console.log(userExist);

  if (!userExist) {
    return res.status(404).json({
      message: "User doesn't exist",
      status: 404,
    });
  }

  const hashedPassword = md5(password);
  if (userExist.password !== hashedPassword) {
    return res.status(400).json({
      message: "Incorrect password",
      status: 400,
    });
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
  registerUser,
  loginUser,
};
