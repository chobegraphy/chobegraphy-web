import { FeVercelServerApiSlice } from "../../ApiSlice";

export const GetSuggestionDataApiSlice = FeVercelServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetSuggestionData: builder.query({
            query: ({ collections }) => ({
                url: `get-suggestion-data?collections=${encodeURIComponent(JSON.stringify(collections))}`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Suggestion-Data"],
        }),
    }),
});

export const { useGetSuggestionDataQuery } = GetSuggestionDataApiSlice;
