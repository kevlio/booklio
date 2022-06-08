const express = require("express");

const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

usersRouter.get("/users", usersController.getAllUsers);
usersRouter.post("/users", usersController.registerUser);
usersRouter.post("/login", usersController.loginUser);

module.exports = usersRouter;
