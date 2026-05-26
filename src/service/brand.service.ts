import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICinemas } from "../interface/model";

const cinemasAPI = createApi({
  reducerPath: "cinemas",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["cinema"],
  endpoints: (builder) => ({
    fetchCinema: builder.query<any[], void>({
      query: () => "/Cinemas/",
      providesTags: ["cinema"],
    }),
    getCinemaById: builder.query<ICinemas, number | string>({
      query: (id) => `/Cinemas/${id}`,
      providesTags: ["cinema"],
    }),
    removeCinema: builder.mutation({
      query: (id) => ({
        url: "/Cinemas/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["cinema"],
    }),
    addCinema: builder.mutation({
      query: (cinema: ICinemas) => ({
        url: "/Cinemas/",
        method: "POST",
        body: cinema,
      }),
      invalidatesTags: ["cinema"],
    }),
    updateCinema: builder.mutation({
      query: (cinema: ICinemas) => ({
        url: `/Cinemas/${cinema.id}`,
        method: "PATCH",
        body: cinema,
      }),
      invalidatesTags: ["cinema"],
    }),
  }),
});
export const {
  useAddCinemaMutation,
  useFetchCinemaQuery,
  useGetCinemaByIdQuery,
  useRemoveCinemaMutation,
  useUpdateCinemaMutation,
} = cinemasAPI;
export default cinemasAPI;
