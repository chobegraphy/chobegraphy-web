import { FeRenderServerApiSlice } from "../../../FeRenderServerApiSlice/ApiSlice";

export const AddUploadedPictureDataApiSlice = FeRenderServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        AddUploadedPictureData: builder.mutation({
            query: ({ PictureData }) => ({
                url: `/add-upload-picture-data`,
                method: "POST",
                body: PictureData,
            }),
            invalidatesTags: ["Add-Upload-Picture-Data"],
        }),
    }),
});

export const { useAddUploadedPictureDataMutation, } = AddUploadedPictureDataApiSlice;
