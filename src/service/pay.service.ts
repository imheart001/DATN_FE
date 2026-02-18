import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ipay } from "../interface/model";

const PayAPI = createApi({
  reducerPath: "pays",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["pay"],
  endpoints: (builder) => ({
    fetchPays: builder.query<Ipay[], void>({
      query: () => "/Payment/",
      providesTags: ["pay"],
    }),

    getPays: builder.mutation({
      query: (amount) => ({
        url: `/Payment?&amount=${amount}`,
        method: "GET",
      }),
      invalidatesTags: ["pay"],
    }),

    fetchPayByAmount: builder.query<Ipay, any>({
      query: (pay) => `/Payment?amount=${pay.amount}&id=${pay.time_detail_id}`,
      providesTags: ["pay"],
    }),

  }),
});
export const { useGetPaysMutation, useFetchPaysQuery, useFetchPayByAmountQuery } = PayAPI;
export default PayAPI;
