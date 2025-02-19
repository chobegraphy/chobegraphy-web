import useAuthData from "@/ExportedFunctions/useAuthData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";
import { MdPublishedWithChanges } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import {
  RiColorFilterFill,
  RiCustomSize,
  RiDownloadCloud2Fill,
} from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  usePictureLikeMutation,
  usePictureUnLikeMutation,
} from "../../../../Redux/Features/Apis/PictureLike/ApiSlice";
import { useIncreaseDownloadCountMutation } from "../../../../Redux/Features/Apis/UpdateDownloadCount/ApiSlice";
import { SetPictureLikeIds } from "../../../../Redux/Features/StoreLikedPictureData/StoreLikedPictureData";

const PhotoDetails = ({ DetailsData, setDetailsData }: any) => {
  // auth data
  const { user } = useAuthData();
  const router = useRouter(); // Initialize router

  // states
  const [copiedColor, setCopiedColor] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);

  // redux writing
  const dispatch = useDispatch();
  const Language = useSelector((state: any) => state.Language.value);
  const LikedPictureData = useSelector(
    (state: any) => state.StoreLikedPictureData.value
  );
  //  redux writing download
  const [
    increaseDownloadCount,
    {
      data: updateDownloadCountData,
      isLoading: updateDownloadCountLoading,
      isError: updateDownloadCountError,
      error: updateDownloadCountInitial,
    },
  ] = useIncreaseDownloadCountMutation();

  // redux writing for like
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
  // use effect for like unlike loading
  useEffect(() => {
    setLikeLoading(likedLoading || UnlikedLoading);
  }, [likedLoading, UnlikedLoading]);
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
        console.log("Share was successful.");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast.error("Your browser doesn't support sharing.");
    }
  };

  // convert time format
  const formatDateTime = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // hour12: true,
    });
  };

  // copy color function
  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(""), 1500); // Reset message after 1.5s
    });
  };

  // handle download
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

  const handleLike = async () => {
    if (!user) {
      router.push("/SignIn");
      toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
      return;
    }
    if (DetailsData?._id) {
      const LikedResponse = await LikedData({
        UserId: user?._id,
        PictureId: DetailsData._id,
      }).unwrap();
      dispatch(SetPictureLikeIds(LikedResponse?.updatedData?.PictureLiked));
    }
  };

  const handleUnlike = async () => {
    if (!user) {
      router.push("/SignIn");
      toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
      return;
    }
    if (DetailsData?._id) {
      const UnLikedResponse = await UnLikedData({
        UserId: user?._id,
        PictureId: DetailsData._id,
      }).unwrap();
      dispatch(SetPictureLikeIds(UnLikedResponse?.updatedData?.PictureLiked));
    }
  };

  console.log(DetailsData);
  return (
    <div>
      <section className="lg:px-3  py-2 text-light-primary-color dark:text-dark-primary-color">
        <div className="flex max-md:mt-2 mt-5 justify-between items-center ">
          <h1 className="font-Righteous max-md:text-2xl text-4xl ">
            {DetailsData?.name}
            {/* <span className="font-BanglaHeading">
                  {Language === "BN" && "ছবির নাম"}
                </span>
                {Language === "EN" && "Image name"} */}
          </h1>
          <div className="text-3xl flex gap-x-5 cursor-pointer ">
            {likeLoading !== true && (
              <span>
                {LikedPictureData.includes(DetailsData?._id) ? (
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
                className={`${
                  LikedPictureData.includes(DetailsData?._id)
                    ? "text-pink-600"
                    : "text-white"
                } animate-spin `}
              />
            )}
            <PiShareNetworkBold onClick={handleShare} id="share" />
          </div>
        </div>
        <h2 className="font-Space mt-2 max-md:text-base text-xl">
          {/* <span className="font-BanglaSubHeading">
                    {Language === "BN" &&
                      "প্রকৃতিতে থাকা, এমনকি প্রকৃতির দৃশ্য দেখা, রাগ, ভয় এবং চাপ কমায় এবং আনন্দদায়ক অনুভূতি বৃদ্ধি করে।"}
                  </span>
                  {Language === "EN" &&
                    "Image nameBeing in nature, or even viewing scenes of nature, reduces anger, fear, and stress and increases pleasant feelings"} */}

          {DetailsData?.description}
        </h2>
      </section>
      <section className="lg:px-3  relative text-light-primary-color dark:text-dark-primary-color mt-2">
        <div className="flex flex-col gap-y-1">
          <h1 className="flex items-center gap-x-1 font-Space">
            <MdPublishedWithChanges className="text-xl" />
            <p>
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "প্রকাশিত হয়েছে :"}
              </span>
              {Language === "EN" && "Published on :"}{" "}
              {formatDateTime(DetailsData?.uploadedTime)}
            </p>
          </h1>

          <h1 className="flex items-center gap-x-1 font-Space">
            <RiCustomSize className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "রেজোলিউশন"}
              </span>{" "}
              {Language === "EN" && "Resolution"} : {DetailsData?.dimensions}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <TbCopy className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবির সাইজ"}
              </span>{" "}
              {Language === "EN" && "Picture Size"} : {DetailsData?.fileSize} mb
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <IoPersonCircle className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবি প্রণেতা"}
              </span>{" "}
              {Language === "EN" && "Author"} : {DetailsData?.author}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaMountainSun className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "জেলা"}
              </span>{" "}
              {Language === "EN" && "District"} :{" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && DetailsData?.district?.Bengali}
              </span>
              {Language === "EN" && DetailsData?.district?.English}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <BiSolidCategoryAlt className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ক্যাটাগরি "}
              </span>{" "}
              {Language === "EN" && "Categories"} :{" "}
              {DetailsData?.collections?.map((item: any) => item)}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <RiDownloadCloud2Fill className="text-xl" />
            <p>
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ডাউনলোড"}
              </span>{" "}
              {Language === "EN" && "Total downloads"} : {DetailsData?.download}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FiEye className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ভিউ"}
              </span>{" "}
              {Language === "EN" && "Total View"} : {DetailsData?.view}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaRegHeart className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট রিয়েক্ট"}
              </span>{" "}
              {Language === "EN" && "Total React"} : {DetailsData?.react}
            </p>
          </h1>
          <div className="">
            <h1 className="flex items-center gap-x-1 font-Space">
              <RiColorFilterFill className="text-xl" />
              <p className="">
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ছবির মধ্যে যে রং গুলো আছে"}
                </span>{" "}
                {Language === "EN" && "Colors Presented"} :{" "}
              </p>
            </h1>
            <div className="flex gap-x-1 ms-6">
              {DetailsData?.colors?.map((item: any) => (
                <button
                  key={item?.hex}
                  onClick={() => {
                    copyToClipboard(item?.hex);
                    toast.success(
                      Language === "EN"
                        ? "Color copied to clipboard"
                        : "রং কপি করা হয়েছে",
                      {
                        id: "copy-color",
                      }
                    );
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && copyToClipboard(item?.hex)
                  }
                  style={{ backgroundColor: item?.hex }}
                  className="w-7 rounded h-7 "
                  aria-label={`Copy color ${item?.hex}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
        {/* download button */}
        <button
          id="downloadButton"
          onClick={handleDownload}
          className="flex items-center absolute lg:right-20 right-3 max-md:scale-90  cursor-pointer top-8 max-md:top-12"
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
      </section>
    </div>
  );
};

export default PhotoDetails;
