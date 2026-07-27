const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

const createTodo = async (req, res) =>{
    try{
        const todo = await Todo.create(req.body);
        res.status(201).json(todo)
    } catch(err){
        res.status(500).json({
            message: error.message,
        })
    }
}


const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
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

        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if(!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: deletedTodo
    })
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}