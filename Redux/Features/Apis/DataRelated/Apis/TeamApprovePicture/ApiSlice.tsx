import { DataRelatedApiSlice } from "../../ApiSlice";


export const PictureApproveApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        PictureApprove: builder.mutation({
            query: ({ id }) => ({
                url: `UpdatePictureStatusToApprove`,
                method: "PATCH",
                body: { id },

            }),
            invalidatesTags: ["TeamPictureApprove"],
        }),

    }),
});

export const {

    usePictureApproveMutation
} = PictureApproveApiSlice;
