import { DataRelatedApiSlice } from "../../ApiSlice";


export const PictureLikeApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        PictureLike: builder.mutation({
            query: ({ UserId, PictureId }) => ({
                url: `picture-like`,
                method: "POST",
                body: { UserId, PictureId },

            }),
            invalidatesTags: ["PictureLike"],
        }),

    }),
});

export const {

    usePictureLikeMutation
} = PictureLikeApiSlice;
