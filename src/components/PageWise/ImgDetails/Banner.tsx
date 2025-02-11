"use client";
import Image from "next/image";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import { MdPublishedWithChanges } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import {
  RiColorFilterFill,
  RiCustomSize,
  RiDownloadCloud2Fill,
} from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { useSelector } from "react-redux";
const Banner = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <div className="w-full relative h-full col-span-6">
      <div>
        <Image
          width={500}
          height={500}
          src="https://images.unsplash.com/photo-1592492152545-9695d3f473f4?q=1000&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full 2xl:h-[550px]    border-dark-primary-color/10 dark:border-light-primary-color/10  object-cover h-full"
        />
      </div>
      {/* picture details */}
      <section className="lg:px-3 py-2 text-light-primary-color dark:text-dark-primary-color">
        <div className="flex max-md:mt-2 mt-5 justify-between items-center ">
          <h1 className="font-Righteous max-md:text-3xl text-4xl ">
            <span className="font-BanglaHeading">
              {Language === "BN" && "ছবির নাম"}
            </span>
            {Language === "EN" && "Image name"}
          </h1>
          <div className="text-3xl flex gap-x-5 cursor-pointer ">
            <FaRegHeart />
            <PiShareNetworkBold />
          </div>
        </div>
        <h2 className="font-Space mt-2 max-md:text-base text-xl">
          <span className="font-BanglaSubHeading">
            {Language === "BN" &&
              "প্রকৃতিতে থাকা, এমনকি প্রকৃতির দৃশ্য দেখা, রাগ, ভয় এবং চাপ কমায় এবং আনন্দদায়ক অনুভূতি বৃদ্ধি করে।"}
          </span>
          {Language === "EN" &&
            "Image nameBeing in nature, or even viewing scenes of nature, reduces anger, fear, and stress and increases pleasant feelings"}
        </h2>
      </section>
      {/* picture information */}
      <section className="lg:px-3 text-light-primary-color dark:text-dark-primary-color mt-2">
        <div className="flex flex-col gap-y-1">
          <h1 className="flex items-center gap-x-1 font-Space">
            <MdPublishedWithChanges className="text-xl" />
            <p>
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "প্রকাশিত হয়েছে :"}
              </span>
              {Language === "EN" && "Published on :"}
              June 18, 2020
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <AiOutlineCopyrightCircle className="text-xl" />
            <p className="underline">
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "কপিরাইট তথ্য"}
              </span>{" "}
              {Language === "EN" && "Copy Right info"}
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <RiCustomSize className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "রেজোলিউশন"}
              </span>{" "}
              {Language === "EN" && "Resolution"} : 3180x2000
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <TbCopy className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবির সাইজ"}
              </span>{" "}
              {Language === "EN" && "Picture Size"} : 9.5mb
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <IoPersonCircle className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ছবি প্রণেতা"}
              </span>{" "}
              {Language === "EN" && "Author"} : SifathKhan
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <BiSolidCategoryAlt className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "ক্যাটাগরি "}
              </span>{" "}
              {Language === "EN" && "Categories"} : Texture,Pattern,Gold,Brown
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <RiDownloadCloud2Fill className="text-xl" />
            <p>
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ডাউনলোড"}
              </span>{" "}
              {Language === "EN" && "Total downloads"} : 3000
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FiEye className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট ভিউ"}
              </span>{" "}
              {Language === "EN" && "Total View"} : 1000
            </p>
          </h1>
          <h1 className="flex items-center gap-x-1 font-Space">
            <FaRegHeart className="text-xl" />
            <p className="">
              {" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && "মোট রিয়েক্ট"}
              </span>{" "}
              {Language === "EN" && "Total React"} : 100
            </p>
          </h1>
          <div className="">
            <h1 className="flex items-center gap-x-1 font-Space">
              <RiColorFilterFill className="text-xl" />
              <p className="">
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ছবির মধ্যে যে রং গুলো আছে"}
                </span>{" "}
                {Language === "EN" && "Colors Presented"} :{" "}
              </p>
            </h1>
            <div className="flex gap-x-1">
              <div
                className="bg-red-600 w-7 rounded
            h-7"
              ></div>
              <div
                className="bg-red-600 w-7 rounded
            h-7"
              ></div>
              <div
                className="bg-red-600 w-7 rounded
            h-7"
              ></div>
              <div
                className="bg-red-600 w-7 rounded
            h-7"
              ></div>
              <div
                className="bg-red-600 w-7 rounded
            h-7"
              ></div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center absolute lg:right-20 right-3 max-md:scale-90 bottom-48 cursor-pointer">
        <svg
          className="w-20"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2785 20.3364L15.003 25M15.003 25L19.7275 20.3364M15.003 25V14.5068M25.4914 21.6072C26.5183 20.8944 27.2883 19.8772 27.6898 18.7031C28.0913 17.529 28.1033 16.2592 27.7242 15.0779C27.345 13.8966 26.5944 12.8653 25.5812 12.1337C24.5681 11.402 23.3451 11.0081 22.0897 11.0091H20.6015C20.2463 9.64246 19.5816 8.37322 18.6575 7.29689C17.7335 6.22055 16.5741 5.36518 15.2666 4.79516C13.9592 4.22514 12.5378 3.95532 11.1094 4.00603C9.68107 4.05673 8.28298 4.42663 7.0204 5.08789C5.75783 5.74914 4.66367 6.68451 3.8203 7.82359C2.97693 8.96266 2.40633 10.2758 2.15145 11.664C1.89658 13.0523 1.96407 14.4795 2.34884 15.8383C2.73362 17.1971 3.42565 18.452 4.37284 19.5086"
            className="stroke-light-primary-color dark:stroke-dark-primary-color"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* <span className="font-Righteous text-xl">Download</span> */}
      </div>
    </div>
  );
};

export default Banner;
