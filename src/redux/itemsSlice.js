import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
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
    },
    deleteItem: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editItem: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) todo.text = text;
    },
    toggleDone: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
    filterByStatus: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addItem, deleteItem, editItem, toggleDone, filterByStatus } =
  itemsSlice.actions;
export default itemsSlice.reducer;
