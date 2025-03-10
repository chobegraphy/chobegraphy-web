import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeRenderServerApiSlice = createApi({
    reducerPath: "FeRenderServerApi",
    tagTypes: [
        "Upload-User-Photo",
        "Upload-Encoded-Photo",
        "Upload-Thumbnail-Photo",
        "Upload-Main-Photo",
        "Add-Upload-Picture-Data"
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chobegraphy-web.onrender.com/api",
        prepareHeaders: (headers) => {
            headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins or specify one
            headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
            return headers;
        },
        credentials: "include", // Allow sending cookies or authorization headers
    }),
    endpoints: () => ({}),
});
