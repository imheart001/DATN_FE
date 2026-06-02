import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";
import { IBookingShowtimeRow, IShowTime } from "../interface/model";

interface BookingShowtimeParams {
  cinemaId: string;
  filmId?: string | null;
  dateFrom?: string;
  days?: number;
}

const showsAPI = createApi({
  reducerPath: "shows",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["show"],
  endpoints: (builder) => ({
    fetchShowTime: builder.query<IShowTime[], void>({
      query: () => "/time_detail/",
      providesTags: ["show"],
    }),
    getShowTimeById: builder.query<IShowTime, number | string>({
      query: (id) => `/time_detail/${id}`,
      providesTags: ["show"],
    }),
    getShowTimeByAdminCinema: builder.query<any, number | string>({
      query: (id) => `/get_time_detail_by_id_cinema/${id}`,
      providesTags: ["show"],
    }),
    getShowbyIdCinema: builder.query<any, number | string>({
      query: (id) => `/check_time_detail_by_film_id/${id}`,
      providesTags: ["show"],
    }),
    getAllDataShowTimeById: builder.query<any, number | string>({
      query: (id) => `/time_detail_get_by_id/${id}`,
      providesTags: ["show"],
    }),
    getBookingShowtimes: builder.query<
      { data: IBookingShowtimeRow[] },
      BookingShowtimeParams
    >({
      query: ({ cinemaId, filmId, dateFrom, days = 5 }) => {
        const params = new URLSearchParams();
        params.set("cinema_id", cinemaId);
        if (filmId) {
          params.set("film_id", filmId);
        }
        if (dateFrom) {
          params.set("date_from", dateFrom);
        }
        params.set("days", String(days));

        return `/showtimes/booking?${params.toString()}`;
      },
      providesTags: ["show"],
    }),
    removeShowTime: builder.mutation({
      query: (id) => ({
        url: "/time_detail/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["show"],
    }),
    addShowTime: builder.mutation({
      query: (show: any) => ({
        url: "/time_detail/",
        method: "POST",
        body: show,
      }),
      invalidatesTags: ["show"],
    }),
    updateShowTime: builder.mutation({
      query: (show: IShowTime) => ({
        url: `/time_detail/${show.id}`,
        method: "PATCH",
        body: show,
      }),
      invalidatesTags: ["show"],
    }),
  }),
});
export const {
  useAddShowTimeMutation,
  useFetchShowTimeQuery,
  useGetShowTimeByIdQuery,
  useGetShowbyIdCinemaQuery,
  useRemoveShowTimeMutation,
  useUpdateShowTimeMutation,
  useGetAllDataShowTimeByIdQuery,
  useGetShowTimeByAdminCinemaQuery,
  useGetBookingShowtimesQuery,
} = showsAPI;
export default showsAPI;

