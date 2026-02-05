import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICateDetail } from "../interface/model";

const cateDetailAPI = createApi({
  reducerPath: "catedetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["catedetail"],
  endpoints: (builder) => ({
    fetchCateDetail: builder.query<ICateDetail[], void>({
      query: () => "/category_detail/",
      providesTags: ["catedetail"],
    }),
    getCateDetailById: builder.query<ICateDetail, number | string>({

      query: (id) => `/category_detail/${id}`,
      providesTags: ["catedetail"],
    }),
    removeCateDetail: builder.mutation({
      query: (id) => ({

        // url: "/category_detail/" + id,
        url: `/category_detail/${id}`,

        method: "DELETE",
      }),
      invalidatesTags: ["catedetail"],
    }),
    addCateDetail: builder.mutation({
      query: (catedetail: ICateDetail) => ({

        url: "/category_detail/",
        method: "POST",
        body: catedetail,
      }),
      invalidatesTags: ["catedetail"],
    }),
    updateCateDetail: builder.mutation({
      query: (catedetail: ICateDetail) => ({

        url: `/category_detail/${catedetail.id}`,
        method: "PATCH",
        body: catedetail,
      }),
      invalidatesTags: ["catedetail"],
    }),
  }),
});
export const {

 useFetchCateDetailQuery,
  useAddCateDetailMutation, 
  useGetCateDetailByIdQuery, 
  useRemoveCateDetailMutation, 
  useUpdateCateDetailMutation
} = cateDetailAPI;
export default cateDetailAPI;
