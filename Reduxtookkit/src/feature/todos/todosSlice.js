import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
    try {
        const serializedTodos = localStorage.getItem("Reduxtodos");
        if (serializedTodos === null) {
            return [];
        }
        return JSON.parse(serializedTodos);
    } catch (err) {
        console.error("Could not load todos from localStorage", err);
        return [];
    }
};

const saveTodos = (todos) => {
    try {
        const serializedTodos = JSON.stringify(todos);
        localStorage.setItem("Reduxtodos", serializedTodos);
    } catch (err) {
        console.error("Could not save todos to localStorage", err);
    }       
};

const todosSlice = createSlice({
    name: "todos",
    initialState: loadTodos(),
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: Date.now(), text: action.payload, completed: false });
            saveTodos(state);
        },
        toggleTodo: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveTodos(state);
            }
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload);    
            if (index !== -1) {
                state.splice(index, 1);
                saveTodos(state);
            }
        },
        clearCompleted: (state) => {
            const newState = state.filter((todo) => !todo.completed);
            saveTodos(newState);
            return newState;
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
                saveTodos(state);
            }
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;