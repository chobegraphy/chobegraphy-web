import useAuthData from "@/ExportedFunctions/useAuthData";
import { ZillaData } from "@/ExportedFunctions/ZillaData";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useSelector } from "react-redux";
const PhotoDetails = ({ setDistrict1, download, view, react, register, DetailsData, uploadedTime, setDetailsData, colors, dimensions, fileSize }: any) => {
  // auth data
  const { user } = useAuthData();
  const router = useRouter(); // Initialize router


  const zillaDatas = (ZillaData);
  const [filteredZilla, setFilteredZilla] = useState(zillaDatas);
  const [district, setDistrict] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);



  const handleDistrictChange = (e: any) => {

    const value = e.target.value;
    setDistrict(value);
    const matchedZillas = zillaDatas.filter(
      (z) =>
        z.name.toLowerCase().includes(value.toLowerCase()) ||
        z.bn_name.includes(value)
    );
    setFilteredZilla(matchedZillas);
    setShowDropdown(matchedZillas.length > 1 || (matchedZillas.length === 1 && matchedZillas[0].name.toLowerCase() !== value.toLowerCase()));
    console.log(filteredZilla)
  };

  const handleSelectDistrict = (selectedDistrict: any) => {
    setDistrict(selectedDistrict);

    setShowDropdown(false);
  };

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




  console.log(DetailsData);
  return (
    <div>
      <section className="lg:px-3  py-2 text-light-primary-color dark:text-dark-primary-color">
        <div className="flex max-md:mt-2 mt-5 w-full items-center ">
          <h1 className="font-Righteous max-md:text-2xl text-xl w-full  ">

            <input {...register("name", { required: true })} placeholder={Language === "BN" ? "ছবির নাম" : "Image name"} className="px-5 rounded-2xl outline-none py-2 border-2 border-light-secondary-color w-full" type="text" />

          </h1>

        </div>
        <div className="font-Space mt-2 max-md:text-base text-xl">
          <textarea {...register("description", { required: true })} placeholder={Language === "EN" ? "Description" : "বর্ণনা"} className="p-5 w-full outline-none rounded-3xl border-2 border-light-secondary-color"></textarea>
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
            <p className="flex mt-1 mb-1 gap-x-0.5 items-center">
              <IoPersonCircle className="text-xl" />
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবি প্রণেতা"}
              </span>{" "}
              {Language === "EN" && "Author"} :
            </p> <input type="text" className="border-2 border-light-secondary-color rounded-xl outline-none w-full border-dashed px-3 py-2" />
          </h1>
          <h1
            onBlur={() => {

              setShowDropdown(false);
            }}
            className="flex flex-col items-start gap-x-1 transform  duration-300 font-Space">
            <p className="flex mt-2 mb-1 gap-x-0.5 items-center">
              <FaMountainSun className="text-xl" />
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "জেলা"}
              </span>{" "}
              {Language === "EN" && "District"} :{" "}
            </p> <input value={district}

              onChange={handleDistrictChange}
              onFocus={() => {
                if (!zillaDatas.some(z => z.name.toLowerCase() === district.toLowerCase())) {
                  setShowDropdown(true);
                }
              }}

              className={`${showDropdown && filteredZilla.length > 0 ? "border-2  rounded-xl  rounded-b-none" : "border-2 rounded-xl"} border-dashed border-light-secondary-color  outline-none w-full px-3 py-2`} />
            <ul className={`${showDropdown && filteredZilla.length > 0 ? "border-2  rounded-xl border-dashed rounded-t-none border-t-0 h-full opacity-100 z-10" : "border-2 rounded-xl h-0 opacity-0 -z-20"}     rounded-xl transform duration-300 max-h-52 w-full border-2 border-light-secondary-color  overflow-y-scroll example`}>
              {filteredZilla.map((zilla: any) => (
                <li
                  key={zilla.id}
                  onClick={() => {
                    setDistrict1(zilla);
                    handleSelectDistrict(zilla.name)
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-light-primary-color dark:hover:bg-dark-primary-color
                    hover:text-dark-primary-color dark:hover:text-light-primary-color"
                >
                  {zilla.name} ({zilla.bn_name})
                </li>
              ))}
            </ul>
            <ul>{filteredZilla.length === 0 && (
              <li className="px-3 py-2 cursor-pointer">

                No district found
              </li>)}</ul>
          </h1>

          <h1 className="flex items-center gap-x-1 font-Space mt-1">
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
              {Language === "EN" && "Total downloads"} : {download}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FiEye className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ভিউ"}
              </span>{" "}
              {Language === "EN" && "Total View"} : {view}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaRegHeart className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট রিয়েক্ট"}
              </span>{" "}
              {Language === "EN" && "Total React"} : {react}
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
        <button className="flex items-center lg:absolute lg:right-20 right-3 max-lg:scale-90  cursor-pointer max-lg:fixed  max-lg:bg-light-primary-color
        max-lg:text-dark-primary-color max-lg:dark:bg-dark-primary-color max-lg:dark:text-light-primary-color max-md:h-fit max-lg:w-full justify-center max-lg:right-0  max-lg:rounded-xl lg:top-0 gap-x-2 max-lg:bottom-2 max-lg:py-4 z-30"
        ><SlCloudUpload className="text-8xl max-lg:text-4xl" />
          <span className="max-lg:block hidden">
            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
              {Language === "BN" && "ছবি আপলোড করুন"}
            </p>
            {Language === "EN" && <span className="font-Righteous text-xl">Upload Picture</span>}
          </span>

        </button>
      </section>
    </div>
  );
};

export default PhotoDetails;
