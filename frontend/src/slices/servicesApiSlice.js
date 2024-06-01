import { SERVICES_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const servicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => ({
                url: SERVICES_URL,
            }),
            providesTags: ['Service'],
            keepUnusedDataFor: 5
        }),
        getServiceDetails: builder.query({
            query: (serviceId) => ({
                url: `${SERVICES_URL}/${serviceId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createService: builder.mutation({
            query: () => ({
                url: SERVICES_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Service'],
        }),
        updateService: builder.mutation({
            query: (data) => ({
                url: `${SERVICES_URL}/${data.serviceId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Service'],
        }),
        deleteService: builder.mutation({
            query: (serviceId) => ({
                url: `${SERVICES_URL}/${serviceId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Service'],
        })
    }),
});

export const {
    useGetServicesQuery, 
    useGetServiceDetailsQuery,
    useCreateServiceMutation, 
    useUpdateServiceMutation,
    useDeleteServiceMutation
} = servicesApiSlice;
