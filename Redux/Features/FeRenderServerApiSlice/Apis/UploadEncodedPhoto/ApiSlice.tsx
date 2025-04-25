import { FeRenderServerApiSlice } from "../../ApiSlice";

export const UploadEncodedPictureApiSlice = FeRenderServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadEncodedPicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/upload-encoded-picture`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Upload-Encoded-Photo"],
        }),
    }),
});

export const { useUploadEncodedPictureMutation, } = UploadEncodedPictureApiSlice;
