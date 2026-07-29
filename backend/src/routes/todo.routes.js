const express = require("express")
const router = express.Router();
const {getTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller")

router.get("/", getTodos)
router.delete("/:id", deleteTodo)
router.post("/", createTodo)
router.patch("/:id", updateTodo)


module.exports = router;