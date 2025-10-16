import { createSlice, nanoid } from "@reduxjs/toolkit";

// تسک‌ها را از localStorage بخوانیم
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

const initialState = {
  todos: savedTodos,
  filter: "all",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
        done: false,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos)); // ✅ ذخیره در localStorage
    },
    deleteItem: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editItem: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) todo.text = text;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleDone: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    filterByStatus: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addItem, deleteItem, editItem, toggleDone, filterByStatus } =
  itemsSlice.actions;
export default itemsSlice.reducer;
