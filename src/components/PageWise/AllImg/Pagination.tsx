import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <>
      {/* page count */}
      <div className="py-10 flex gap-x-1.5 items-center">
        {/* back arrow */}
        <button className="border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl">
          <FaAngleLeft />
        </button>
        <button className="border-2 dark:border-dark-primary-color border-light-primary-color dark:text-light-primary-color font-Righteous text-light-primary-color dark: bg-dark-primary-color p-2 rounded-xl">
          1
        </button>
        <button className="border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color font-Righteous dark:text-dark-primary-color dark:hover:bg-dark-primary-color hover:bg-light-primary-color w-3.5 h-3.5 rounded-xl"></button>
        <button className="border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color font-Righteous dark:text-dark-primary-color dark:hover:bg-dark-primary-color hover:bg-light-primary-color w-3.5 h-3.5 rounded-xl"></button>
        {/* forward arrow */}
        <button
          className="border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color
        hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl"
        >
          <FaAngleRight />
        </button>
      </div>
    </>
  );
};

export default Pagination;
