import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBookTicket } from "../interface/model";

const bookTicketsAPI = createApi({
  reducerPath: "bookTickets",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["bookTicket"],
  endpoints: (builder) => ({
    fetchBookTicket: builder.query<IBookTicket[], void>({
      query: () => "/Book_ticket/",
      providesTags: ["bookTicket"],
    }),
    getBookTicketById: builder.query<IBookTicket, number | string>({
      query: (id) => `/Book_ticket/${id}`,
      providesTags: ["bookTicket"],
    }),
    removeBookTicket: builder.mutation({
      query: (id) => ({
        url: "/Book_ticket/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["bookTicket"],
    }),
    addBookTicket: builder.mutation({
      query: (bookTicket: IBookTicket) => ({
        url: "/Book_ticket/",
        method: "POST",
        body: bookTicket,
      }),
      invalidatesTags: ["bookTicket"],
    }),
    updateShowTime: builder.mutation({
      query: (bookTicket: IBookTicket) => ({
        url: `/Book_ticket/${bookTicket.id}`,
        method: "PATCH",
        body: bookTicket,
      }),
      invalidatesTags: ["bookTicket"],
    }),
  }),
});
export const {
    useFetchBookTicketQuery,
    useGetBookTicketByIdQuery,
    useAddBookTicketMutation,
    useUpdateShowTimeMutation,
    useRemoveBookTicketMutation
} = bookTicketsAPI;
export default bookTicketsAPI;
