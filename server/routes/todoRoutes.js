// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const todoHandler = require("../handlers/todoHandler");

// Define routes and attach handler functions
router.get("/", todoHandler.getTodos);
router.post("/", todoHandler.createTodo);
router.put("/:id", todoHandler.updateTodo);
router.delete("/:id", todoHandler.deleteTodo);

module.exports = router;
