import React from "react";
import { useTodo } from "../Context/TodoContext";

export default function StagesBtn({
  CompleteBtn = false,
  PendingBtn = false,
  DeleteBtn = false,
  UpdateBtn = false,
  ReverseBtn = false,
  PermanentDeleteBtn = false,
  id = null,
  onUpdate = null 
}) {
  const { DeleteTodo, PermenantDeleteTodo, UpdateTodoStatus } = useTodo();

  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {CompleteBtn && (
        <button
          className="p-1 rounded-lg bg-green-500 text-white"
          onClick={() => UpdateTodoStatus(id, "completed")}
        >
          C
        </button>
      )}
      {PendingBtn && (
        <button
          className="p-1 rounded-lg bg-yellow-500 text-white"
          onClick={() => UpdateTodoStatus(id, "pending")}
        >
          P
        </button>
      )}
      {DeleteBtn && (
        <button
          className="p-1 rounded-lg bg-red-500 text-white"
          onClick={() => DeleteTodo(id)}
        >
          D
        </button>
      )}
      {UpdateBtn && (
        <button className="p-1 rounded-lg bg-blue-500 text-white"
         onClick={onUpdate} >
          U
        </button>
      )}
      {ReverseBtn && (
        <button
          className="p-1 rounded-lg bg-purple-500 text-white"
          onClick={() => UpdateTodoStatus(id, "todo")}
        >
          R
        </button>
      )}
      {PermanentDeleteBtn && (
        <button
          className="p-1 rounded-lg bg-black text-white"
          onClick={() => PermenantDeleteTodo(id)}
        >
          PD
        </button>
      )}
    </div>
  );
}
