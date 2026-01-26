// filmCinemaSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const filmCinemaSlice = createSlice({
  name: "filmCinema",
  initialState: null, // Khởi tạo bằng null hoặc giá trị mặc định khác
  reducers: {
    setFilmCinemaData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilmCinemaData } = filmCinemaSlice.actions;

export default filmCinemaSlice.reducer;
