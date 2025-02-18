"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleImgDetailsQuery } from "../../../../Redux/Features/Apis/SingleImgData/ApiSlice";
import { SetImgDetailsData } from "../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";
import "./Banner.css";
import BannerImgCard from "./BannerImgCard";
import PhotoDetails from "./PhotoDetails";
import PhotoMetaData from "./PhotoMetaData";
const Banner = () => {
  const pictureId = useParams()?.id;
  console.log(pictureId);
  // redux writing
  const dispatch = useDispatch();
  const Language = useSelector((state: any) => state.Language.value);
  // imgDetailsData
  const ImgDetailsData = useSelector(
    (state: any) => state.StoreImgDetailsData.value
  );

  // State to store image details (if Redux data is empty)
  const [DetailsData, setDetailsData] = useState(ImgDetailsData);

  // Fetch image details if ImgDetailsData is empty
  const { data, error, isLoading } = useGetSingleImgDetailsQuery(pictureId, {
    skip: !pictureId || !ImgDetailsData, // Skip the API call if pictureId or ImgDetailsData is not available
  });

  useEffect(() => {
    if (data) {
      setDetailsData(data); // If data is fetched from the API, set it to the state
      dispatch(SetImgDetailsData(data));
    }
  }, [data]);

  useEffect(() => {
    if (ImgDetailsData) {
      setDetailsData(ImgDetailsData); // Set state from Redux if data exists
    }
  }, [ImgDetailsData]);

  return (
    <div className={`w-full  h-full col-span-6`}>
      {!DetailsData || Object.keys(DetailsData).length === 0 ? (
        <div className="h-screen  absolute z-50 left-1/2 flex justify-center items-center">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <BannerImgCard
              mainImgLink={DetailsData?.url}
              encodedUrl={DetailsData?.encodedUrl}
              dimensions={DetailsData?.dimensions}
              i={DetailsData?._id}
            />
          </div>

          {/* picture information */}
          <PhotoDetails
            setDetailsData={setDetailsData}
            DetailsData={DetailsData}
          />
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
              <span className="font-BanglaSubHeading ">
                {Language === "BN" && (
                  <span>
                    এই ছবি শুধুমাত্র ব্যক্তিগত ও ব্যবসায়িক ডিজাইনে ব্যবহারের
                    জন্য অনুমোদিত, এক্ষেত্রে ব্যবহারকারীকে উক্ত কাজে এই ছবির
                    ক্রেডিট{" "}
                    <span className="font-BanglaHeading underline">
                      ছবিগ্রাফি
                    </span>{" "}
                    কে দিতে হবে । তবে, ছবিটির ফাইল অন্য কোনো ওয়েবসাইট, ক্লাউড
                    স্টোরেজ, সামাজিক যোগাযোগ মাধ্যম বা অন্য কোনো মাধ্যমে
                    কোনোভাবেই বিতরণ করা যাবে না।
                  </span>
                )}
              </span>{" "}
              {Language === "EN" && (
                <span>
                  This image is only allowed for personal and commercial design
                  use, in which case the user must give credit to{" "}
                  <span className="font-Bayon underline">Chobegraphy</span> for
                  the use of this image. However, the image file may not be
                  distributed on any other website, cloud storage, social media,
                  or any other means.
                </span>
              )}
            </p>
          </h1>
        </>
      )}
    </div>
  );
};

export default Banner;
