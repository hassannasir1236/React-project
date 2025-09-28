import React, { useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";

export const TodoProvider = ({ children }) => {
  
  const getTodosFromStorage = () => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  };
  const [todos, setTodos] = useState(getTodosFromStorage);

  // ✅ CRUD functions
  // ✅ Add

  const AddTodo = (todo) => {
    const todos = getTodosFromStorage();
    const updated = [...todos, todo];
    setTodos(JSON.stringify(updated));
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  // ✅ Update
  const UpdateTodo = (id, updatedTodo) => {
    const todos = getTodosFromStorage();
    const updated = todos.map(todo => (todo.id === id ? updatedTodo : todo));
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodos(JSON.stringify(updated))
  };

  // ✅ Soft Delete
  const DeleteTodo = (id) => {
    const todos = getTodosFromStorage();
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, status: "deleted" } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodos(JSON.stringify(updated))
  };

  // ✅ Update Status
  const UpdateTodoStatus = (id, statusValue) => {
    const todos = getTodosFromStorage();
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, status: statusValue } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodos(JSON.stringify(updated))
  };

  // ✅ Permanent Delete
  const PermenantDeleteTodo = (id) => {
    const todos = getTodosFromStorage();
    const updated = todos.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updated));
    setTodos(JSON.stringify(updated))
  };

  // ✅ Get Todos by Status
  const GetTodobyStatus = (statusValue) => {
    const todos = getTodosFromStorage();
    return todos.filter(todo => todo.status === statusValue);
  };

  // get total todo count
  const getTotalCount = () => {
    const todos = getTodosFromStorage();
    return todos.length;
  };
  // get count by status
  const getCountByStatus = (statusValue) => {
    const todos = getTodosFromStorage();
    return todos.filter(todo => todo.status === statusValue).length;
  };

    // Load from localStorage when component mounts
  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, [todos, AddTodo, UpdateTodo, DeleteTodo, UpdateTodoStatus, PermenantDeleteTodo, getTotalCount, getCountByStatus]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        AddTodo,
        UpdateTodo,
        DeleteTodo,
        UpdateTodoStatus,
        PermenantDeleteTodo,
        GetTodobyStatus,
        getTotalCount,
        getCountByStatus
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
