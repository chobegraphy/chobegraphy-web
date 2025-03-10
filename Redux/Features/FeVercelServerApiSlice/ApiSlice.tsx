import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeVercelServerApiSlice = createApi({
    reducerPath: "FeVercelServerApi",
    tagTypes: [
        "Get-User-Count",
        "Get-Img-Count",
        "Get-Most-Viewed-Downloaded-Reacted-Img",
        "Add-Upload-Picture-Data"
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        // baseUrl: "https://chobegraphy.vercel.app/api",
    }),
    endpoints: () => ({}),
});
