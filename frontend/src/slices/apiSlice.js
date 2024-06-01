import {createApi,fetchBaseQuery}from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../constants.js';

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['Product','Service','SupplierTypes','Supplier','Order','User'],
    endpoints:(builder)=>({}),
});