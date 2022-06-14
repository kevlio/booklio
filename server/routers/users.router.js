const express = require("express");

const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

const auth = require("../middlewares/auth");

usersRouter.get("/users", usersController.getAllUsers);
usersRouter.get("/users/:username", auth, usersController.getUser);
usersRouter.post("/auth/register", usersController.registerUser);
usersRouter.post("/auth/login", usersController.loginUser);

module.exports = usersRouter;
