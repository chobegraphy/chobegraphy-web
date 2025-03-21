import { DataRelatedApiSlice } from "../../ApiSlice";


export const GetImgCountApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        GetImgCount: builder.query({
            query: () => ({
                url: `get-img-count`,
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
