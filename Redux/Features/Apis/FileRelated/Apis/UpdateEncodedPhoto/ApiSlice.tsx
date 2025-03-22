import { FileRelatedApiSlice } from "../../ApiSlice";


export const UpdateEncodedPictureApiSlice = FileRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UpdateEncodedPicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/update-encoded-picture`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Update-encoded-picture"],
        }),
    }),
});

export const { useUpdateEncodedPictureMutation, } = UpdateEncodedPictureApiSlice;
