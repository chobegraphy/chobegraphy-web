import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeRenderServerApiSlice = createApi({
    reducerPath: "FeRenderServerApi",
    tagTypes: [
        "Upload-User-Image",

    ],
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3000/api",
        baseUrl: "https://chobegraphy-web.onrender.com/api",
    }),
    endpoints: () => ({}),
});
