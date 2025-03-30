import useAuthData from "@/ExportedFunctions/useAuthData";
import clsx from "clsx"; // Utility for conditional class names
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { usePictureLikeMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLike/ApiSlice";
import {
  usePictureUnLikeMutation
} from "../../../../Redux/Features/Apis/PictureLike/ApiSlice";

import { usePictureLikeCountDecreaseMutation, usePictureLikeCountIncreaseMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLikeCountIncreaseDecrease/ApiSlice";
import { SetImgDetailsId } from "../../../../Redux/Features/StoreImgDetailsId/StoreImgDetailsId";
import { SetPictureLikeIds } from "../../../../Redux/Features/StoreLikedPictureData/StoreLikedPictureData";
const ImgCard = ({ imgData, i, setRecentImgData, RecentImgData }: any) => {
  // framer motion

  const { user } = useAuthData();
  const pathname = usePathname();
  const router = useRouter(); // Initialize router

  // Redux dispatch function
  const dispatch = useDispatch();
  const [loadedImg, setLoadedImg] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const LikedPictureData = useSelector(
    (state: any) => state.StoreLikedPictureData.value
  );
  const Language = useSelector((state: any) => state.Language.value);



  const [
    LikedData,
    {
      data: likedData,
      isLoading: likedLoading,
      isError: likedError,
      error: likedInitial,
    },
  ] = usePictureLikeMutation();
  const [
    UnLikedData,
    {
      data: UnlikedData,
      isLoading: UnlikedLoading,
      isError: UnlikedError,
      error: UnlikedInitial,
    },
  ] = usePictureUnLikeMutation();
  const [LikedCountData, { isLoading: LikedCountLoading }] = usePictureLikeCountIncreaseMutation();
  const [UnLikedCountData, { isLoading: UnlikedCountLoading }] = usePictureLikeCountDecreaseMutation();
  // use effect for like unlike loading
  useEffect(() => {
    setLikeLoading(likedLoading || UnlikedLoading || LikedCountLoading || UnlikedCountLoading);
  }, [likedLoading, UnlikedLoading, LikedCountLoading, UnlikedCountLoading]);

  // Ensure imgData exists before using it
  if (!imgData) return null;

  // Extract width and height safely (default to 1920x1080 if missing)
  const [width, height] = imgData.dimensions
    ? imgData.dimensions.split(" x ").map((num: string) => parseInt(num, 10))
    : [1920, 1080];

  // Format numbers for likes/views
  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
    return num.toString();
  };



  const handleLike = async () => {


    if (!user) {

      router.push("/SignIn");
      toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
      return;
    }

    if (imgData?._id) {
      try {
        const LikedResponse = await LikedData({
          UserId: user?._id,
          PictureId: imgData._id,
        }).unwrap();

        const LikedCountDataResponse = await LikedCountData({
          PictureId: imgData._id,
        }).unwrap();

        // ✅ Update the like count at its original position
        setRecentImgData((prevData: any) =>
          prevData.map((item: any) =>
            item._id === imgData._id ? LikedCountDataResponse?.updatedData : item
          )
        );

        document.getElementById("refetch")?.click();
        dispatch(SetPictureLikeIds(LikedResponse?.updatedData?.PictureLiked));
      } catch (error) {
        console.error("❌ Error in handleLike:", error);
        toast.error("Failed to like the picture.");
      }
    }
  };


  const handleUnlike = async () => {
    if (!user) {
      router.push("/SignIn");
      toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
      return;
    }

    if (imgData?._id) {
      try {
        const UnLikedResponse = await UnLikedData({
          UserId: user?._id,
          PictureId: imgData._id,
        }).unwrap();

        const UnLikedCountDataResponse = await UnLikedCountData({
          PictureId: imgData._id,
        }).unwrap();

        // ✅ Update the like count at its original position
        setRecentImgData((prevData: any) =>
          prevData.map((item: any) =>
            item._id === imgData._id ? UnLikedCountDataResponse?.updatedData : item
          )
        );

        document.getElementById("refetch")?.click(); // Trigger refetch after unlike
        dispatch(SetPictureLikeIds(UnLikedResponse?.updatedData?.PictureLiked));
      } catch (error) {
        console.error("❌ Error in handleUnlike:", error);
        toast.error("Failed to unlike the picture.");
      }
    }
  };
  // console.log(LikedPictureData)
  return (
    <div

      className={clsx(
        // i !== 0 && pathname === "/" ? "my-1" : "my-0", // No margin for the first card
        "block relative overflow-hidden rounded-2xl"
      )}

    >
      {/* Blurred Low-Quality Background */}
      <Link
        href={`/ImgDetails?id=${imgData?._id}`}
        onClick={() => dispatch(SetImgDetailsId(imgData?._id))}
        className="relative w-full rounded-2xl overflow-hidden block"
        style={{ aspectRatio: `${width}/${height}` }} // Maintain aspect ratio
      >
        {/* Blurred Low-Quality Image */}
        <img
          src={imgData?.encodedUrl || "/placeholder.jpg"} // Use encodedUrl as the blur image
          alt="Blurred preview"
          className="absolute inset-0 w-full h-full object-cover blur-xl transition-opacity duration-500"
          style={{ opacity: loadedImg ? 0 : 1 }} // Hide blurred image when main image loads
        />

        {/* High-Quality Image */}
        <img
          width={width}
          height={height}
          src={imgData?.thumbnail || "/placeholder.jpg"} // Main image
          onLoad={() => setLoadedImg(true)}
          loading="lazy"
          alt={imgData?.name || `Gallery ${i}`}
          className={clsx(
            "w-full object-cover object-center rounded-2xl border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 shadow-lg transition-opacity duration-500",
            loadedImg ? "opacity-100" : "opacity-0"
          )}
        />
      </Link>


      {/* Overlay for Icons */}
      {loadedImg && (
        <div className="rounded-2xl h-[30px]   absolute  bottom-0 p-2 flex items-center justify-between text-sm text-white">
          <div className="flex items-center gap-x-3 absolute bottom-3 left-3">
            {likeLoading !== true && (
              <span>
                {LikedPictureData?.includes(imgData?._id) ? (
                  <FaHeart
                    onClick={handleUnlike}
                    className="text-pink-600 cursor-pointer"
                  />
                ) : (
                  <FaRegHeart onClick={handleLike} className="cursor-pointer" />
                )}
              </span>
            )}
            {likeLoading === true && (
              <ImSpinner
                className={`${LikedPictureData?.includes(imgData?._id)
                  ? "text-pink-600"
                  : "text-white"
                  } animate-spin `}
              />
            )}
            <p className="font-Space text-xs -ms-2">
              {formatNumber(imgData?.react || 0)}
            </p>
            <FiEye />
            <p className="font-Space text-xs -ms-2">
              {formatNumber(imgData?.view || 0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgCard;
