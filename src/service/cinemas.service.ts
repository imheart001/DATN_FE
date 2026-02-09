import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICinemas } from "../interface/model";

const CinemasAPI = createApi({
  reducerPath: "Cinemas",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["Cinemas"],
  endpoints: (builder) => ({
    getCinemas: builder.query<[], void>({
      query: () => "/Cinemas/",
      providesTags: ["Cinemas"],
    }),
    getCinemasById: builder.query<ICinemas, number | string>({
      query: (id) => `/Cinemas/${id}`,
      providesTags: ["Cinemas"],
    }),
    removeCinemas: builder.mutation({
      query: (id) => ({
        url: "/Cinemas/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Cinemas"],
    }),
    addCinemas: builder.mutation({
      query: (Cinemas: ICinemas) => ({
        url: "/Cinemas/",
        method: "POST",
        body: Cinemas,
      }),
      invalidatesTags: ["Cinemas"],
    }),
    updateCinemas: builder.mutation({
      query: (Cinemas: ICinemas) => ({
        url: `/Cinemas/${Cinemas._id}`,
        method: "PATCH",
        body: Cinemas,
      }),
      invalidatesTags: ["Cinemas"],
    }),
  }),
});
export const {
  useGetCinemasQuery,
  useGetCinemasByIdQuery,
  useAddCinemasMutation,
  useRemoveCinemasMutation,
  useUpdateCinemasMutation,
  
} = CinemasAPI;
export default CinemasAPI;
