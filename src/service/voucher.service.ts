import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVoucher } from "../interface/model";

const vouchersAPI = createApi({
  reducerPath: "vouchers",
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
  tagTypes: ["voucher"],
  endpoints: (builder) => ({
    fetchVoucher: builder.query<IVoucher[], void>({
      query: () => "/voucher/",
      providesTags: ["voucher"],
    }),
    getVoucherById: builder.query<IVoucher, number | string>({
      query: (id) => `/voucher/${id}`,
      providesTags: ["voucher"],
    }),
    removeVoucher: builder.mutation({
      query: (id) => ({
        url: "/voucher/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["voucher"],
    }),
    addVoucher: builder.mutation({
      query: (voucher: IVoucher) => ({
        url: "/voucher/",
        method: "POST",
        body: voucher,
      }),
      invalidatesTags: ["voucher"],
    }),
    updateVoucher: builder.mutation({
      query: (voucher: IVoucher) => ({
        url: `/voucher/${voucher.id}`,
        method: "PATCH",
        body: voucher,
      }),
      invalidatesTags: ["voucher"],
    }),
    Used_VC_ByUserId: builder.mutation({
      query: (voucher: string) => ({
        url: "/usevoucher/",
        method: "POST",
        body: voucher,
      }),
      invalidatesTags: ["voucher"],
    }),
  }),
});
export const {
  useAddVoucherMutation,
  useFetchVoucherQuery,
  useGetVoucherByIdQuery,
  useRemoveVoucherMutation,
  useUpdateVoucherMutation,
  useUsed_VC_ByUserIdMutation,
} = vouchersAPI;
export default vouchersAPI;
