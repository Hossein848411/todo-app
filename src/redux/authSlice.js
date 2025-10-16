import { createSlice } from "@reduxjs/toolkit";

// توکن ذخیره‌شده در localStorage (در صورت وجود)
const savedToken = localStorage.getItem("token");

const initialState = {
  token: savedToken || null,
  isAuthenticated: !!savedToken, // اگر توکن هست یعنی لاگین شده
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload); // ✅ ذخیره در localStorage
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // ✅ حذف هنگام خروج
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
