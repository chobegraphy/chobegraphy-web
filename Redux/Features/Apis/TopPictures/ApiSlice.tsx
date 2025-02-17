import { apiSlice } from "../../ApiSlice/ApiSlice";

export const TopPicturesApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetTopPictures: builder.query({
      query: () => ({
        url: `top-pictures`,
        method: "GET",
        fetchOptions: {
          mode: "cors",
        },
      }),
      providesTags: ["Top-pictures"],
    }),
  }),
});

export const { useGetTopPicturesQuery } = TopPicturesApiSlice;
