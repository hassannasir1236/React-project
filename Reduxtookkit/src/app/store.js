import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../feature/todos/todosSlice";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});