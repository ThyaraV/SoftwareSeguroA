import { SUPPLIERS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => ({
        url: SUPPLIERS_URL,
      }),
      providesTags: ['Supplier'],
      keepUnusedDataFor: 5,
    }),
    getSupplierDetails: builder.query({
      query: (supplierId) => ({
        url: `${SUPPLIERS_URL}/${supplierId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSupplier: builder.mutation({
      query: (newSupplierData) => ({
        url: SUPPLIERS_URL,
        method: 'POST',
        body: newSupplierData,
      }),
      invalidatesTags: ['Supplier'],
    }),
    updateSupplier: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/${data.supplierId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Supplier'],
    }),
    deleteSupplier: builder.mutation({
      query: (supplierId) => ({
        url: `${SUPPLIERS_URL}/${supplierId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Supplier'],
    }),
    uploadSupplierImage:builder.mutation({
        query:(data)=>({
            url:`${UPLOAD_URL}`,
            method:'POST',
            body:data,
        })
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierDetailsQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useUploadSupplierImageMutation
} = supplierApiSlice;
