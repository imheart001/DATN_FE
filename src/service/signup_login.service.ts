import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interface/model";

const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<IUser[], void>({
      query: () => "/users/",
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
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
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
  useAddUserMutation,
  useLoginUserMutation,
  useFetchUsersQuery,
  useForgorPasswordMutation,
  useResetPasswordMutation,
} = usersAPI;
export default usersAPI;
