import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetUserCountApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetUserCount: builder.query({
            query: () => ({
                url: `get-user-count`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-User-Count"],
        }),
    }),
});

export const { useGetUserCountQuery } =
    GetUserCountApiSlice;
