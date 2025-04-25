import { apiSlice } from "../../ApiSlice/ApiSlice";

export const IncreaseViewCountApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    IncreaseViewCount: builder.mutation({
      query: ({ id }) => ({
        url: `/IncreaseView/${id}`,
        method: "POST",
        body: id,
        fetchOptions: {
          mode: "cors",
          credentials: "include",
        },
      }),
      invalidatesTags: ["IncreaseViewCount"],
    }),
  }),
});

export const { useIncreaseViewCountMutation } = IncreaseViewCountApiSlice;
