// bookingSlice.js

import { createSlice } from "@reduxjs/toolkit";

const TKinformationSlice = createSlice({
  name: "TKinformation",
  initialState: {
    selectedSeats: [],
    showtimeId: null,
    totalPrice: 0,
    totalPriceSeat: 0,
    comboFoods: [],
    chooseVoucher: "",
    point: 0,
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
    setTotalPriceSeat: (state, action) => {
      state.totalPriceSeat = action.payload;
    },
    setComboFoods: (state, action) => {
      state.comboFoods = action.payload;
    },
    setChooseVoucher: (state, action) => {
      state.chooseVoucher = action.payload;
    },
    setChangePoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const {
  setSelectSeats,
  setShowtimeId,
  setTotalPrice,
  setComboFoods,
  setChooseVoucher,
  setChangePoint,
  setTotalPriceSeat,
} = TKinformationSlice.actions;

export default TKinformationSlice.reducer;
