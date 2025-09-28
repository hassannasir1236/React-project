import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../feature/todos/todosSlice";

export default function TodoForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-64"
        placeholder="Enter todo"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
