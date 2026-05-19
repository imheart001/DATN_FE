import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFilms } from "../interface/model";

const filmsAPI = createApi({
  reducerPath: "films",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["film"],
  endpoints: (builder) => ({
    fetchProduct: builder.query<IFilms[], void>({
      query: () => "/film/",
      providesTags: ["film"],
    }),
    getProductById: builder.query<IFilms, number | string>({
      query: (id) => `/film/${id}`,
      providesTags: ["film"],
    }),
    getFilmCinemeById: builder.query<IFilms, number | string>({
      query: (id) => `/film_cinema/${id}`,
    }),
    AVG_Films: builder.query<any[], void>({
      query: () => "/rating_avgs/",
      providesTags: ["film"],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: "/film/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["film"],
    }),
    addProduct: builder.mutation({
      query: (film: any) => ({
        url: "/film/",
        method: "POST",
        body: film,
      }),
      invalidatesTags: ["film"],
    }),
    updateProduct: builder.mutation({
      query: (film: IFilms) => ({
        url: `/film/${film.id}`,
        method: "PATCH",
        body: film,
      }),
      invalidatesTags: ["film"],
    }),
  }),
});
export const {
  useFetchProductQuery,
  useRemoveProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useGetFilmCinemeByIdQuery,
  useAVG_FilmsQuery
} = filmsAPI;
export default filmsAPI;
