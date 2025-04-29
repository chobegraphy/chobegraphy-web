import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DataRelatedApiSlice = createApi({
    reducerPath: "DataRelatedApi",
    tagTypes: [
        "Get-User-Count",
        "Get-Img-Count",
        "Get-Most-Viewed-Downloaded-Reacted-Img",
        "Add-Upload-Picture-Data",
        "Get-Suggestion-Data",
        "Get-Collection-Data",
        "Add-Collection-Data", "PictureLike", "Get-Img-Data", "PictureIncreaseLikeCount", "PictureDecreaseLikeCount",
        "GetDataByEmail", "TeamGetDataByStatus", "TeamPictureApprove", "TeamRejectApprove", "Update-Picture-Data", "User-Data", "GetPictureDataByEmailForProfile", "Update-User-Data", "Single-User-Data", "Get-Picture-Status-Count"
    ],
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3000/api",
        baseUrl: "https://chobegraphy-server.vercel.app/api",
    }),
    endpoints: () => ({}),
});
