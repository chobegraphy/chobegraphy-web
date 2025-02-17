import { apiSlice } from "../../ApiSlice/ApiSlice";

export const SingleImgDetailsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetSingleImgDetails: builder.query({
      query: (id) => ({
        url: `/SinglePictureDetails/${id}`,
        method: "GET",
        fetchOptions: {
          mode: "cors",
        },
      }),
      providesTags: ["SingleImgDetails"],
    }),
  }),
});

export const { useGetSingleImgDetailsQuery } = SingleImgDetailsApiSlice;
