import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";

export const analyticApi = createApi({
  reducerPath: "analyticApi",
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
  tagTypes: ["Analytic"],
  endpoints: (builder) => ({
    // getDataAnalytics: builder.query<any[], void>({
    //   query: () => "/Revenue/",
    //   providesTags: ["Analytic"],
    // }),
    getAnalytics: builder.mutation({
      query: (data: any) => ({
        url: "/Revenue/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analytic"],
    }),
    getAnalyticsAdminCinema: builder.mutation({
      query: (data: any) => ({
        url: "/Revenue_cinema/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analytic"],
    }),
    getAnalyticsStaffByCinema: builder.mutation({
      query: (data: any) => ({
        url: "/Revenue_cinema_staff/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analytic"],
    }),
  }),
});

export const {
  useGetAnalyticsMutation,
  useGetAnalyticsAdminCinemaMutation,
  useGetAnalyticsStaffByCinemaMutation,
} = analyticApi;

