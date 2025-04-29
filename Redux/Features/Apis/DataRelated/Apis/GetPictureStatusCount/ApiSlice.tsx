import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetPictureStatusCountApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetPictureStatusCount: builder.query({
            query: () => ({
                url: `get-img-status-count`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Picture-Status-Count"],
        }),
    }),
});

export const { useGetPictureStatusCountQuery } =
    GetPictureStatusCountApiSlice;
