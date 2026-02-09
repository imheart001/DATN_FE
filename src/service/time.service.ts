import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITime } from "../interface/model";
const timesAPI = createApi({
    reducerPath: "times",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://127.0.0.1:8000/api",
    }),
    tagTypes: ["time"],
    endpoints: (builder) => ({
      fetchTime: builder.query<ITime[], void>({
        query: () => "/time/",
        providesTags: ["time"],
      }),
      getTimeById: builder.query<ITime, number | string>({
        query: (id) => `/time/${id}`,
        providesTags: ["time"],
      }),
      removeTime: builder.mutation({
        query: (id) => ({
          url: "/time/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["time"],
      }),
      addTime: builder.mutation({
        query: (time: ITime) => ({
          url: "/time/",
          method: "POST",
          body: time,
        }),
        invalidatesTags: ["time"],
      }),
      updateTime: builder.mutation({
        query: (time: ITime) => ({
          url: `/time/${time.id}`,
          method: "PATCH",
          body: time,
        }),
        invalidatesTags: ["time"],
      }),
    }),
  });
  export const {
    useFetchTimeQuery,
    useGetTimeByIdQuery,
    useRemoveTimeMutation,
    useAddTimeMutation,
    useUpdateTimeMutation
  } = timesAPI;
  export default timesAPI;
import {  ITime } from "../interface/model";

const TimeAPI = createApi({
  reducerPath: "time",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["time"],
  endpoints: (builder) => ({
    getTime: builder.query<ITime[], void>({
      query: () => "/time/",
      providesTags: ["time"],
    }),
    getTimeById: builder.query<ITime, number | string>({
      query: (id) => `/time/${id}`,
      providesTags: ["time"],
    }),
    removeTime: builder.mutation({
      query: (id) => ({
        url: "/time/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["time"],
    }),
    addTime: builder.mutation({
      query: (time: ITime) => ({
        url: "/time/",
        method: "POST",
        body: time,
      }),
      invalidatesTags: ["time"],
    }),
    updateTime: builder.mutation({
      query: (time: ITime) => ({
        url: `/time/${time.id}`,
        method: "PATCH",
        body: time,
      }),
      invalidatesTags: ["time"],
    }),
  }),
});
export const {
  useAddTimeMutation,
  useGetTimeByIdQuery,
  useGetTimeQuery,
  useRemoveTimeMutation,
  useUpdateTimeMutation,
} = TimeAPI;
export default TimeAPI;
