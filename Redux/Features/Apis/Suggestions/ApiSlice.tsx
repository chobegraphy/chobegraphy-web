import { apiSlice } from "../../ApiSlice/ApiSlice";

export const SuggestionsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetSuggestionsData: builder.query({
      query: ({ categories, excludedId }) => ({
        url: `/suggestions`,
        params: {
          categories, // Pass categories directly as an array
          excludedId,
        },
        method: "GET",
        fetchOptions: {
          mode: "cors",
        },
      }),
      providesTags: ["Suggestions"],
    }),
  }),
});

export const { useGetSuggestionsDataQuery } = SuggestionsApiSlice;
