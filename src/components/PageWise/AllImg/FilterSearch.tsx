import { useEffect, useRef, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { RiColorFilterLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import CategoryWise from "./CategoryWise";
import DistrictWise from "./DistrictWise";
import "./Filter.css";
import ViewWise from "./ViewWise";

const FilterSearch = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen2) {
      // Disable scroll on the body when the sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll again when the sidebar is closed
      document.body.style.overflow = "auto";
    }

    // Clean up to reset body overflow when the component unmounts or sidebar closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen2]);

  useEffect(() => {
    if (!isOpen && !isOpen2) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTimeout(() => {
          setIsOpen2(false);
        }, 200);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef, isOpen, isOpen2]);

  return (
    <div>
      <div
        className={` max-md:mx-auto mt-4 -mb-5 flex ms-auto transform w-fit duration-500 gap-x-2`}
      >
        <div className="relative">
          <input
            placeholder={Language === "BN" ? "শব্দ/কীওয়ার্ড" : "word/keyword"}
            className={` p-2  font-Space outline-none rounded-xl border-2 border-light-secondary-color ${
              Language === "BN" && "font-BanglaSubHeading"
            }`}
          />
          <button className="absolute z-30 right-1 bg-light-primary-color rounded-xl text-dark-primary-color p-2 top-1">
            <LuSearch className="text-xl" />
          </button>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsOpen2(!isOpen2);
          }}
          className="dark:bg-dark-primary-color dark:text-light-primary-color flex items-center cursor-pointer bg-light-primary-color text-dark-primary-color font-Righteous p-2 px-3 gap-x-1 ps-2.5 w-fit rounded-md"
        >
          <RiColorFilterLine className="text-xl" />
          <p className={`${Language === "BN" && "font-BanglaHeading text-lg"}`}>
            {Language === "BN" && "ফিল্টার"}
            {Language === "EN" && "Filter"}
          </p>
        </button>
      </div>

      <div
        className={`${
          isOpen2 ? "h-screen w-screen opacity-100 " : "opacity-0"
        } fixed z-50 overflow-hidden top-0 left-0 backdrop-blur-sm bg-black/80`}
      >
        <div
          ref={divRef}
          className={`${
            isOpen ? "right-0" : "-right-[120%]"
          } absolute transform duration-500 bg-background w-3/4 border-s-2 p-4 border-[#575757]  max-w-[320px] h-full`}
        >
          <div className="w-full flex flex-col h-full overflow-y-scroll example">
            {/* title and close */}
            <div className="border-b-2 dark:border-[#575757] pb-3 flex justify-between border-light-primary-color items-center sticky top-0 bg-dark-primary-color dark:bg-light-primary-color z-30 w-full">
              {/* title */}
              <h1 className="">
                <span className="font-BanglaSubHeading text-xl">
                  {Language === "BN" && "ফিল্টার নির্বাচন করুন"}
                </span>
                <span className="font-Righteous text-xl">
                  {Language === "EN" && "Filter Selection"}
                </span>
              </h1>
              <IoIosCloseCircle
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    setIsOpen2(false);
                  }, 300);
                }}
                className="text-2xl  rounded-full  cursor-pointer"
              />
            </div>
            {/* district wise */}
            <DistrictWise />
            {/* category wise */}
            <CategoryWise />
            {/* view wise */}
            <ViewWise />

            {/* bottom buttons */}
            <div className="flex items-center gap-x-2 bg-dark-primary-color dark:bg-light-primary-color sticky bottom-0 pt-2">
              <button className="p-2 bg-dark-primary-color text-light-primary-color rounded-xl">
                <GrPowerReset />
              </button>
              <button className="p-1 bg-dark-primary-color text-light-primary-color rounded-lg px-2">
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "অ্যাপ্লাই করুন"}
                </span>
                {Language === "EN" && "Apply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
