import {apiSlice} from './apiSlice';
import { ORDERS_URL,PAYPAL_URL} from '../constants';

export const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(order)=>({
                url:ORDERS_URL,
                method:'POST',
                body:{...order}
            })
        }),
        getTopRatedSuppliers: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/top-rated-suppliers`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrderDetails:builder.query({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor:5
        }),
        payOrder:builder.mutation({
            query:({orderId,details})=>({
                url:`${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body:{...details},

            })
        }),
        getPayPalClientId: builder.query({
            query: ()=>({
                url:PAYPAL_URL,
            }),
            keepUnusedDataFor:5,
        }),
        getMyOrders:builder.query({
            query:()=>({
                url:`${ORDERS_URL}/mine`
            }),
            keepUnusedDataFor:5,
        }),
        getOrders:builder.query({
            query:()=>({
                url:ORDERS_URL,
            }),
            keepUnusedDataFor:5,
        }),
        deliverOrder:builder.mutation({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}/deliver`,
                method:'PUT',
            })
        }),
        getUserPreferences: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myPreferences`, 
            }),
            keepUnusedDataFor: 5,
        }),
        getTopSuppliersInRange: builder.query({
            query: (dateRange) => ({
                url: `${ORDERS_URL}/top-suppliers`,
                params: dateRange,
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {useCreateOrderMutation,useGetOrderDetailsQuery,
    usePayOrderMutation,useGetTopRatedSuppliersQuery,useGetOrdersQuery,useDeliverOrderMutation,
    useGetPayPalClientIdQuery,useGetMyOrdersQuery,useGetUserPreferencesQuery,
    useGetTopSuppliersInRangeQuery}=ordersApiSlice;

    