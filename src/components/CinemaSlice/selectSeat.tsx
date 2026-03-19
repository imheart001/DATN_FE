// bookingSlice.js

import { createSlice } from "@reduxjs/toolkit";

const TKinformationSlice = createSlice({
  name: "TKinformation",
  initialState: {
    selectedSeats: [],
    showtimeId: null,
    totalPrice: null,
    comboFoods: [],
  },
  reducers: {
    setSelectSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    setShowtimeId: (state, action) => {
      state.showtimeId = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setComboFoods: (state, action) => {
      state.comboFoods = action.payload;
    },
  },
});

export const { setSelectSeats, setShowtimeId, setTotalPrice, setComboFoods } =
  TKinformationSlice.actions;

export default TKinformationSlice.reducer;
