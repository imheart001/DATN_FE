import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("authToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null,
  },
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
  },
});

export const { updateToken } = authSlice.actions;
export default authSlice.reducer;
