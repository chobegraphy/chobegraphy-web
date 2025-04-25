import { FeRenderServerApiSlice } from "../../ApiSlice";

export const UploadProfilePictureApiSlice = FeRenderServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadProfilePicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/upload-user-picture`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Upload-User-Photo"],
        }),
    }),
});

export const { useUploadProfilePictureMutation, } = UploadProfilePictureApiSlice;
