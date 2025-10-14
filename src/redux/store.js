import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itemsReducer from "./itemsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
  },
});

export default store;
