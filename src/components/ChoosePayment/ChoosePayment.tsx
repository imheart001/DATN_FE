import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  coin: number | null;
}

const initialState: initialState = {
  coin: 0,
};

const ChoosePaymentSlice = createSlice({
  name: "Paymentmethod",
  initialState,
  reducers: {
    setMoney: (state, action) => {
      state.coin = action.payload;
    },
  },
});

export const { setMoney } = ChoosePaymentSlice.actions;
export default ChoosePaymentSlice.reducer;
