import { DataRelatedApiSlice } from "../../ApiSlice";


export const UpdatePictureDataApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UpdatePictureData: builder.mutation({
            query: ({ _id, newData }) => ({
                url: `/update-picture-data`,
                method: "PATCH",
                body: { _id, newData },
            }),
            invalidatesTags: ["Update-Picture-Data"],
        }),
    }),
});

export const { useUpdatePictureDataMutation, } = UpdatePictureDataApiSlice;
