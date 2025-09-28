import React, { useContext, createContext } from "react";

// Create the context
export const TodoContext = createContext(null);

// Hook to use the context
export const useTodo = () => useContext(TodoContext);
