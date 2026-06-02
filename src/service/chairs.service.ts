import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./api.config";
import { IChairs } from "../interface/model";

const bookingSeatAPI = createApi({
  reducerPath: "bkseats",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["chairs"],
  endpoints: (builder) => ({
    fetchChairs: builder.query<IChairs[], void>({
      query: () => "/Chairs/",
      providesTags: ["chairs"],
    }),

    getChairbyId: builder.query({
      query: (id) => `/Chairs/${id}`,
      providesTags: ["chairs"],
    }),
    getChairEmpTy: builder.query<any, void>({
      query: () => `/chair_count/`,
      providesTags: ["chairs"],
    }),
    addChairs: builder.mutation({
      query: (chair: IChairs) => ({
        url: "/Chairs/",
        method: "POST",
        body: chair,
      }),
      invalidatesTags: ["chairs"],
    }),
  }),
});
export const {
  useAddChairsMutation,
  useFetchChairsQuery,
  useGetChairbyIdQuery,

  useGetChairEmpTyQuery,
} = bookingSeatAPI;
export default bookingSeatAPI;

