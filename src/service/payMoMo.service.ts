import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const payMoMoAPI = createApi({
  reducerPath: "paymentmomo",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers, { getState }) => {
      // Add your authorization header here
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["paymomo"],
  endpoints: (builder) => ({
    PaymentMomo: builder.query({
      query: (money) => `/momo_payment?&amount=${money}`,
      providesTags: ["paymomo"],
    }),
  }),
});

export const { usePaymentMomoQuery } = payMoMoAPI;
export default payMoMoAPI;
