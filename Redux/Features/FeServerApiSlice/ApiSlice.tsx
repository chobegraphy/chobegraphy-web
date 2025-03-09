import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeServerApiSlice = createApi({
    reducerPath: "FeServerApi",
    tagTypes: [
        "Get-User-Count",
        "Get-Img-Count"
    ],
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3000/api",
        baseUrl: "https://chobegraphy.vercel.app/api",
    }),
    endpoints: () => ({}),
});
