import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticApi = createApi({
  reducerPath: "analyticApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Analytic"],
  endpoints: (builder) => ({
    getAnalytics: builder.mutation({
      query: () => ({
        url: "/Revenue/",
        method: "POST",
      }),
      invalidatesTags: ["Analytic"],
    }),
    getAnalyticsAdminCinema: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "/Revenue_cinema/",
        method: "POST",
        body: body
      }),
      invalidatesTags: ["Analytic"],
    }),
  }),
});

export const { useGetAnalyticsMutation, useGetAnalyticsAdminCinemaMutation } = analyticApi;
