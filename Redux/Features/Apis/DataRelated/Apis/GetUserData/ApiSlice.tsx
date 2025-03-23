import { DataRelatedApiSlice } from "../../ApiSlice";

export const GetUserDataApiSlice = DataRelatedApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetUserData: builder.query({
      query: ({ email }) => {
        const token = typeof window !== "undefined" && localStorage.getItem("ChobegraphyAccess");
        console.log("Token:", JSON.stringify(token));
        return {
          url: `/get-user?email=${email}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        };
      },
      providesTags: ["User-Data"],
    }),
  }),
});

export const { useLazyGetUserDataQuery } = GetUserDataApiSlice;
