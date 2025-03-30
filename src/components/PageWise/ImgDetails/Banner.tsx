"use client";

import useAuthData from "@/ExportedFunctions/useAuthData";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { PiShareNetworkBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { usePictureLikeMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLike/ApiSlice";
import { usePictureUnLikeMutation } from "../../../../Redux/Features/Apis/PictureLike/ApiSlice";

import { usePictureLikeCountDecreaseMutation, usePictureLikeCountIncreaseMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLikeCountIncreaseDecrease/ApiSlice";
import { useLazyGetSingleImgDetailsQuery } from "../../../../Redux/Features/Apis/SingleImgData/ApiSlice";
import { SetImgDetailsData } from "../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";
import { SetPictureLikeIds } from "../../../../Redux/Features/StoreLikedPictureData/StoreLikedPictureData";
import "./Banner.css";
import BannerImgCard from "./BannerImgCard";
import PhotoDetails from "./PhotoDetails";
import PhotoMetaData from "./PhotoMetaData";
const Banner = () => {
  const { user } = useAuthData();
  const router = useRouter(); // Initialize router
  const pathname = usePathname();
  const [likeLoading, setLikeLoading] = useState(false);
  const LikedPictureData = useSelector(
    (state: any) => state.StoreLikedPictureData.value
  );
  // redux writing
  const dispatch = useDispatch();
  const Language = useSelector((state: any) => state.Language.value);
  const [fetchImageDetails] =
    useLazyGetSingleImgDetailsQuery();
  const [
    LikedData
  ] = usePictureLikeMutation();
  const [
    UnLikedData,
  ] = usePictureUnLikeMutation();
  const [LikedCountData] = usePictureLikeCountIncreaseMutation();
  const [UnLikedCountData] = usePictureLikeCountDecreaseMutation();
  // imgDetailsData
  const ImgDetailsData = useSelector(
    (state: any) => state.StoreImgDetailsData.value
  );

  // State to store image details (if Redux data is empty)
  const [DetailsData, setDetailsData] = useState(ImgDetailsData);

  useEffect(() => {
    if (ImgDetailsData) {
      setDetailsData(ImgDetailsData); // Set state from Redux if data exists
    }
  }, [ImgDetailsData]);

  // Share function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: DetailsData?.name || "Image",
          text:
            Language === "EN"
              ? "Check out this amazing image!"
              : "এই চমৎকার ছবিটি দেখুন!",
          url: window.location.href,
        });

      } catch (error) {

      }
    } else {
      toast.error("Your browser doesn't support sharing.");
    }
  };
  const handleLike = async () => {
    if (!user) {
      router.push("/SignIn");
      typeof window !== 'undefined' && localStorage.setItem('redirectUrl', pathname);
      toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
      return;
    }
    if (DetailsData?._id) {
      setLikeLoading(true);
      const LikedResponse = await LikedData({
        UserId: user?._id,
        PictureId: DetailsData._id,
      }).unwrap();
      const liked = await LikedCountData({
        PictureId: DetailsData._id,
      }).unwrap();
      const fetchData = await fetchImageDetails(DetailsData._id).unwrap();

      dispatch(SetImgDetailsData(fetchData));
      dispatch(SetPictureLikeIds(LikedResponse?.updatedData?.PictureLiked));
      setLikeLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!user) {
      router.push("/SignIn");
      typeof window !== 'undefined' && localStorage.setItem('redirectUrl', pathname);
      toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
      return;
    }
    if (DetailsData?._id) {
      setLikeLoading(true);
      const UnLikedResponse = await UnLikedData({
        UserId: user?._id,
        PictureId: DetailsData._id,
      }).unwrap();
      const unliked = await UnLikedCountData({
        PictureId: DetailsData._id,
      }).unwrap();
      const fetchData = await fetchImageDetails(DetailsData._id).unwrap();
      // dispatch(SetImgDetailsData(fetchData));

      dispatch(SetPictureLikeIds(UnLikedResponse?.updatedData?.PictureLiked));
      setLikeLoading(false);
    }
  };
  return (
    <div className={`w-full  h-full col-span-6`}>
      <div className="relative">
        <BannerImgCard
          mainImgLink={DetailsData?.url}
          encodedUrl={DetailsData?.encodedUrl}
          dimensions={DetailsData?.dimensions}
          i={DetailsData?._id}
        /><div className="text-2xl absolute right-5 bottom-5 max-md:right-3 max-md:bottom-3 max-md:text-lg max-md:gap-x-3  w-fit   flex gap-x-3 cursor-pointer ">
          {likeLoading !== true && (
            <span className="dark:bg-light-primary-color bg-dark-primary-color lg:p-2.5 p-2 rounded-full">
              {LikedPictureData?.includes(DetailsData?._id) ? (
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
            <span className="dark:bg-light-primary-color bg-dark-primary-color lg:p-2.5 p-2 rounded-full"> <ImSpinner
              className={`${LikedPictureData?.includes(DetailsData?._id)
                ? "text-pink-600"
                : "text-white"
                } animate-spin `}
            /></span>
          )}
          <span className="dark:bg-light-primary-color bg-dark-primary-color lg:p-2.5 p-2 rounded-full">
            <PiShareNetworkBold onClick={handleShare} id="share" />
          </span>
        </div>
      </div>

      {/* picture information */}
      <PhotoDetails setDetailsData={setDetailsData} DetailsData={DetailsData} />
      <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

      {/* Picture meta data */}
      <PhotoMetaData MetaData={DetailsData?.exifData} />
      <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

      {/* copyright info */}
      <h1 className="flex flex-col  gap-x-1 font-Space mt-2">
        <p className="font-Righteous">
          <span className="font-BanglaHeading">
            {Language === "BN" && "কপিরাইট তথ্য"}
          </span>{" "}
          {Language === "EN" && "Copy Right info"}
        </p>
        <p className="mt-1 text-justify">
          {
            DetailsData.copyright === "CC-BY" && <><span className="font-BanglaSubHeading text-justify">
              {Language === "BN" && (
                <span>
                  এই লাইসেন্সের অধীনে ব্যবহারকারী এই ছবি/ইমেজ বাণিজ্যিক/অবাণিজ্যিক কাজে ব্যবহার, কপি, মোডিফাই (পরিবর্তন) সরবরাহ এবং প্রকাশ করতে পারবেন। এক্ষেত্রে ব্যবহারকারীকে উক্ত কাজে এই ছবি/ইমেজের স্বত্বধারীর নাম উল্ল্যেখ করে ক্রেডিট দিতে হবে।
                </span>
              )}
            </span>{" "}
              {Language === "EN" && (
                <span className="text-justify">
                  Under this license, the user may use, copy, modify, distribute, and publish this image for commercial/non-commercial purposes. In this case, the user must give credit to the copyright holder of this image in the work.
                </span>
              )}</>
          }
          {
            DetailsData.copyright === "CC-0" && <><span className="font-BanglaSubHeading text-justify">
              {Language === "BN" && (
                <span>
                  এই লাইসেন্সের অধীনে ব্যবহারকারী এই ছবি/ইমেজ বাণিজ্যিক, অবাণিজ্যিক কাজে ব্যবহার, কপি, পরিবর্তন,প্রকাশ এবং সরবরাহ করতে পারবেন। এজন্য ব্যবহারকারীকে ইমেজের স্বত্বধারীর অনুমতি নিতে হবে না অথবা তার নাম উল্ল্যেখ করতে হবে না।
                </span>
              )}
            </span>{" "}
              {Language === "EN" && (
                <span className="text-justify">
                  Under this license, the user is free to use, copy, modify, publish, and distribute this image for commercial or non-commercial purposes. The user does not need to obtain permission from or attribute the image&apos;s copyright holder.
                </span>
              )}</>
          }

        </p>
      </h1>
    </div>
  );
};

export default Banner;
