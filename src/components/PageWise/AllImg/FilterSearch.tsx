import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { RiColorFilterLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const FilterSearch = () => {
  const Language = useSelector((state: any) => state.Language.value);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
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
            type="text"
          />
          <button className="absolute z-30 right-1 bg-light-primary-color rounded-xl text-dark-primary-color p-2 top-1">
            <LuSearch className="text-xl" />
          </button>
        </div>

        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setIsOpen2(!isOpen2);
          }}
          className="dark:bg-dark-primary-color dark:text-light-primary-color flex items-center cursor-pointer bg-light-primary-color text-dark-primary-color font-Righteous  p-2 px-3 gap-x-1 ps-2.5 w-fit rounded-md"
        >
          <RiColorFilterLine className="text-xl" />
          <p className={`${Language === "BN" && "font-BanglaHeading text-lg"}`}>
            {Language === "BN" && "ফিল্টার"}
            {Language === "EN" && "Filter"}
          </p>
        </div>
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
          <div className="w-full flex flex-col h-full "></div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
