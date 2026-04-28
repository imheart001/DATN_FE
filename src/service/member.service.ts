import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMember } from "../interface/member.interface";

const memberAPI = createApi({
  reducerPath: "memberAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["member"],
  endpoints: (builder) => ({
    fetchMembers: builder.query<{ data: IMember[] }, void>({
      query: () => "/member/",
      providesTags: ["member"],
    }),
    getPointByIdUser: builder.query<IMember, number | string>({
      query: (id) => `/member/${id}`,
      providesTags: ["member"],
    }),
    discountPoint: builder.mutation({
      query: (point: any) => ({
        url: "/member/",
        method: "POST",
        body: point,
      }),
      invalidatesTags: ["member"],
    }),
  }),
});

export const {
  useFetchMembersQuery,
  useGetPointByIdUserQuery,
  useDiscountPointMutation,
} = memberAPI;

export default memberAPI;
