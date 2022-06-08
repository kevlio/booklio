const model = require("../models/users");

async function getAllUsers(req, res) {
  const result = await model.getUsers();
  res.json(result);
}

async function registerUser(req, res) {
  const { username, activationCode, email, password } = req.body;

  if (typeof username !== "string" && typeof activationCode !== "string")
    return res.status(400).send("Wrong format users");

  const newUser = {
    username,
    activationCode,
    email,
    password,
  };

  await model.addUser(newUser);

  res.json(newUser);
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  const userExist = await model.userCheck(username, password);
  console.log(userExist);

  if (!userExist) {
    return res.status(404).send("Användaren finns inte");
  }

  if (typeof username !== "string" && typeof password !== "string")
    return res.status(400).send("Du måste skicka in email och lösenord");

  res.send({ username: username, password: password });
}

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
