import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import useAuthData from "@/ExportedFunctions/useAuthData";
import { ZillaData } from "@/ExportedFunctions/ZillaData";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdPublishedWithChanges } from "react-icons/md";
import {
  RiColorFilterFill,
  RiCustomSize,
  RiDownloadCloud2Fill,
} from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { useSelector } from "react-redux";
const PhotoDetails = ({ setDistrict1, district, setDistrict, download, view, react, register, DetailsData, setDescription, uploadedTime, colors, dimensions, fileSize, onSubmit, }: any) => {
  // auth data
  const { user } = useAuthData();
  const router = useRouter(); // Initialize router
  const { theme } = useTheme()

  const zillaDatas = (ZillaData);
  const [filteredZilla, setFilteredZilla] = useState(zillaDatas);

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





  return (
    <div>
      <section className="  py-2 text-light-primary-color dark:text-dark-primary-color">

        <div className="font-Space relative mt-2 max-md:text-base ">
          <p style={{ border: `2px solid ${colors.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
            <span className="font-BanglaSubHeading">
              {Language === "BN" && "ক্যাপশন"}
            </span>{" "}
            {Language === "EN" && "Caption"} :{" "}
          </p>
          <textarea id="description" style={{ border: `2px solid ${colors.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}`, caretColor: colors.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000" }} onChange={(e) =>
            setDescription(e.target.value)
          } onPaste={(e) => setDescription(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `}></textarea>
        </div>
      </section>
      <section className="  relative text-light-primary-color dark:text-dark-primary-color mt-2">
        <h1 className="flex items-center gap-x-1 font-Space">
          <MdPublishedWithChanges className="text-xl" />
          <p>
            <span className="font-BanglaSubHeading">
              {Language === "BN" && "প্রকাশিত সময় :"}
            </span>
            {Language === "EN" && "Publishing on :"}{" "}

            <span className="font-BanglaSubHeading text-lg">{Language === "BN" && convertToBanglaNum(formatDateTime(uploadedTime))}</span>{Language === "EN" && formatDateTime(uploadedTime)}
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
              {Language === "EN" && "Resolution"} : <span className="font-BanglaSubHeading text-lg">{Language === "BN" && convertToBanglaNum(dimensions)}</span>{Language === "EN" && dimensions}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <TbCopy className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবির সাইজ"}
              </span>{" "}
              {Language === "EN" && "Picture Size"} : <span className="font-BanglaSubHeading text-lg">{Language === "BN" && convertToBanglaNum(fileSize)}</span>{Language === "EN" && fileSize} mb
            </p>
          </h1>

          <h1
            onBlur={() => {

              setShowDropdown(false);
            }}
            className="flex mt-3 relative flex-col items-start gap-x-1 transform  duration-300 font-Space">
            <p style={{ border: `2px solid ${colors.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "জেলা সিলেক্ট করুন"}
              </span>{" "}
              {Language === "EN" && "Select District"} :{" "}
            </p> <input style={{ border: `2px solid ${colors.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}`, caretColor: colors.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000" }} id="district" value={district !== "" ? district : ""}
              onChange={handleDistrictChange}
              onFocus={() => {
                if (!zillaDatas.some(z => z.name.toLowerCase() === district.toLowerCase())) {
                  setShowDropdown(true);
                }
              }}

              className={`${showDropdown && filteredZilla.length > 0 ? "border rounded-xl   rounded-b-none" : "border rounded-xl "} border dark:border-light-secondary-color border-light-secondary-color  outline-none  bg-transparent w-full px-3 py-3 pt-4`} />
            <ul style={{ borderTop: "none", border: `2px solid ${showDropdown && filteredZilla.length > 0 ? colors[1]?.hex : colors[1]?.hex}` }} className={`${showDropdown && filteredZilla.length > 0 ? "border  rounded-xl  rounded-t-none border-t-0 h-full opacity-100 z-10" : " rounded-xl h-0 opacity-0 -z-20"}  border   rounded-xl transform duration-300 max-h-52 w-full border-light-secondary-color  overflow-y-scroll example`}>
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
                  {zilla.name} / <span className="font-BanglaSubHeading">{zilla.bn_name}</span>
                </li>
              ))}
            </ul>
            <ul>{filteredZilla.length === 0 && (
              <li className="px-3 py-2 cursor-pointer">

                No district found
              </li>)}</ul>
          </h1>


          <h1 className="flex items-center gap-x-1 font-Space">
            <RiDownloadCloud2Fill className="text-xl" />
            <p>
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ডাউনলোড"}
              </span>{" "}
              {Language === "EN" && "Total downloads"} : <span className="font-BanglaSubHeading text-lg">{Language === "BN" && convertToBanglaNum(download)}</span>{Language === "EN" && download}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FiEye className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ভিউ"}
              </span>{" "}
              {Language === "EN" && "Total View"} : <span className="font-BanglaSubHeading text-lg">{Language === "BN" && convertToBanglaNum(view)}</span>{Language === "EN" && view}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaRegHeart className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট রিয়েক্ট"}
              </span>{" "}
              {Language === "EN" && "Total React"} : <span className="font-BanglaSubHeading text-lg">{Language === "BN" && convertToBanglaNum(react)}</span>{Language === "EN" && react}
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

        {/* upload button */}
        <button id="uploadPicture" onClick={() => onSubmit()} className="flex items-center lg:hidden lg:right-20 right-3 max-lg:scale-90  cursor-pointer max-lg:fixed  max-lg:bg-light-primary-color
        max-lg:text-dark-primary-color max-lg:dark:bg-dark-primary-color max-lg:dark:text-light-primary-color max-md:h-fit max-lg:w-full justify-center max-lg:right-0  max-lg:rounded-xl lg:top-0 gap-x-2 max-lg:bottom-2 max-lg:py-4 z-30"
        ><svg className="w-14  h-14 max-md:w-10 max-md:h-10" viewBox="0 0 73 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.1366 14.7458L36.2288 14.7733L36.2328 14.7688C36.6705 14.8481 37.1047 14.586 37.2332 14.1519C38.4049 10.2152 42.096 7.46504 46.2084 7.46504C46.6953 7.46504 47.0901 7.07016 47.0901 6.5833C47.0901 6.09643 46.6952 5.70156 46.2084 5.70156C41.1542 5.70156 36.9071 9.06665 35.5433 13.6493C35.4042 14.1162 35.6701 14.6067 36.1366 14.7458Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
            <path d="M56.4523 42.4384H52.062C51.658 42.4384 51.3302 42.1107 51.3302 41.7067C51.3302 41.3027 51.6579 40.9749 52.062 40.9749H56.4523C62.5042 40.9749 67.4283 36.0509 67.4283 29.999C67.4283 23.9471 62.5042 19.023 56.4523 19.023H56.3467C56.1345 19.023 55.9328 18.9311 55.7937 18.7706C55.6547 18.6101 55.592 18.3974 55.6223 18.1873C55.6877 17.7315 55.7206 17.2737 55.7206 16.8279C55.7206 11.5829 51.4529 7.31531 46.208 7.31531C44.1675 7.31531 42.2216 7.95296 40.5804 9.15978C40.2198 9.42478 39.7076 9.30718 39.499 8.91047C34.851 0.0596993 22.7108 -1.12887 16.4168 6.57053C13.7653 9.81417 12.7236 14.0336 13.5583 18.146C13.6503 18.6002 13.3028 19.0236 12.8412 19.0236H12.548C6.49615 19.0236 1.57208 23.9477 1.57208 29.9996C1.57208 36.0514 6.49615 40.9755 12.548 40.9755H16.9384C17.3424 40.9755 17.6701 41.3032 17.6701 41.7072C17.6701 42.1113 17.3424 42.439 16.9384 42.439H12.548C5.68905 42.439 0.108551 36.8585 0.108551 29.9995C0.108551 23.3329 5.3801 17.8742 11.9736 17.5731C11.3543 13.3066 12.5386 9.00295 15.2836 5.64437C22.0223 -2.5996 34.9365 -1.67556 40.3957 7.51707C42.1372 6.42522 44.1301 5.85244 46.2078 5.85244C52.5623 5.85244 57.5977 11.261 57.1571 17.58C63.6899 17.9463 68.8915 23.3763 68.8915 29.999C68.8915 36.8585 63.311 42.4384 56.452 42.4384L56.4523 42.4384Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
            <path d="M15.9586 41.2935C15.9586 51.4634 24.2322 59.737 34.402 59.737C44.572 59.737 52.8455 51.4633 52.8455 41.2935C52.8455 31.1235 44.572 22.85 34.402 22.85C24.2321 22.85 15.9586 31.1237 15.9586 41.2935ZM17.7224 41.2935C17.7224 32.0966 25.205 24.6138 34.402 24.6138C43.5989 24.6138 51.0817 32.0964 51.0817 41.2935C51.0817 50.4904 43.5989 57.9732 34.402 57.9732C25.2051 57.9732 17.7224 50.4905 17.7224 41.2935Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
            <path d="M34.0513 48.6577C34.0513 49.0363 34.3584 49.3434 34.737 49.3434C35.1156 49.3434 35.4227 49.0367 35.4227 48.6577V34.7291C35.4227 34.3504 35.1157 34.0434 34.737 34.0434C34.3584 34.0434 34.0513 34.3504 34.0513 34.7291V48.6577Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="1" />
            <path d="M34.7367 35.7002L30.936 39.5008L34.7367 35.7002ZM34.7367 35.7002L38.5374 39.5009C38.6711 39.6347 38.8472 39.7018 39.0223 39.7018L34.7367 35.7002ZM29.9661 39.5009C30.2339 39.7687 30.6683 39.7689 30.9359 39.5009L39.0223 39.7018C39.1971 39.7018 39.3733 39.6352 39.5072 39.5009C39.7751 39.233 39.775 38.799 39.5072 38.5312L35.2215 34.2455C34.9537 33.9777 34.5193 33.9776 34.2517 34.2455C34.2517 34.2456 34.2517 34.2456 34.2517 34.2456L29.9661 38.5312C29.6982 38.799 29.6982 39.2331 29.9661 39.5009Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="1" />
          </svg>
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
