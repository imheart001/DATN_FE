import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVoucher } from "../interface/model";

const vouchersAPI = createApi({
  reducerPath: "vouchers",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
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
  }),
});
export const {
  useAddVoucherMutation,
  useFetchVoucherQuery,
  useGetVoucherByIdQuery,
  useRemoveVoucherMutation,
  useUpdateVoucherMutation,
} = vouchersAPI;
export default vouchersAPI;
