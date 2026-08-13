const Todo = require("../models/todo.model");
const sendResponse = require("../helpers/response.helper");

const {
    transform,
    transformMany,
    transformTodo,
} = require("../helpers/transform");


// GET ALL TODOS
const getTodos = async (req, res) => {
    try {
        console.time("Mongo Query");

        const todos = await Todo.find().lean();

        console.timeEnd("Mongo Query");

        return sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Todos fetched successfully.",
            data: transformMany(todos, transformTodo),
            meta: {
                count: todos.length,
            },
        });

    } catch (error) {

        return sendResponse({
            res,
            statusCode: 500,
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
            return sendResponse({
                res,
                statusCode: 400,
                success: false,
                message: "Title is required.",
            });
        }

        const existingTodo = await Todo.findOne({ title }).lean();

        if (existingTodo) {
            return sendResponse({
                res,
                statusCode: 409,
                success: false,
                message: "Todo already exists.",
            });
        }

        const todo = await Todo.create({
            title,
            completed: false,
        });

        return sendResponse({
            res,
            statusCode: 201,
            success: true,
            message: "Todo created successfully.",
            data: transform(todo, transformTodo),
        });

    } catch (error) {

        return sendResponse({
            res,
            statusCode: 500,
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
            return sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Todo not found.",
            });
        }

        return sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Todo updated successfully.",
            data: transform(updatedTodo, transformTodo),
        });

    } catch (error) {

        return sendResponse({
            res,
            statusCode: 500,
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
            return sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Todo not found.",
            });
        }

        return sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Todo deleted successfully.",
            data: transform(deletedTodo, transformTodo),
        });

    } catch (error) {

        return sendResponse({
            res,
            statusCode: 500,
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