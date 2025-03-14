import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetUserCountApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetUserCount: builder.query({

            query: () => ({
                url: `get-most-viewed-picture`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Most-Viewed-Downloaded-Reacted-Img"],
        }),
    }),
});

export const { useGetUserCountQuery } =
    GetUserCountApiSlice;
