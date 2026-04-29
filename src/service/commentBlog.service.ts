import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComments } from "../interface/model";

const commentsAPI = createApi({
    reducerPath: "comments",
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
       
        addCommentBlog: builder.mutation({
            query: (comment: IComments) => ({
                url: `/Blogs/${comment.id}/comments`,
                method: "POST",
                body: comment.content,
                
            }),
            invalidatesTags: ["comment"],
          }),
          

    }),
});
export const {

    useAddCommentBlogMutation
} = commentsAPI;
export default commentsAPI;
