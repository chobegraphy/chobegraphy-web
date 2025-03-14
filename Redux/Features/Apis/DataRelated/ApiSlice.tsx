import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DataRelatedApiSlice = createApi({
    reducerPath: "DataRelatedApi",
    tagTypes: [
        "Get-User-Count",
        "Get-Img-Count",
        "Get-Most-Viewed-Downloaded-Reacted-Img",
        "Add-Upload-Picture-Data",
        "Get-Suggestion-Data",
        "Get-Collection-Data",
        "Add-Collection-Data", "PictureLike", "Get-Img-Data"
    ],
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3000/api",
        baseUrl: "https://chobegraphy.vercel.app/api",
    }),
    endpoints: () => ({}),
});
