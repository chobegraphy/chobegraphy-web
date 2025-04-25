import { apiSlice } from "../../ApiSlice/ApiSlice";

export const PictureLikeApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetPictureLikeData: builder.query({
      query: ({ id }) => ({
        url: `/LikedPictures/${id}`,
        method: "GET",
        fetchOptions: {
          mode: "cors",
        },
      }),
      providesTags: ["PictureLikeData"],
    }),
    PictureLike: builder.mutation({
      query: ({ UserId, PictureId }) => ({
        url: `/LikePicture`,
        method: "POST",
        body: { UserId, PictureId },
        fetchOptions: {
          mode: "cors",
        },
      }),
      invalidatesTags: ["PictureLike"],
    }),
    PictureUnLike: builder.mutation({
      query: ({ UserId, PictureId }) => ({
        url: `/UnlikePicture`,
        method: "DELETE",
        body: { UserId, PictureId },
        fetchOptions: {
          mode: "cors",
        },
      }),
      invalidatesTags: ["PictureUnLike"],
    }),
  }),
});

export const {
  useGetPictureLikeDataQuery,
  usePictureLikeMutation,
  usePictureUnLikeMutation,
} = PictureLikeApiSlice;
