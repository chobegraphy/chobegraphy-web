import { DataRelatedApiSlice } from "../../ApiSlice";

export const GetPictureDataByEmailApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Standard query hook
        GetPictureDataByEmail: builder.query({
            query: ({ email, page, limit, status }) => ({
                url: `get-picture-by-email?email=${email}&status=${status}&page=${page}&limit=${limit}`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["GetDataByEmail"],
        }),


    }),
});

export const {
    useGetPictureDataByEmailQuery,
} = GetPictureDataByEmailApiSlice;
