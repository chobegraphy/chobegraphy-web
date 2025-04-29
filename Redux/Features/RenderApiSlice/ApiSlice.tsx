import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RenderApiSlice = createApi({
    reducerPath: "RenderApi",
    tagTypes: [
        "UploadProfilePicture",
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chobegraphy-server.vercel.app/api",
    }),
    endpoints: () => ({}),
});
