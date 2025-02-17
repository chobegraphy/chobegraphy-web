import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Top-pictures"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chobegraphy-server.vercel.app/api/",
  }),
  endpoints: () => ({}),
});
