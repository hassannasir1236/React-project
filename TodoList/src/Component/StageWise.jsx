import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";
import StagesBtn from "./StagesBtn";

export default function StagesWise({
  CardBorderColor = "",
  CardTitleColor = "",
  CardTitleName = "",
  CardItemBgColor = "",
  CompleteBtn = false,
  PendingBtn = false,
  DeleteBtn = false,
  UpdateBtn = false,
  ReverseBtn = false,
  PermanentDeleteBtn = false,
  status = ""
}) {
  const { GetTodobyStatus, UpdateTodo } = useTodo();
  const todosByStatus = GetTodobyStatus(status);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleInputChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      UpdateTodo(id, { id, text: editingText, status: GetTodobyStatus });
      setEditingId(null);
    }
  };

  return (
    <div className={`${CardBorderColor} w-full max-w-xl mx-auto p-6 bg-transparent border-5 rounded-xl shadow-md dark:bg-gray-800 dark:border-green-500`}>
      <h5 className={`${CardTitleColor} mb-4 pb-2 pt-2 text-center text-4xl font-bold rounded-md shadow-2xl text-white dark:text-white dark:bg-green-600`}>
        {CardTitleName}
      </h5>

      <ul className="my-6 space-y-3">
        {todosByStatus.length === 0 ? (
          <li className="text-center text-white">No tasks found.</li>
        ) : (
          todosByStatus.map((todo) => (
            <li
              key={todo.id}
              className={`${CardItemBgColor} shadow-2xl flex justify-between items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`}
            >
              <span className="ml-3 text-black-900 font-bold text-md w-full">
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    className="w-full p-1 rounded bg-white text-black"
                    autoFocus
                  />
                ) : (
                  todo.text
                )}
              </span>

              <StagesBtn
                CompleteBtn={CompleteBtn}
                PendingBtn={PendingBtn}
                DeleteBtn={DeleteBtn}
                UpdateBtn={UpdateBtn}
                ReverseBtn={ReverseBtn}
                PermanentDeleteBtn={PermanentDeleteBtn}
                id={todo.id}
                onUpdate={() => handleEditClick(todo)} // 🔥 Pass the click handler
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
