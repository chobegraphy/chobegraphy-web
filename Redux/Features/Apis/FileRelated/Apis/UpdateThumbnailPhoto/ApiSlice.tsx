
import { FileRelatedApiSlice } from "../../ApiSlice";

export const UpdateThumbnailPictureApiSlice = FileRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UpdateThumbnailPicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/update-thumbnail-picture`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Update-Thumbnail-Photo"],
        }),
    }),
});

export const { useUpdateThumbnailPictureMutation, } = UpdateThumbnailPictureApiSlice;
