import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const payAPI = createApi({
  reducerPath: "pays",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["pay"],
  endpoints: (builder) => ({
    getPaybyTranfer: builder.query({
      query: (money) => `/Payment?&amount=${money}`,
      providesTags: ["pay"],
    }),
  }),
});
export const { useGetPaybyTranferQuery } = payAPI;
export default payAPI;
