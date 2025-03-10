import { FeRenderServerApiSlice } from "../../ApiSlice";

export const UploadProfilePictureApiSlice = FeRenderServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadProfilePicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/upload-user-photo`,
                method: "POST",
                body: formData,
                fetchOptions: {
                    mode: "no-cors",
                },
            }),

            invalidatesTags: ["Upload-User-Image"],
        }),
    }),
});

export const { useUploadProfilePictureMutation, } = UploadProfilePictureApiSlice;
