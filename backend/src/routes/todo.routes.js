const express = require("express")
const router = express.Router();
const { getTodos } = require("../controllers/todo.controller")


router.get("/", getTodos)

module.exports = router;