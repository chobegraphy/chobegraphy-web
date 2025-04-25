import { apiSlice } from "../../ApiSlice/ApiSlice";

export const UpdateDownloadCountApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    IncreaseDownloadCount: builder.mutation({
      query: ({ id }) => ({
        url: `/IncreaseDownload/${id}`,
        method: "POST",
        body: id,
        fetchOptions: {
          mode: "cors",
          credentials: "include",
        },
      }),
      invalidatesTags: ["UpdateDownloadCount"],
    }),
  }),
});

export const { useIncreaseDownloadCountMutation } = UpdateDownloadCountApiSlice;
