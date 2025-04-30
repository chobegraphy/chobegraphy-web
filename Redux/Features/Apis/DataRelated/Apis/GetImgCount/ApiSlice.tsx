import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetImgCountApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetImgCount: builder.query({
            query: ({ collection }) => ({
                url: `get-img-count?collection=${collection || "All"}`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["Get-Img-Count"],
        }),
    }),
});

export const { useGetImgCountQuery } =
    GetImgCountApiSlice;
