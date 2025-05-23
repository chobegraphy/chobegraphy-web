import { DataRelatedApiSlice } from "../../ApiSlice";

export const GetSuggestionDataApiSlice = DataRelatedApiSlice.injectEndpoints({
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
