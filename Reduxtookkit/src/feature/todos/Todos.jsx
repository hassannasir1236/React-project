import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, updateTodo } from "./todosSlice";

export default function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between border p-2 rounded">
          {editId === todo.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(updateTodo({ id: todo.id, text: editText }));
                  setEditId(null);
                }
              }}
              className="flex-1 border rounded px-2 py-1"
            />
          ) : (
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </span>
          )}
          <div className="flex space-x-2 ml-2">
            <button
              onClick={() => {
                setEditId(todo.id);
                setEditText(todo.text);
              }}
              className="text-blue-500"
            >
              ✏️
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-red-500">
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
