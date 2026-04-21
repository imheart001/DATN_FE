import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovieRoom } from "../interface/model";

const movieRoomAPI = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["movieroom"],
  endpoints: (builder) => ({
    fetchMovieRoom: builder.query<IMovieRoom[], void>({
      query: () => "/movieRoom/",
      providesTags: ["movieroom"],
    }),
    getMovieRoomById: builder.query<IMovieRoom, number | string>({
      query: (id) => `/movieRoom/${id}`,
      providesTags: ["movieroom"],
    }),
    removeMovieRoom: builder.mutation({
      query: (id) => ({
        url: "/movieRoom/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["movieroom"],
    }),
    addMovieRoom: builder.mutation({
      query: (movieRoom: IMovieRoom) => ({
        url: "/movieRoom/",
        method: "POST",
        body: movieRoom,
      }),
      invalidatesTags: ["movieroom"],
    }),
    updateMovieRoom: builder.mutation({
      query: (movieRoom: IMovieRoom) => ({
        url: `/movieRoom/${movieRoom.id}`,
        method: "PUT",
        body: movieRoom,
      }),
      invalidatesTags: ["movieroom"],
    }),
  }),
});
export const {
  useFetchMovieRoomQuery,
  useGetMovieRoomByIdQuery,
  useAddMovieRoomMutation,
  useRemoveMovieRoomMutation,
  useUpdateMovieRoomMutation,
} = movieRoomAPI;
export default movieRoomAPI;
