import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComments } from "../interface/model";

const commentsFilmAPI = createApi({
  reducerPath: "commentsfilm",
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
  tagTypes: ["comment"],
  endpoints: (builder) => ({
    getCommentByUserId: builder.query<any, number | string>({
      query: (id) => `/film-ratings/${id}`,
    }),
    addCommentFilm: builder.mutation({
      query: (comment: any) => ({
        url: `/rateStar/`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});
export const { useGetCommentByUserIdQuery, useAddCommentFilmMutation } =
  commentsFilmAPI;
export default commentsFilmAPI;
