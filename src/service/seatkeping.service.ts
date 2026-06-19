import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";
import { ISeatKepting } from "../interface/model";

const seatkepingAPI = createApi({
  reducerPath: "seatKeping",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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

    clearUserSeats: builder.mutation({
      query: (body: { id_time_detail: string; id_user: number }) => ({
        url: "/clear_user_seats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["kepingseat"],
    }),
  }),
});
export const { useGetAllSeatKepingsQuery, useKeptSeatMutation, useClearUserSeatsMutation } = seatkepingAPI;
export default seatkepingAPI;

