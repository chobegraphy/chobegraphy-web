import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
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

const PhotoDetails = ({ DetailsData }: any) => {
  // states
  const [copiedColor, setCopiedColor] = useState("");
  // redux writing
  const dispatch = useDispatch();
  const Language = useSelector((state: any) => state.Language.value);

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
  return (
    <div>
      <section className="lg:px-3 py-2 text-light-primary-color dark:text-dark-primary-color">
        <div className="flex max-md:mt-2 mt-5 justify-between items-center ">
          <h1 className="font-Righteous max-md:text-2xl text-4xl ">
            {DetailsData?.name}
            {/* <span className="font-BanglaHeading">
                  {Language === "BN" && "ছবির নাম"}
                </span>
                {Language === "EN" && "Image name"} */}
          </h1>
          <div className="text-3xl flex gap-x-5 cursor-pointer ">
            <FaRegHeart />
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
      <section className="lg:px-3 text-light-primary-color dark:text-dark-primary-color mt-2">
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
      </section>
    </div>
  );
};

export default PhotoDetails;
