import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import { useRouter, useSearchParams } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, totalPages, onPageChange, setCurrentPage }: any) => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  const router = useRouter();
  const params = useSearchParams();
  const status = params.get("status");
  const CurrentPage = params.get("CurrentPage");
  return (
    <>
      {/* page count */}
      <div className="py-10 justify-center flex gap-x-1.5 items-center">
        {/* back arrow */}
        <button onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const page = Number(CurrentPage) || 1;
          router.push(`/Dashboard/MyUploads?status=${status}&CurrentPage=${page - 1}`);
          setCurrentPage(currentPage - 1)
        }} className={`${currentPage === 1 && "hidden"} transform duration-300 border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl`}>
          <FaAngleLeft />
        </button>
        {
          [...Array(totalPages)]?.map((page, i) => (
            <button key={i + 1} onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              router.push(`/Dashboard/MyUploads?status=${status}&CurrentPage=${i + 1}`);
              setCurrentPage(i)
            }} className={`${currentPage === i + 1 ? "border-2 dark:border-dark-primary-color border-light-primary-color dark:text-light-primary-color font-Righteous text-light-primary-color dark: bg-dark-primary-color p-2 rounded-xl" : "border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color font-Righteous dark:text-dark-primary-color dark:hover:bg-dark-primary-color hover:bg-light-primary-color w-3.5 h-3.5 rounded-xl "}`}>
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
        <button onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const page = Number(CurrentPage) || 1;
          router.push(`/Dashboard/MyUploads?status=${status}&CurrentPage=${page + 1}`);
          setCurrentPage(currentPage + 1)
        }}
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
