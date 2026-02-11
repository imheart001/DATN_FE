import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  IFood } from "../interface/model";

const foodAPI = createApi({
  reducerPath: "foods",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["food"],
  endpoints: (builder) => ({
    fetchFood: builder.query<IFood[], void>({
      query: () => "/Food/",
      providesTags: ["food"],
    }),
    getFoodById: builder.query<IFood, number | string>({

      query: (id) => `/Food/${id}`,
      providesTags: ["food"],
    }),
    removeFood: builder.mutation({
      query: (id) => ({

        url: "/Food/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["food"],
    }),
    addFood: builder.mutation({
      query: (food: IFood) => ({

        url: "/Food/",
        method: "POST",
        body: food,
      }),
      invalidatesTags: ["food"],
    }),
    updateFood: builder.mutation({
      query: (food: IFood) => ({

        url: `/Food/${food.id}`,
        method: "PATCH",
        body: food,
      }),
      invalidatesTags: ["food"],
    }),
  }),
});
export const {
useFetchFoodQuery, useAddFoodMutation, useGetFoodByIdQuery, useRemoveFoodMutation, useUpdateFoodMutation
  
} = foodAPI;
export default foodAPI;
