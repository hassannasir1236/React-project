import React from "react";
import TodoForm from "./components/TodoForm";
import Todos from "./feature/todos/Todos";

export default function App() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-center mb-4">Redux Toolkit Todo App</h1>
      <TodoForm />
      <Todos />
    </div>
  );
}
