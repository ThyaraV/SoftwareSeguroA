import { SUPPLIERTYPES_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const supplierTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSupplierTypes: builder.query({
            query: () => SUPPLIERTYPES_URL,
            providesTags: ['SupplierType'],
            keepUnusedDataFor: 5
        }),
        getSupplierTypeById: builder.query({
            query: (supplierTypeId) => `${SUPPLIERTYPES_URL}/${supplierTypeId}`,
            providesTags: (result, error, arg) => [{ type: 'SupplierType', id: arg }]
        }),
        createSupplierType: builder.mutation({
            query: (data) => ({
                url: SUPPLIERTYPES_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['SupplierType'],
        }),
        updateSupplierType: builder.mutation({
            query: ({ supplierTypeId, ...data }) => ({
                url: `${SUPPLIERTYPES_URL}/${supplierTypeId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SupplierType', id: arg.supplierTypeId }]
        }),
        deleteSupplierType: builder.mutation({
            query: (supplierTypeId) => ({
                url: `${SUPPLIERTYPES_URL}/${supplierTypeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SupplierType', id: arg }]
        })
    }),
});

export const {
    useGetSupplierTypesQuery,
    useGetSupplierTypeByIdQuery,
    useCreateSupplierTypeMutation,
    useUpdateSupplierTypeMutation,
    useDeleteSupplierTypeMutation
} = supplierTypesApiSlice;
