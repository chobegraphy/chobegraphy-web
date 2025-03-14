"use client";
import FilterSearch from "@/components/PageWise/AllImg/FilterSearch";
import ImgMappingComponent from "@/components/PageWise/AllImg/ImgMappingComponent";
import Title from "@/components/PageWise/AllImg/Title";
import { useEffect, useRef, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useGetPictureDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureData/ApiSlice";


const AllImgPage = () => {
  const [limit, setLimit] = useState(19);

  const pictureQuery = useGetPictureDataQuery({ filter: "Recent", page: 1, limit });

  const { data: ImgData, isFetching, isError, error, refetch } = pictureQuery;
  const isLoading = pictureQuery.status === "pending"; // Fix for isLoading


  // Create a reference for the ImgMappingComponent
  const imgMappingRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (imgMappingRef.current) {
      const { top, bottom } = imgMappingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the bottom of the ImgMappingComponent is within the viewport
      if (bottom <= windowHeight) {
        console.log("You are at the bottom of the ImgMappingComponent");
        // Trigger any desired actions (like loading more data)
        setLimit(prevLimit => prevLimit + 19);
        refetch()
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(isLoading, isFetching)

  return (
    <>{isLoading && isFetching && !ImgData ? <div className="w-full h-dvh flex items-center justify-center absolute right-0 left-0 top-0 bottom-0  dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color  z-50">
      <ImSpinner
        className={`dark:text-white text-3xl text-light-primary-color animate-spin `}
      />

    </div> : <div className="w-full dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color xl:px-16 sm:px-10 px-5 py-10">
      {/* title component */}
      <Title />
      {/* filter search button components */}
      <FilterSearch />
      {/* ImgMappingComponent with ref */}
      <div ref={imgMappingRef}>
        <ImgMappingComponent ImgData={ImgData?.data} />
        {
          ImgData?.pictures.length >= 19 && isFetching === true && <div className="flex items-center justify-center"><ImSpinner
            className={`dark:text-white text-light-primary-color animate-spin `}
          /></div>
        }
      </div>
      {/* pagination component */}
      {/* <Pagination /> */}
    </div>}</>
  );
};

export default AllImgPage;
