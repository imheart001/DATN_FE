import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategorys } from "../interface/model";

const categorysAPI = createApi({
  reducerPath: "cates",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    fetchCate: builder.query<ICategorys[], void>({
      query: () => "/Category/",
      providesTags: ["category"],
    }),
    getCateById: builder.query<ICategorys, number | string>({

      query: (id) => `/Category/${id}`,
      providesTags: ["category"],
    }),
    removeCate: builder.mutation({
      query: (id) => ({

        url: "/Category/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    addCate: builder.mutation({
      query: (category: ICategorys) => ({

        url: "/Category/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateCate: builder.mutation({
      query: (category: ICategorys) => ({

        url: `/Category/${category.id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});
export const {

  useAddCateMutation,
  useFetchCateQuery,
  useGetCateByIdQuery,
  useRemoveCateMutation,
  useUpdateCateMutation,
} = categorysAPI;
export default categorysAPI;
