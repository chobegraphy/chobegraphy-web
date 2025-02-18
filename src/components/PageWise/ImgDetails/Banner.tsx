"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleImgDetailsQuery } from "../../../../Redux/Features/Apis/SingleImgData/ApiSlice";
import { useIncreaseDownloadCountMutation } from "../../../../Redux/Features/Apis/UpdateDownloadCount/ApiSlice";
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

  // Function to handle image download
  // redux writing
  const [
    increaseDownloadCount,
    {
      data: updateDownloadCountData,
      isLoading: updateDownloadCountLoading,
      isError: updateDownloadCountError,
      error: updateDownloadCountInitial,
    },
  ] = useIncreaseDownloadCountMutation();
  const handleDownload = async () => {
    if (!DetailsData?.url) {
      toast.error("Image URL not found!");
      return;
    }

    toast.loading(Language === "BN" ? "ডাউনলোড হচ্ছে.." : "Downloading...", {
      id: "download",
    });

    try {
      const increaseDownloadCountResponse = await increaseDownloadCount({
        id: DetailsData?._id,
      }).unwrap();
      setDetailsData(increaseDownloadCountResponse.updatedData);
      const response = await fetch(DetailsData.url);
      const blob = await response.blob();
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = DetailsData?.name || "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.dismiss("download");
      toast.success(
        Language === "EN" ? "Download Complete!" : "ডাউনলোড হয়েছে!"
      );
    } catch (error) {
      toast.dismiss("download");
      toast.error(
        Language === "EN"
          ? "Download failed! Try again."
          : "ডাউনলোড ব্যর্থ হয়েছে! পুনরায় চেষ্টা করুন."
      );
      console.error("Download Error:", error);
    }
  };

  return (
    <div className="w-full relative h-full col-span-6">
      {!DetailsData || Object.keys(DetailsData).length === 0 ? (
        <div className="h-screen w-full flex justify-center items-center">
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
          <PhotoDetails DetailsData={DetailsData} />
          <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

          {/* Picture meta data */}
          <PhotoMetaData MetaData={DetailsData?.exifData} />
          <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />
          {/* download button */}
          <button
            id="downloadButton"
            onClick={handleDownload}
            className="flex items-center absolute lg:right-20 right-3 max-md:scale-90 top-80 cursor-pointer"
          >
            <svg
              className="w-20"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2785 20.3364L15.003 25M15.003 25L19.7275 20.3364M15.003 25V14.5068M25.4914 21.6072C26.5183 20.8944 27.2883 19.8772 27.6898 18.7031C28.0913 17.529 28.1033 16.2592 27.7242 15.0779C27.345 13.8966 26.5944 12.8653 25.5812 12.1337C24.5681 11.402 23.3451 11.0081 22.0897 11.0091H20.6015C20.2463 9.64246 19.5816 8.37322 18.6575 7.29689C17.7335 6.22055 16.5741 5.36518 15.2666 4.79516C13.9592 4.22514 12.5378 3.95532 11.1094 4.00603C9.68107 4.05673 8.28298 4.42663 7.0204 5.08789C5.75783 5.74914 4.66367 6.68451 3.8203 7.82359C2.97693 8.96266 2.40633 10.2758 2.15145 11.664C1.89658 13.0523 1.96407 14.4795 2.34884 15.8383C2.73362 17.1971 3.42565 18.452 4.37284 19.5086"
                className="stroke-light-primary-color dark:stroke-dark-primary-color"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* <span className="font-Righteous text-xl">Download</span> */}
          </button>

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
