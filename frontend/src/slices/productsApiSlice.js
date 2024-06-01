import { PRODUCTS_URL,UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";
//lógica de interacción con APIs
export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts: builder.query({
            query: (filters = {}) => {
                let queryParams = new URLSearchParams();

                Object.keys(filters).forEach(key => {
                    if (filters[key]) {
                        queryParams.append(key, filters[key]);
                    }
                });

                return {
                    url: `${PRODUCTS_URL}?${queryParams.toString()}`,
                };
            },
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductsEvent: builder.query({
            query: () => ({
                 url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),      
        getProductsDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
                keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:'POST',
            }),
            invalidatesTags:['Product'],
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method:'PUT',
                body:data,    
            }),
            invalidatesTags:['Product'],
        }),
        deleteProduct: builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:'DELETE',  
            }),
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data,
            })
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data,
            }),
            invalidatesTags:['Product'],
        })
    }),
});

export const {useGetProductsQuery,useGetProductsEventQuery, useGetProductsDetailsQuery,
    useCreateProductMutation,useUpdateProductMutation,
    useDeleteProductMutation,useUploadProductImageMutation,useCreateReviewMutation}=productsApiSlice;