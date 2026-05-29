import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  token: string | null;
  user_id: string | null;
  role: number | null;
  id_cinema: number | null;
}

const initialToken = localStorage.getItem("authToken");

const initialState: initialState = {
  token: initialToken || null,
  user_id: null,
  role: null,
  id_cinema: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    setUserId: (state, action) => {
      state.user_id = action.payload;
      localStorage.setItem("user_id", action.payload);
    },
    setRoleAuth: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("Role", action.payload);
    },
    setIdCinama: (state, action) => {
      state.id_cinema = action.payload;
    },
  },
});

export const { setRoleAuth, updateToken, setUserId, setIdCinama } =
  authSlice.actions;
export default authSlice.reducer;
