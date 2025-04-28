import useAuthData from "@/ExportedFunctions/useAuthData";
import clsx from "clsx"; // Utility for conditional class names
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye, FiPlus } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { usePictureLikeMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLike/ApiSlice";
import {
  usePictureUnLikeMutation,
} from "../../../../Redux/Features/Apis/PictureLike/ApiSlice";

import { BiMessageSquareError } from "react-icons/bi";
import { RiHourglassFill } from "react-icons/ri";
import { TbEditCircle } from "react-icons/tb";
import { usePictureLikeCountDecreaseMutation, usePictureLikeCountIncreaseMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLikeCountIncreaseDecrease/ApiSlice";
import { SetImgDetailsData } from "../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";
import { SetImgDetailsId } from "../../../../Redux/Features/StoreImgDetailsId/StoreImgDetailsId";
import { SetPictureLikeIds } from "../../../../Redux/Features/StoreLikedPictureData/StoreLikedPictureData";
const ImgCard = ({ imgData, i, setRecentImgData, RecentImgData }: any) => {
  const params = useSearchParams();
  const status = params.get("status");

  const { user } = useAuthData();

  const router = useRouter(); // Initialize router
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
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


  return (
    <div

      className={clsx(

        "block relative overflow-hidden rounded-2xl"
      )}
    >
      {/* Blurred Low-Quality Background */}
      <Link
        href={status === "About Me" ? `/ImgDetails?id=${imgData?._id}` : '#'}
        onClick={() => {
          dispatch(SetImgDetailsData({}))
          dispatch(SetImgDetailsId(imgData?._id))
        }}
        className="relative w-full rounded-2xl overflow-hidden block"
        style={{ aspectRatio: `${width}/${height}` }} // Maintain aspect ratio
      >
        {/* Blurred Low-Quality Image */}
        <img
          src={imgData?.encodedUrl || "/placeholder.jpg"} // Use encodedUrl as the blur image
          alt="Blurred preview"
          className="absolute blur-sm w-full h-full object-cover  transition-opacity duration-500"
          style={{
            display: loadedImg ? "none" : "block",
            transition: "opacity 0.5s ease-in-out",
          }}
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

          )}
          style={{
            display: !loadedImg ? "none" : "block",
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      </Link>


      {/* Overlay for Icons */}
      {status === "Pending" && <RiHourglassFill className="absolute top-3 right-3 text-xl text-white" />}
      {status === "Rejected" && <BiMessageSquareError onClick={() => {
        setTimeout(() => {
          setIsOpen(true);
        }, 100);
        setIsOpen2(true)
      }} className="absolute top-0 right-0 text-xl  bg-dark-primary-color text-light-primary-color dark:text-dark-primary-color cursor-pointer dark:bg-light-primary-color rounded-s-xl p-2.5 w-10 h-10" />}
      {status === "Rejected" &&
        <TbEditCircle onClick={() => router.push(`/Dashboard/EditPicture?id=${imgData?._id}`)} className="absolute bottom-0 right-0 text-xl  bg-dark-primary-color text-light-primary-color dark:text-dark-primary-color cursor-pointer dark:bg-light-primary-color rounded-s-xl p-2.5 w-10 h-10" />
      }
      {loadedImg && status !== "Pending" && status !== "Rejected" && (
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



      <div
        className={`${isOpen2 ? "h-[100dvh] w-screen opacity-100 " : "opacity-0"
          } fixed z-50 right-0 flex justify-center items-center overflow-hidden top-0 left-0 bg-black/90`}
      >
        <div
          ref={divRef}
          className={`${isOpen ? "bottom-8 max-lg:bottom-2" : "-bottom-[120%]"
            } absolute transform duration-500 bg-dark-primary-color border-2 dark:bg-black left-0 right-0 max-md:w-[95%] w-3/4 rounded-2xl mx-auto p-4 border-light-secondary-color lg:scale-125 dark:text-dark-primary-color text-light-primary-color md:max-w-[320px] min-h-[100px] `}
        >
          <FiPlus onClick={() => {
            setIsOpen(false);
            setTimeout(() => setIsOpen2(false), 200);
          }} className="absolute top-2 right-2 text-xl  dark:bg-dark-primary-color dark:text-light-primary-color text-dark-primary-color rotate-45 cursor-pointer bg-black rounded-xl p-0.5 w-5 h-5" />
          <p className={`${Language === "BN" && "font-BanglaHeading"} text-center mb-3 `}>
            {Language === "BN" && "ছবি রিজেক্ট করার কারণ"}
            {Language === "EN" && <span className="font-Righteous text-xl">Reasons of rejecting </span>}
          </p>
          <p className={`${Language === "BN" && "font-BanglaSubHeading"} text-center mb-3`}>
            {Language === "BN" && <>{imgData?.rejectionReason}</>}
            {Language === "EN" && (
              <span className="font-Space ">
                {imgData?.rejectionReason === "ছবি উচ্চমানের নয়" && "The picture is not high quality."}
                {imgData?.rejectionReason === "ছবি পরিষ্কার নয়" && "The picture is not clear."}
                {imgData?.rejectionReason === "ছবি অস্পষ্ট" && "The picture is blurry."}
                {imgData?.rejectionReason === "ছবি ওয়াটারমার্ক,লোগো বা লেখা সংযুক্ত" &&
                  "The picture contains watermarks, logos, or any text overlays."}
                {imgData?.rejectionReason ===
                  "ছবি সকল দর্শকের জন্য যা নিরাপদ নয় । অশ্লীল, সহিংস বা আপত্তিকর ছবি সম্পূর্ণ নিষিদ্ধ।" &&
                  "The picture contains content that is not safe for all viewers. Pornographic, violent, or offensive images are completely prohibited."}
                {imgData?.rejectionReason === "সঠিক ক্যাটাগরি নির্বাচন করা হয়নি।" &&
                  "The correct category was not selected."}
                {![
                  "ছবি উচ্চমানের নয়",
                  "ছবি পরিষ্কার নয়",
                  "ছবি অস্পষ্ট",
                  "ছবি ওয়াটারমার্ক,লোগো বা লেখা সংযুক্ত",
                  "ছবি সকল দর্শকের জন্য যা নিরাপদ নয় । অশ্লীল, সহিংস বা আপত্তিকর ছবি সম্পূর্ণ নিষিদ্ধ।",
                  "সঠিক ক্যাটাগরি নির্বাচন করা হয়নি।"
                ].includes(imgData?.rejectionReason) && imgData?.rejectionReason}
              </span>
            )}

          </p>
        </div>
      </div>
    </div>
  );
};

export default ImgCard;
