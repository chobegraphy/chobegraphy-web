import { FeRenderServerApiSlice } from "../../ApiSlice";

export const UploadThumbnailPictureApiSlice = FeRenderServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadThumbnailPicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/upload-thumbnail-picture`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Upload-Thumbnail-Photo"],
        }),
    }),
});

export const { useUploadThumbnailPictureMutation, } = UploadThumbnailPictureApiSlice;
