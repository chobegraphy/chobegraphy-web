"use client";
import FilterSearch from "@/components/PageWise/AllImg/FilterSearch";
import Gallery from "@/components/PageWise/AllImg/Gallery";
import Pagination from "@/components/PageWise/AllImg/Pagination";
import Title from "@/components/PageWise/AllImg/Title";
const AllImgPage = () => {
  return (
    <div className="w-full dark:bg-light-primary-color bg-dark-primary-color xl:px-16 sm:px-10 px-5 py-10">
      {/* title component */}
      <Title />
      {/* filter search button components */}
      <FilterSearch />
      {/* gallery or img component */}
      <Gallery />
      {/* pagination component */}
      <Pagination />
    </div>
  );
};

export default AllImgPage;
