import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const payAPI = createApi({
  reducerPath: "pays",
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
  tagTypes: ["pay"],
  endpoints: (builder) => ({
    getPaybyTranfer: builder.mutation({
      query: (amount: any) => ({
        url: "/Payment/",
        method: "POST",
        body: amount,
      }),
      invalidatesTags: ["pay"],
      }),
  }),
});

export const { useGetPaybyTranferMutation } = payAPI;
export default payAPI;
