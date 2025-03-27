import { DataRelatedApiSlice } from "../../ApiSlice";

export const GetSingleUserDataApiSlice = DataRelatedApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetSingleUserData: builder.query({
      query: ({ email }) => {


        return {
          url: `/get-single-user?email=${email}`,
          method: "GET",

        };
      },
      providesTags: ["Single-User-Data"],
    }),
  }),
});

export const { useGetSingleUserDataQuery } = GetSingleUserDataApiSlice;
