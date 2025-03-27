import { DataRelatedApiSlice } from "../../ApiSlice";


export const UpdateUserDataApiSlice = DataRelatedApiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        UpdateUserData: builder.mutation({
            query: ({ _id, newData }) => ({
                url: `/update-user-data`,
                method: "PATCH",
                body: { _id, newData },
            }),
            invalidatesTags: ["Update-User-Data"],
        }),
    }),
});

export const { useUpdateUserDataMutation, } = UpdateUserDataApiSlice;
