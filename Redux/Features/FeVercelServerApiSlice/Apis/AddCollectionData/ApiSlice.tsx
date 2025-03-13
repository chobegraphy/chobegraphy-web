import { FeVercelServerApiSlice } from "../../ApiSlice";

export const AddNewCollectionDataApiSlice = FeVercelServerApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        AddNewCollectionData: builder.mutation({
            query: ({ data }) => ({
                url: `/add-new-collection-data`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Add-Collection-Data"],
        }),
    }),
});

export const { useAddNewCollectionDataMutation, } = AddNewCollectionDataApiSlice;
