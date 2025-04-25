import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FileRelatedApiSlice = createApi({
    reducerPath: "FileRelatedApiSlice",
    tagTypes: [
        "Upload-User-Photo",
        "Upload-Encoded-Photo",
        "Upload-Thumbnail-Photo",
        "Upload-Main-Photo",
        "Update-encoded-picture", "Update-Main-Photo", "Update-Thumbnail-Photo"
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chobegraphyserver.onrender.com/api",
    }),
    endpoints: () => ({}),
});
