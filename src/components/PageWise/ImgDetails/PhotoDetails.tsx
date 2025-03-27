import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { MdPublishedWithChanges } from "react-icons/md";
import {
  RiColorFilterFill,
  RiCustomSize,
  RiDownloadCloud2Fill,
} from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { TbCopy } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useIncreaseDownloadCountMutation } from "../../../../Redux/Features/Apis/UpdateDownloadCount/ApiSlice";

const PhotoDetails = ({ DetailsData, setDetailsData }: any) => {

  // states
  const [copiedColor, setCopiedColor] = useState("");

  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
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
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const handleDownload = async () => {
    if (!downloadSuccess && !downloadError && !downloading) {
      if (!DetailsData?.url) {
        toast.error("Image URL not found!");
        return;
      }
      setDownloading(true);


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
        setDownloadSuccess(true);
        setDownloading(false);
        setTimeout(() => setDownloadSuccess(false), 2500);
      } catch (error) {
        setDownloading(false);
        setDownloadError(true);
        setTimeout(() => setDownloadError(false), 2500);
        console.error("Download Error:", error);
      }
    }

  };


  return (
    <div>
      <section className="lg:px-3  py-2 text-light-primary-color dark:text-dark-primary-color">

        <h2 className="font-Space mt-2 max-md:text-base text-xl">
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
              <span className="font-BanglaSubHeading">
                {Language === "BN" && convertToBanglaNum(formatDateTime(DetailsData?.uploadedTime))}
              </span>
              {Language === "EN" && formatDateTime(DetailsData?.uploadedTime)}

            </p>
          </h1>

          <h1 className="flex items-center gap-x-1 font-Space">
            <RiCustomSize className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "রেজোলিউশন"}
              </span>{" "}
              {Language === "EN" && "Resolution"} : <span className="font-BanglaSubHeading">
                {Language === "BN" && convertToBanglaNum(DetailsData?.dimensions)}
              </span>
              {Language === "EN" && DetailsData?.dimensions}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <TbCopy className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবির সাইজ"}
              </span>{" "}
              {Language === "EN" && "Picture Size"} : <span className="font-BanglaSubHeading">
                {Language === "BN" && convertToBanglaNum((DetailsData?.fileSize))}
              </span>
              {Language === "EN" && (DetailsData?.uploadedTime)} mb
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
                {Language === "BN" && DetailsData?.district?.bn_name}
              </span>
              {Language === "EN" && DetailsData?.district?.name}
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
              {DetailsData?.collections?.map((item: any) => <span key={item?.value}>{Language === "EN" && item?.label + ", "}<span className="font-BanglaSubHeading">
                {Language === "BN" && <>{item?.value} ,</>}
              </span></span>)}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <RiDownloadCloud2Fill className="text-xl" />
            <p>
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ডাউনলোড"}
              </span>{" "}
              {Language === "EN" && "Total downloads"} :  <span className="font-BanglaSubHeading">
                {Language === "BN" && convertToBanglaNum((DetailsData?.download))}
              </span>
              {Language === "EN" && (DetailsData?.download)}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FiEye className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ভিউ"}
              </span>{" "}
              {Language === "EN" && "Total View"} :  <span className="font-BanglaSubHeading">
                {Language === "BN" && convertToBanglaNum((DetailsData?.view))}
              </span>
              {Language === "EN" && (DetailsData?.view)}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaRegHeart className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট রিয়েক্ট"}
              </span>{" "}
              {Language === "EN" && "Total React"} :  <span className="font-BanglaSubHeading">
                {Language === "BN" && convertToBanglaNum((DetailsData?.react))}
              </span>
              {Language === "EN" && (DetailsData?.react)}
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
        <button id="downloadButton2"
          onClick={handleDownload} className="flex items-center lg:hidden lg:right-20 right-3 max-lg:scale-90  cursor-pointer max-lg:fixed  max-lg:bg-light-primary-color
        max-lg:text-dark-primary-color max-lg:dark:bg-dark-primary-color max-lg:dark:text-light-primary-color h-[70px] max-lg:w-full justify-center max-lg:right-0  max-lg:rounded-xl lg:top-0 gap-x-2 max-lg:bottom-2 max-lg:py-4 z-30"
        >
          {
            !downloadSuccess && !downloadError && !downloading && <svg
              className="w-10"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2785 20.3364L15.003 25M15.003 25L19.7275 20.3364M15.003 25V14.5068M25.4914 21.6072C26.5183 20.8944 27.2883 19.8772 27.6898 18.7031C28.0913 17.529 28.1033 16.2592 27.7242 15.0779C27.345 13.8966 26.5944 12.8653 25.5812 12.1337C24.5681 11.402 23.3451 11.0081 22.0897 11.0091H20.6015C20.2463 9.64246 19.5816 8.37322 18.6575 7.29689C17.7335 6.22055 16.5741 5.36518 15.2666 4.79516C13.9592 4.22514 12.5378 3.95532 11.1094 4.00603C9.68107 4.05673 8.28298 4.42663 7.0204 5.08789C5.75783 5.74914 4.66367 6.68451 3.8203 7.82359C2.97693 8.96266 2.40633 10.2758 2.15145 11.664C1.89658 13.0523 1.96407 14.4795 2.34884 15.8383C2.73362 17.1971 3.42565 18.452 4.37284 19.5086"
                className="dark:stroke-light-primary-color stroke-dark-primary-color"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          {
            !downloadSuccess && !downloadError && downloading && <ImSpinner
              className={`text-xl animate-spin `}
            />}
          {
            downloadSuccess && !downloadError && !downloading && <SiTicktick
              className={`text-xl  `}
            />}
          {
            !downloadSuccess && downloadError && !downloading && <VscError
              className={`text-xl  `}
            />}
          {
            !downloadSuccess && !downloadError && !downloading && <span className="max-lg:block hidden">
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" && "ছবি ডাউনলোড করুন"}
              </p>
              {Language === "EN" && <span className="font-Righteous text-xl">Download Picture</span>}
            </span>
          }
          {
            !downloadSuccess && !downloadError && downloading && <span className="max-lg:block hidden">
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" && "ছবি ডাউনলোড করা হচ্ছে"}
              </p>
              {Language === "EN" && <span className="font-Righteous text-xl">Downloading Picture</span>}
            </span>
          }
          {
            downloadSuccess && !downloadError && !downloading && <span className="max-lg:block hidden">
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" && "ছবি ডাউনলোড করা হয়েছে"}
              </p>
              {Language === "EN" && <span className="font-Righteous text-xl">Picture Downloaded</span>}
            </span>
          }
          {
            !downloadSuccess && downloadError && !downloading && <span className="max-lg:block hidden">
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" && "ছবি ডাউনলোড করা যায়নি"}
              </p>
              {Language === "EN" && <span className="font-Righteous text-xl">Picture Downloading Failed</span>}
            </span>
          }

        </button>
        <button
          id="downloadButton"
          onClick={handleDownload}
          className="flex items-center max-lg:hidden absolute lg:right-20 right-3 max-md:scale-90  cursor-pointer top-8 max-md:top-12"
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
      <Link href={`/ViewImgProfile?AuthorMail=${DetailsData?.author?.email}&status=About%20Me&CurrentPage=1`} className="flex  items-center ms-1.5 lg:ms-3 w-fit  gap-x-1 font-Righteous mt-3 ">

        <img className="w-10 border-2 border-light-secondary-color h-10 rounded-2xl  -ms-2 " src={DetailsData?.author?.picture} alt="" width={500} height={500} loading="lazy" />
        {DetailsData?.author?.name}
      </Link>
    </div>
  );
};

export default PhotoDetails;
