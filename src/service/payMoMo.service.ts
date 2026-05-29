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
    PaymentMomo: builder.mutation({
      query: (amount: any) => ({
        url: "/momo_payment/",
        method: "POST",
        body: amount,
      }),
      invalidatesTags: ["paymomo"],
    }),
    RechargeByMomo: builder.mutation({
      query: (data: any) => ({
        url: "/post_money/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymomo"],
    }),
  }),
});

export const { usePaymentMomoMutation, useRechargeByMomoMutation } = payMoMoAPI;
export default payMoMoAPI;
