import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const seatkepingAPI = createApi({
  reducerPath: "seatKeping",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["kepingseat"],
  endpoints: (builder) => ({
    getAllSeatKepings: builder.query({
      query: (id_time_detail) =>
        `/getReservedSeatsByTimeDetail/${id_time_detail}`,
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
