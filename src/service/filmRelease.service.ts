import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";
import { IFilmRelease } from "../interface/model";

const filmReleaseAPI = createApi({
  reducerPath: "filmReleases",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["filmRelease"],
  endpoints: (builder) => ({
    fetchReleasesByFilm: builder.query<{ data: IFilmRelease[] }, string | number>({
      query: (filmId) => `/film/${filmId}/releases`,
      providesTags: ["filmRelease"],
    }),
    getReleaseById: builder.query<{ data: IFilmRelease }, { filmId: string | number; releaseId: string | number }>({
      query: ({ filmId, releaseId }) => `/film/${filmId}/releases/${releaseId}`,
      providesTags: ["filmRelease"],
    }),
    addRelease: builder.mutation<{ data: IFilmRelease }, { filmId: string | number; body: Partial<IFilmRelease> }>({
      query: ({ filmId, body }) => ({
        url: `/film/${filmId}/releases`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["filmRelease"],
    }),
    updateRelease: builder.mutation<{ data: IFilmRelease }, { filmId: string | number; releaseId: string | number; body: Partial<IFilmRelease> }>({
      query: ({ filmId, releaseId, body }) => ({
        url: `/film/${filmId}/releases/${releaseId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["filmRelease"],
    }),
    deleteRelease: builder.mutation<void, { filmId: string | number; releaseId: string | number }>({
      query: ({ filmId, releaseId }) => ({
        url: `/film/${filmId}/releases/${releaseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["filmRelease"],
    }),
    revenueByRelease: builder.mutation<any, { film_id: string | number; film_release_id?: string | number }>({
      query: (body) => ({
        url: `/Revenue_by_release`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useFetchReleasesByFilmQuery,
  useGetReleaseByIdQuery,
  useAddReleaseMutation,
  useUpdateReleaseMutation,
  useDeleteReleaseMutation,
  useRevenueByReleaseMutation,
} = filmReleaseAPI;
export default filmReleaseAPI;
