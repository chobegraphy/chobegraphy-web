import useAuthData from "@/ExportedFunctions/useAuthData";
import { useRouter } from "next/navigation";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import { MdPublishedWithChanges } from "react-icons/md";
import {
  RiColorFilterFill,
  RiCustomSize,
  RiDownloadCloud2Fill,
} from "react-icons/ri";
import { SlCloudUpload } from "react-icons/sl";
import { TbCopy } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
const PhotoDetails = ({ DetailsData, uploadedTime, setDetailsData, colors, dimensions, fileSize }: any) => {
  // auth data
  const { user } = useAuthData();
  const router = useRouter(); // Initialize router



  // redux writing
  const dispatch = useDispatch();
  const Language = useSelector((state: any) => state.Language.value);


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


  // handle download




  console.log(DetailsData);
  return (
    <div>
      <section className="lg:px-3  py-2 text-light-primary-color dark:text-dark-primary-color">
        <div className="flex max-md:mt-2 mt-5 w-full items-center ">
          <h1 className="font-Righteous max-md:text-2xl text-xl w-full  ">

            <input placeholder={Language === "BN" ? "ছবির নাম" : "Image name"} className="px-5 rounded-2xl outline-none py-2 border-2 border-light-secondary-color w-full" type="text" />

          </h1>

        </div>
        <div className="font-Space mt-2 max-md:text-base text-xl">
          <textarea placeholder={Language === "EN" ? "Description" : "বর্ণনা"} className="p-5 w-full outline-none rounded-3xl border-2 border-light-secondary-color"></textarea>
        </div>
      </section>
      <section className="lg:px-3  relative text-light-primary-color dark:text-dark-primary-color mt-2">
        <h1 className="flex items-center gap-x-1 font-Space">
          <MdPublishedWithChanges className="text-xl" />
          <p>
            <span className="font-BanglaSubHeading">
              {Language === "BN" && "প্রকাশিত সময় :"}
            </span>
            {Language === "EN" && "Publishing on :"}{" "}
            {formatDateTime(uploadedTime)}
          </p>
        </h1>
        <div className="flex flex-col gap-y-1">

          <h1 className="flex items-center gap-x-1 font-Space">
            <RiCustomSize className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "রেজোলিউশন"}
              </span>{" "}
              {Language === "EN" && "Resolution"} : {dimensions}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <TbCopy className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবির সাইজ"}
              </span>{" "}
              {Language === "EN" && "Picture Size"} : {fileSize} mb
            </p>
          </h1>
          {/* picture author */}
          <h1 className="flex flex-col items-start gap-x-1 font-Space">
            <p className="flex  gap-x-0.5 items-center">
              <IoPersonCircle className="text-xl" />
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবি প্রণেতা"}
              </span>{" "}
              {Language === "EN" && "Author"} :
            </p> <input type="text" className="border-2 border-light-secondary-color rounded-xl outline-none px-3 py-2" />
          </h1>
          <h1 className="flex flex-col items-start gap-x-1 font-Space">
            <p className="flex  gap-x-0.5 items-center">
              <FaMountainSun className="text-xl" />
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "জেলা"}
              </span>{" "}
              {Language === "EN" && "District"} :{" "}
            </p> <input type="text" className="border-2 border-light-secondary-color rounded-xl outline-none px-3 py-2" />
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
              {Language === "EN" && "Total downloads"} :
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FiEye className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ভিউ"}
              </span>{" "}
              {Language === "EN" && "Total View"} :
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaRegHeart className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট রিয়েক্ট"}
              </span>{" "}
              {Language === "EN" && "Total React"} :
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
              {colors?.map((item: any) => (
                <button
                  key={item?.hex}
                  type="button"
                  style={{ backgroundColor: item?.hex }}
                  className="w-7 rounded h-7 "
                  aria-label={`Copy color ${item?.hex}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
        {/* download button */}
        <button type="submit"
          className="flex items-center absolute lg:right-20 right-3 max-md:scale-90  cursor-pointer top-8 max-md:top-12"
        ><SlCloudUpload className="text-8xl" />

          {/* <span className="font-Righteous text-xl">Download</span> */}
        </button>
      </section>
    </div>
  );
};

export default PhotoDetails;
