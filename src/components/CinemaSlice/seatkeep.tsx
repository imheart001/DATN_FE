// selectedCinemaSlice.js
import { createSlice } from "@reduxjs/toolkit";

const SeatKeptedSlice = createSlice({
  name: "SeatKeepig",
  // Khởi tạo trạng thái ban đầu (ban đầu không có chi nhánh rạp được chọn)
  initialState: [],
  reducers: {
    // Action để lưu chi nhánh rạp được chọn
    setKepted: (state, action) => {
      return action.payload;
    },
  },
});

export const { setKepted } = SeatKeptedSlice.actions;

export default SeatKeptedSlice.reducer;
