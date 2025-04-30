"use client";
import "aos/dist/aos.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Masonry from "react-masonry-css";
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
    limit: window.innerWidth > 1024 ? 30 : 30,
    collection: "All",
  });

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
  const breakpointColumnsObj = {
    default: 5, // 5 columns on large screens
    1280: 5,    // 4 columns for screens >= 1280px
    1024: 4,    // 3 columns for screens >= 1024px
    768: 3,     // 2 columns for tablets
    640: 2,      // 1 column for small screens
    300: 1,
  };
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

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-2 mt-10"
          columnClassName="masonry-column"
        >          {RecentImgData?.map((imgInfo: any, index: number) => (
          <div
            key={imgInfo?._id}
            className="mb-2 break-inside-avoid"
          >
            <ImgCard imgData={imgInfo} i={index} />
          </div>
        ))}
        </Masonry>
        <Link href={"/AllImg?filter=recent&CurrentPage=1&collection=All"}>
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
    </section >
  );
};

export default RecentImg;
