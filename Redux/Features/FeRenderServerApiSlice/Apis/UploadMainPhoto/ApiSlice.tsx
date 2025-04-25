import { FeRenderServerApiSlice } from "../../ApiSlice";

export const UploadMainPictureApiSlice = FeRenderServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadMainPicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/upload-main-picture`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Upload-Main-Photo"],
        }),
    }),
});

export const { useUploadMainPictureMutation } = UploadMainPictureApiSlice;
