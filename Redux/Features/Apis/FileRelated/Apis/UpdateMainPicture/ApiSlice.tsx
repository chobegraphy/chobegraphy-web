
import { FileRelatedApiSlice } from "../../ApiSlice";

export const UpdateMainPictureApiSlice = FileRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UpdateMainPicture: builder.mutation({
            query: ({ formData }) => ({
                url: `/update-main-picture`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Update-Main-Photo"],
        }),
    }),
});

export const { useUpdateMainPictureMutation } = UpdateMainPictureApiSlice;
