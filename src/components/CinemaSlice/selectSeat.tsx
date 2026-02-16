// bookingSlice.js

import { createSlice } from "@reduxjs/toolkit";

const TKinformationSlice = createSlice({
  name: "TKinformation",
  initialState: {
    selectedSeats: [],
    showtimeId: null,
    totalPrice: null,
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
  },
});

export const { setSelectSeats, setShowtimeId ,setTotalPrice} = TKinformationSlice.actions;

export default TKinformationSlice.reducer;
