import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Top-pictures", "SingleImgDetails", "Suggestions"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chobegraphy-server.vercel.app/api/",
  }),
  endpoints: () => ({}),
});
