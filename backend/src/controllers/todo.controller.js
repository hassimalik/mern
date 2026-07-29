const Todo = require("../models/todo.model");

// GET ALL TODOS
const getTodos = async (req, res) => {
    try {

        console.time("Mongo Query");

        const todos = await Todo.find()
            .lean();

        console.timeEnd("Mongo Query");


        res.status(200).json({
            success: true,
            data: todos,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// CREATE TODO
const createTodo = async (req, res) => {
    try {

        const title = req.body.title?.trim();

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }


        const existingTodo = await Todo
            .findOne({ title })
            .lean();


        if (existingTodo) {
            return res.status(409).json({
                success: false,
                message: "Todo already exists",
            });
        }


        const todo = await Todo.create({
            title,
            completed: false,
        });


        res.status(201).json({
            success: true,
            data: todo,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// UPDATE TODO
const updateTodo = async (req, res) => {

    try {

        const updateData = {};


        if (req.body.title !== undefined) {
            updateData.title = req.body.title.trim();
        }


        if (req.body.completed !== undefined) {
            updateData.completed = req.body.completed;
        }



        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                $set: updateData,
            },
            {
                new: true,
                runValidators: true,
            }
        );


        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }


        res.status(200).json({
            success: true,
            data: updatedTodo,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// DELETE TODO
const deleteTodo = async (req, res) => {

    try {

        const deletedTodo = await Todo.findByIdAndDelete(
            req.params.id
        );


        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }


        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: deletedTodo,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};