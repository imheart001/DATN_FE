import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";
import { IUser } from "../interface/model";

const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<IUser[], void>({
      query: () => "/user/",
      providesTags: ["user"],
    }),
    getUserById: builder.query<IUser, number | string>({
      query: (id) => `/user/${id}`,
      providesTags: ["user"],
    }),
    addUser: builder.mutation({
      query: (users: IUser) => ({
        url: "/signup/",
        method: "POST",
        body: users,
      }),
      invalidatesTags: ["user"],
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: "/user/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (users: IUser) => ({
        url: `/user/${users.id}`,
        method: "PUT",
        body: users,
      }),
      invalidatesTags: ["user"],
    }),
    /* forgot passửod */
    forgorPassword: builder.mutation<{ message: string }, FormData>({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, FormData>({
      query: (body: FormData) => ({
        url: "/reset-password",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const {
  useUpdateUserMutation,
  useAddUserMutation,
  useLoginUserMutation,
  useFetchUsersQuery,
  useForgorPasswordMutation,
  useResetPasswordMutation,
  useRemoveUserMutation,
  useGetUserByIdQuery,
} = usersAPI;

export default usersAPI;

