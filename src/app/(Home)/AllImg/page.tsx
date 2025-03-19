"use client";
import FilterSearch from "@/components/PageWise/AllImg/FilterSearch";
import ImgMappingComponent from "@/components/PageWise/AllImg/ImgMappingComponent";
import Pagination from "@/components/PageWise/AllImg/Pagination";
import Title from "@/components/PageWise/AllImg/Title";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useGetImgCountQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetImgCount/ApiSlice";
import { useGetPictureDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureData/ApiSlice";

const AllImgPage = () => {
  const params = useSearchParams();
  const filter = params.get("filter");
  const [limit] = useState(window.innerWidth > 1024 ? 20 : 15);
  const ParamsCurrentPage = params.get("CurrentPage");
  const [currentPage, setCurrentPage] = useState(parseInt(ParamsCurrentPage || "1"));
  const [loading, setLoading] = useState(false); // To manage the loading state manually


  console.log(ParamsCurrentPage);
  const { data: ImgData, isFetching, isError, error, refetch } = useGetPictureDataQuery({
    filter: filter || "recent",
    page: currentPage,
    limit,
  });
  const { data: imgCount } = useGetImgCountQuery({});

  const isLoading = isFetching;

  // Calculate total pages based on the total data count and limit
  const totalPages = imgCount ? Math.ceil(imgCount.totalDataCount / limit) : 1;

  // Update the page when pagination changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setLoading(true); // Start loading when changing pages
  };

  useEffect(() => {
    window.history.pushState({}, '', `/AllImg?filter=${filter}&CurrentPage=${currentPage}`);
    if (ImgData) {
      setLoading(false); // Stop loading when data is available
    }
  }, [ImgData]); // When ImgData changes, stop the loading state

  useEffect(() => {
    if (currentPage) {

      refetch();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, refetch]);
  useEffect(() => {
    const pageFromUrl = params.get("CurrentPage");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
    }
  }, [params]);


  return (
    <>
      {/* Fade-in fade-out effect on the page content */}
      <div

      >
        {isLoading && !ImgData ? (
          <div className="w-full h-dvh flex items-center justify-center absolute right-0 left-0 top-0 bottom-0 dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color z-50">
            <ImSpinner className="dark:text-white text-3xl text-light-primary-color animate-spin" />
          </div>
        ) : (
          <div className="w-full dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color xl:px-16 sm:px-10 px-5 py-10">


            {/* title component */}
            <Title />
            {/* filter search button components */}
            <FilterSearch />
            {/* ImgMappingComponent with ref */}
            <div

            >
              <ImgMappingComponent ImgData={ImgData?.data} />
              {ImgData?.data.length >= 19 && isFetching === true && (
                <div className="flex items-center justify-center">
                  <ImSpinner className="dark:text-white text-light-primary-color animate-spin" />
                </div>
              )}
            </div>

            {/* pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // Pass totalPages to Pagination component
              setCurrentPage={setCurrentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AllImgPage;
