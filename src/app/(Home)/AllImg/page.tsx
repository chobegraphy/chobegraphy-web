"use client";
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



  const { data, isFetching, isError, error, refetch } = useGetPictureDataQuery({
    filter: filter || "recent",
    page: currentPage,
    limit,
  });
  const [ImgData, setImgData] = useState([]);
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
    if (data) {
      setImgData(data.data);
      setLoading(false); // Stop loading when data is available
    }
  }, [data]); // When ImgData changes, stop the loading state

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
        {isFetching && !isLoading && !ImgData ? (
          <div className="w-full my-10 h-dvh flex items-center justify-center absolute right-0 left-0 top-0 bottom-0 dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color z-50">
            <ImSpinner className="dark:text-white text-4xl text-light-primary-color animate-spin" />
          </div>
        ) : (
          <div className="w-full dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color xl:px-16 sm:px-10 px-5 py-10">


            {/* title component */}
            <Title />
            {/* filter search button components */}
            {/* <FilterSearch /> */}
            {/* ImgMappingComponent with ref */}
            <div

            >
              {!isLoading && <ImgMappingComponent ImgData={ImgData} />}
              {(!ImgData || isFetching) && (
                <div className="flex  my-10 items-center justify-center">
                  <ImSpinner className="dark:text-white text-4xl text-light-primary-color animate-spin" />
                </div>
              )}
            </div>

            {/* pagination component */}
            {!isLoading && <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // Pass totalPages to Pagination component
              setCurrentPage={setCurrentPage}
              onPageChange={handlePageChange}
            />}
          </div>
        )}
      </div>
    </>
  );
};

export default AllImgPage;
