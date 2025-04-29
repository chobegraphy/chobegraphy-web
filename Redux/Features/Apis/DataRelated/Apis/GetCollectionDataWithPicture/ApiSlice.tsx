import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetCollectionsDataWithPictureApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetCollectionsDataWithPicture: builder.query({
            query: () => ({
                url: `get-collections-with-picture`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Collection-Data-With-Picture"],
        }),
    }),
});

export const { useGetCollectionsDataWithPictureQuery } =
    GetCollectionsDataWithPictureApiSlice;
