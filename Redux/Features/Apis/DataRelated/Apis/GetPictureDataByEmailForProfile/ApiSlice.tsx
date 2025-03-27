import { DataRelatedApiSlice } from "../../ApiSlice";

export const GetPictureDataByEmailForProfileApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Standard query hook
        GetPictureDataByEmailForProfile: builder.query({
            query: ({ email }) => ({
                url: `get-picture-by-email-for-profile?email=${email}`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["GetPictureDataByEmailForProfile"],
        }),


    }),
});

export const {
    useGetPictureDataByEmailForProfileQuery,
} = GetPictureDataByEmailForProfileApiSlice;
