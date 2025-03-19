import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, totalPages, onPageChange, setCurrentPage }: any) => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <>
      {/* page count */}
      <div className="py-10 justify-center flex gap-x-1.5 items-center">
        {/* back arrow */}
        <button onClick={() => setCurrentPage(currentPage - 1)} className={`${currentPage === 1 && "hidden"} transform duration-300 border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl`}>
          <FaAngleLeft />
        </button>
        {
          [...Array(totalPages)]?.map((page, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`${currentPage === i + 1 ? "border-2 dark:border-dark-primary-color border-light-primary-color dark:text-light-primary-color font-Righteous text-light-primary-color dark: bg-dark-primary-color p-2 rounded-xl" : "border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color font-Righteous dark:text-dark-primary-color dark:hover:bg-dark-primary-color hover:bg-light-primary-color w-3.5 h-3.5 rounded-xl "}`}>
              {
                i + 1 === currentPage && <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                  {Language === "BN" && convertToBanglaNum(i + 1)}
                </p>
              }
              <p>{Language === "EN" && i + 1 === currentPage && i + 1}</p>

            </button>
          ))
        }


        {/* forward arrow */}
        <button onClick={() => setCurrentPage(currentPage + 1)}
          className={`border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color
        hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl ${currentPage === totalPages && "hidden"}`}
        >
          <FaAngleRight />
        </button>
      </div>
    </>
  );
};

export default Pagination;
