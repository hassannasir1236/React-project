import './App.css';
import React from 'react';
import { TodoProvider } from './Context/TodoProvider';
import Todo from './Todo';
export default function App() {

  return (
    <TodoProvider >
      <Todo />
    </TodoProvider>
  );
}
