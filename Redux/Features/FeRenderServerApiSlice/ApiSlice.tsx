import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeRenderServerApiSlice = createApi({
    reducerPath: "FeRenderServerApi",
    tagTypes: [
        "Upload-User-Photo",
        "Upload-Encoded-Photo",
        "Upload-Thumbnail-Photo",
        "Upload-Main-Photo"
        , "Add-Upload-Picture-Data"
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        // baseUrl: "https://chobegraphy-web.onrender.com/api",
    }),
    endpoints: () => ({}),
});
