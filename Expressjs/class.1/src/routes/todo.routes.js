const express = require("express");
const { createTodo } = require("../controlers/todo.controler");
const { checkAuth } = require("../middlewares/check-auth.middleware");
const route = express.Router();
route.post("/create-todo",checkAuth,createTodo)
module.exports={route}