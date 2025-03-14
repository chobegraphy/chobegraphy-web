import { DataRelatedApiSlice } from "../../ApiSlice";

export const PictureLikeApiSlice = DataRelatedApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    PictureLikeCountIncrease: builder.mutation({
      query: ({ PictureId }) => ({
        url: `IncreaseLike/${PictureId}`,
        method: "POST",
        fetchOptions: {
          mode: "cors",
        },
      }),
      invalidatesTags: ["PictureIncreaseLikeCount"],
    }),
    PictureLikeCountDecrease: builder.mutation({
      query: ({ PictureId }) => ({
        url: `DecreaseLike/${PictureId}`,
        method: "DELETE",
        fetchOptions: {
          mode: "cors",
        },
      }),
      invalidatesTags: ["PictureDecreaseLikeCount"],
    }),
  }),
});

export const {
  usePictureLikeCountIncreaseMutation,
  usePictureLikeCountDecreaseMutation,
} = PictureLikeApiSlice;
