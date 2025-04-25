import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetCollectionsDataApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetCollectionsData: builder.query({
            query: () => ({
                url: `get-collections-data`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Collection-Data"],
        }),
    }),
});

export const { useGetCollectionsDataQuery } =
    GetCollectionsDataApiSlice;
