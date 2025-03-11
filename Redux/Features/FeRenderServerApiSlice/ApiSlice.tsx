import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeRenderServerApiSlice = createApi({
    reducerPath: "FeRenderServerApi",
    tagTypes: [
        "Upload-User-Photo",
        "Upload-Encoded-Photo",
        "Upload-Thumbnail-Photo",
        "Upload-Main-Photo",
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chobegraphyserver.onrender.com/api",
    }),
    endpoints: () => ({}),
});
