import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";
import { IBlogs } from "../interface/model";

const blogsAPI = createApi({
    reducerPath: "blogs",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    tagTypes: ["blog"],
    endpoints: (builder) => ({
        fetchBlog: builder.query<IBlogs[], void>({
            query: () => "/Blogs/",
            providesTags: ["blog"],
        }),
        getBlogById: builder.query<IBlogs, number | string>({
            query: (id) => `/Blogs/${id}`,
            providesTags: ["blog"],
        }),
        removeBlog: builder.mutation({
            query: (id) => ({
                url: "/Blogs/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"],
        }),
        addBlog: builder.mutation({
            query: (blog: IBlogs) => ({
                url: "/Blogs/",
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),
        updateBlog: builder.mutation({
            query: (blog: IBlogs) => ({
                url: `/Blogs/${blog.id}`,
                method: "PATCH",
                body: blog,
            }),
            invalidatesTags: ["blog"],
        }),
    }),
});
export const {
    useAddBlogMutation,
    useFetchBlogQuery,
    useGetBlogByIdQuery,
    useRemoveBlogMutation,
    useUpdateBlogMutation
} = blogsAPI;
export default blogsAPI;

