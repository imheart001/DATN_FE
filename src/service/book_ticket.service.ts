import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBookTicket, IBookTicketUser, IUser } from "../interface/model";

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
    getBookTicketByAdmin: builder.query<any, void>({
      query: () => `/purchase_history_ad/`,
      providesTags: ["bookTicket"],
    }),
    getBookTicketByUser: builder.query<IBookTicketUser, number | string>({
      query: (id) => `/purchase_history_user/${id}`,
      providesTags: ["bookTicket"],
    }),
    getBookTicketByAdminCinema: builder.query<IBookTicketUser, number | string>(
      {
        query: (id) => `/purchase_history_ad_cinema/${id}`,
        providesTags: ["bookTicket"],
      }
    ),
    getQRcodeById: builder.query<IBookTicket, number | string>({
      query: (id) => `/QR_book/${id}`,
      providesTags: ["bookTicket"],
    }),

    getUserById: builder.query<IUser, number | string>({
      query: (id) => `/user/${id}`,
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
      query: (bookTicket: any) => ({
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
  useGetUserByIdQuery,
  useRemoveBookTicketMutation,
  useGetBookTicketByAdminQuery,
  useGetBookTicketByUserQuery,
  useGetQRcodeByIdQuery,
  useGetBookTicketByAdminCinemaQuery,
} = bookTicketsAPI;
export default bookTicketsAPI;
