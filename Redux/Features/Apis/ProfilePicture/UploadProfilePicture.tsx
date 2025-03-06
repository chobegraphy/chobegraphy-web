import { apiSlice } from "../../ApiSlice/ApiSlice";

export const UploadProfilePictureApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UploadProfilePicture: builder.mutation({
            query: ({ file, fileName, chunkIndex, totalChunks }) => ({
                url: `http://localhost:5000/api/uploadUserPhoto`,
                method: "POST",
                body: { photo: file, filename: fileName, chunkIndex, totalChunks },
                fetchOptions: {
                    mode: "cors",

                },
            }),

            invalidatesTags: ["UploadProfilePicture"],
        }),
        UploadUsingImgBB: builder.mutation({
            query: ({ imgUrl, filename }) => ({
                url: `http://localhost:5000/api/uploadImgByImgBB`,
                method: "POST",
                body: { imgUrl, filename },
                fetchOptions: {
                    mode: "cors",

                },
            }),

            invalidatesTags: ["UploadUsingImgBB"],
        }),

    }),
});

export const { useUploadProfilePictureMutation, useUploadUsingImgBBMutation } = UploadProfilePictureApiSlice;
