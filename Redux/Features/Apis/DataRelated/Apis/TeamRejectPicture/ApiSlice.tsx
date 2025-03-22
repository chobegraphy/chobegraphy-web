import { DataRelatedApiSlice } from "../../ApiSlice";


export const PictureRejectApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        PictureReject: builder.mutation({
            query: ({ id, reason }) => ({
                url: `team-picture-reject`,
                method: "PATCH",
                body: { id, reason },

            }),
            invalidatesTags: ["TeamRejectApprove"],
        }),

    }),
});

export const {

    usePictureRejectMutation
} = PictureRejectApiSlice;
