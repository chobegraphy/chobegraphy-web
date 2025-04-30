import { DataRelatedApiSlice } from "../../ApiSlice";

export const GetPictureDataApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Standard query hook
        GetPictureData: builder.query({
            query: ({ filter, page, limit, collection }) => ({
                url: `get-picture-data?filter=${filter}&page=${page}&limit=${limit}&collection=${collection || "All"}`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Img-Data"],
        }),


    }),
});

export const {
    useGetPictureDataQuery,
} = GetPictureDataApiSlice;
