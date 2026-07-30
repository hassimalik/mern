"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loader from "@/components/common/loader/loader"
import TodoForm from "@/components/todo/TodoForm/TodoForm";
import TodoList from "@/components/todo/TodoList/TodoList";

import type { Todo } from "@/types/todo";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todo.service";


export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    loadTodos();
  }, []);


  async function loadTodos() {

    try {

      setIsLoading(true);


      const data = await getTodos();


      setTodos(data);


    } catch (error) {

      console.error(error);


    } finally {

      setIsLoading(false);

    }

  }


  async function handleCreateTodo(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    const trimmedTitle = title.trim();


    if (!trimmedTitle) return;


    const alreadyExists = todos.some(
      (todo) =>
        todo.title.toLowerCase() ===
        trimmedTitle.toLowerCase()
    );


    if (alreadyExists) {
      toast.warning("Todo already exists", {
        description: "Choose a different title.",
      });

      return;
    }



    try {

      setIsSubmitting(true);


      const newTodo = await createTodo(trimmedTitle);
      toast.success("Todo created successfully.")


      // instant UI update
      setTodos((prev) => [
        newTodo,
        ...prev,
      ]);


      setTitle("");


    } catch (error) {

      console.error("Create todo failed:", error);

    } finally {

      setIsSubmitting(false);

    }
  }




  async function handleDeleteTodo(id: string) {


    if (deletingIds.includes(id)) return;


    const previousTodos = todos;


    // remove instantly from UI
    setTodos((prev) =>
      prev.filter(
        (todo) => todo._id !== id
      )
    );


    setDeletingIds((prev) => [
      ...prev,
      id,
    ]);



    try {

      await deleteTodo(id);
      toast.success("Todo deleted successfully");


    } catch (error) {


      // rollback if API fails
      setTodos(previousTodos);


      console.error(
        "Delete todo failed:",
        error
      );


    } finally {


      setDeletingIds((prev) =>
        prev.filter(
          (todoId) => todoId !== id
        )
      );

    }
  }




  async function handleToggleTodo(id: string) {


    const todo = todos.find(
      (todo) => todo._id === id
    );


    if (!todo) return;



    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };



    // instant checkbox update
    setTodos((prev) =>
      prev.map((item) =>
        item._id === id
          ? updatedTodo
          : item
      )
    );



    try {


      await updateTodo(id, {
        completed: updatedTodo.completed,
      });
      toast.success(
        updatedTodo.completed
          ? "Todo completed"
          : "Todo marked incomplete"
      );



    } catch (error) {

      toast.error(
        "Something went wrong"
      );
      // rollback
      setTodos((prev) =>
        prev.map((item) =>
          item._id === id
            ? todo
            : item
        )
      );


      console.error(
        "Toggle todo failed:",
        error
      );

    }
  }





  async function handleUpdateTodo(
    id: string,
    title: string
  ) {


    const previousTodos = todos;



    // instant text update
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? {
            ...todo,
            title,
          }
          : todo
      )
    );



    try {


      await updateTodo(id, {
        title,
      });
      toast.success("Todo updated");



    } catch (error) {


      // rollback
      setTodos(previousTodos);


      console.error(
        "Update todo failed:",
        error
      );

    }
  }





  return (
    <>
      {isLoading && <Loader />}
      <main className="flex min-h-screen flex-col bg-gray-100">

        <div className="mx-auto w-full max-w-2xl flex-1 p-8">


          <h1 className="mb-8 text-center font-roboto text-4xl font-bold">
            My Tasks
          </h1>



          <TodoForm
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            onSubmit={handleCreateTodo}
            isSubmitting={isSubmitting}
          />



          <div className="mt-6">

            <TodoList
              todos={todos}
              onDelete={handleDeleteTodo}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              deletingIds={deletingIds}
            />

          </div>


        </div>




        <footer className="border-t border-gray-200 bg-white py-5">

          <p className="text-center text-sm text-gray-500">

            <span className="text-red-700 font-bold">
              Tip:
            </span>{" "}
            Double-click to edit it.

          </p>

        </footer>


      </main>
    </>
  );
}