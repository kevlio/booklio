const express = require("express");

const usersController = require("../controllers/users.controller");
const usersRouter = express.Router();

const auth = require("../middlewares/auth");

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:username", auth, usersController.getUser);

module.exports = usersRouter;
