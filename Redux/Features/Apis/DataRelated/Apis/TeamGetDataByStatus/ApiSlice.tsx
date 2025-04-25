import { DataRelatedApiSlice } from "../../ApiSlice";

export const TeamGetPictureDataByStatusApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Standard query hook
        TeamGetPictureDataByStatus: builder.query({
            query: ({ page, limit, status }) => ({
                url: `team-get-picture-by-status?status=${status}&page=${page}&limit=${limit}`,
                method: "GET",
                fetchOptions: {
                    mode: "cors",
                },
            }),
            providesTags: ["TeamGetDataByStatus"],
        }),


    }),
});

export const {
    useTeamGetPictureDataByStatusQuery,
} = TeamGetPictureDataByStatusApiSlice;
