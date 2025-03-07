import { RenderApiSlice } from "../../RenderApiSlice/ApiSlice";

export const UploadProfilePictureApiSlice = RenderApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadProfilePicture: builder.mutation({
            query: ({ file, fileName }) => ({
                url: `/uploadUserPhoto`,
                method: "POST",
                body: { photo: file, filename: fileName, },
                fetchOptions: {
                    mode: "cors",

                },
            }),

            invalidatesTags: ["UploadProfilePicture"],
        }),
    }),
});

export const { useUploadProfilePictureMutation, } = UploadProfilePictureApiSlice;
