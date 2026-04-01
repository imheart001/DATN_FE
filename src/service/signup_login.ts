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
      query: () => "/user/",
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
    updateUser: builder.mutation({
      query: (user: IUser) => ({
        url: `/user/${user.id}`,
        method: "PATCH",
        body: user,
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
  }),
});
export const { useAddUserMutation, useUpdateUserMutation, useRemoveUserMutation,useLoginUserMutation, useFetchUsersQuery } = usersAPI;
export default usersAPI;
