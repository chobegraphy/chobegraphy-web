"use client";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import { useSelector } from "react-redux";
const Banner = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <div className="w-full  h-full col-span-6">
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
      <section className="px-3 py-2">
        <div className="flex justify-between items-center ">
          <h1 className="font-Righteous text-4xl mt-5">
            <span className="font-BanglaHeading">
              {Language === "BN" && "ছবির নাম"}
            </span>
            {Language === "EN" && "Image name"}
          </h1>
          <div className="text-3xl flex gap-x-5 cursor-pointer">
            <FaRegHeart />
            <PiShareNetworkBold />
          </div>
        </div>
        <h2 className="font-Space mt-2 text-xl">
          <span className="font-BanglaSubHeading">
            {Language === "BN" &&
              "প্রকৃতিতে থাকা, এমনকি প্রকৃতির দৃশ্য দেখা, রাগ, ভয় এবং চাপ কমায় এবং আনন্দদায়ক অনুভূতি বৃদ্ধি করে।"}
          </span>
          {Language === "EN" &&
            "Image nameBeing in nature, or even viewing scenes of nature, reduces anger, fear, and stress and increases pleasant feelings"}
        </h2>
      </section>
      {/* picture information */}
      <section>
        <div>
          <h1>
            <MdPublishedWithChanges />
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Banner;
