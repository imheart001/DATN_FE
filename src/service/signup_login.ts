import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interface/model";

const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (users: IUser) => ({
        url: "/signup/",
        method: "POST",
        body: users,
      }),
      invalidatesTags: ["user"],
    }),
 
  }),
});
export const {
  useAddUserMutation

} = usersAPI;
export default usersAPI;
