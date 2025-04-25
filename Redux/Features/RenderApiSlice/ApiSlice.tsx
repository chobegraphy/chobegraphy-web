import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RenderApiSlice = createApi({
    reducerPath: "RenderApi",
    tagTypes: [
        "UploadProfilePicture",
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chobegraphyserver.onrender.com/api",
    }),
    endpoints: () => ({}),
});
