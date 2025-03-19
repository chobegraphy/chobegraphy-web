"use client";
import "aos/dist/aos.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetPictureDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureData/ApiSlice";
import ImgCard from "./Imgcard";
const RecentImg = () => {
  const pathName = usePathname();
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  // Fetch data using the RTK Query hook
  const { data, error, isLoading, refetch } = useGetPictureDataQuery({
    filter: "recent",
    page: 1,
    limit: window.innerWidth > 1024 ? 20 : 15,
  });
  console.log(data);
  const [RecentImgData, setRecentImgData] = useState([]);
  const [hovered, SetHovered] = useState(false);
  const [hovered2, SetHovered2] = useState(false);
  useEffect(() => {
    if (data) {
      setRecentImgData(data.data);
    }
  }, [data, pathName]);
  useEffect(() => {
    refetch()
  }, [pathName])

  return (
    <section className="w-full  dark:bg-light-primary-color bg-dark-primary-color ">

      <div className="max-w-7xl xl:px-16 sm:px-10 px-5 pt-10 pb-20 w-full mx-auto"><h1
        id="title"
        className="font-Righteous text-5xl max-xl:text-3xl text-center text-black dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
          {Language === "BN" && "সাম্প্রতিক আপলোড"}
        </p>
        <p>{Language === "EN" && "Recent Uploads"}</p>
      </h1>
        <h1
          id="title2"
          className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
        >
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" &&
              "ছবি সেটা নয় যা তুমি দেখো, ছবি সেটা যা তুমি অন্যদের দেখাও।"}
          </p>
          <p>
            {Language === "EN" &&
              "Picture is not what you see, but what you make others see"}
          </p>
        </h1>

        <div className="my-10 max-sm:columns-2 max-md:columns-3 max-lg:columns-3 overflow-hidden xl:columns-5 max-xl:columns-4 gap-2 justify-center w-full ">
          {RecentImgData?.map((imgInfo: any, index: any) => (
            <div key={imgInfo?._id} className="relative ">
              <ImgCard setRecentImgData={setRecentImgData} RecentImgData={RecentImgData} imgData={imgInfo} i={index} />
            </div>
          ))}
        </div>
        <Link href={"/AllImg?filter=recent&CurrentPage=1"}>
          <button
            className={
              "border-2 py-3 mt-6 px-6 mx-auto xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:hover:bg-dark-primary-color/40   dark:hover:text-dark-primary-color transform duration-300 rounded-xl flex items-center font-Righteous gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
            }
          >
            <span>
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" ? "সব দেখুন" : "View ALl"}
              </p>
            </span>
          </button>
        </Link></div>
    </section>
  );
};

export default RecentImg;
