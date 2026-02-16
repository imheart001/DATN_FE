import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("authToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null,
    user_id: null,
  },
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    setUserId: (state, action) => {
      state.user_id = action.payload;
      localStorage.setItem("user_id", action.payload);
    },
  },
});

export const { updateToken, setUserId } = authSlice.actions;
export default authSlice.reducer;
