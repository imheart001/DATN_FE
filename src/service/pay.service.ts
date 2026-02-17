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

    addPays: builder.mutation({
      query: (pay: {amount: any}) => ({
        url: "/Payment/",
        method: "POST",
        body: pay,
      }),
      invalidatesTags: ["pay"],
    }),
  }),
});
export const { useAddPaysMutation, useFetchPaysQuery } = PayAPI;
export default PayAPI;
