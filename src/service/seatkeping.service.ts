import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISeatKepting } from "../interface/model";

const seatkepingAPI = createApi({
  reducerPath: "seatKeping",
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
  tagTypes: ["kepingseat"],
  endpoints: (builder) => ({
    getAllSeatKepings: builder.query<ISeatKepting[], string>({
      query: () => `/getReservedSeatsByTimeDetail/`,
      providesTags: ["kepingseat"],
    }),

    keptSeat: builder.mutation({
      query: (seat: any) => ({
        url: "/cache_seat/",
        method: "POST",
        body: seat,
      }),
      invalidatesTags: ["kepingseat"],
    }),
  }),
});
export const { useGetAllSeatKepingsQuery, useKeptSeatMutation } = seatkepingAPI;
export default seatkepingAPI;
