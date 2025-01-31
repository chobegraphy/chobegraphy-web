"use client";
import { useState } from "react";
import { FaGoogleDrive, FaTelegramPlane } from "react-icons/fa";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { RiRocketFill } from "react-icons/ri";
import { SiPolkadot } from "react-icons/si";
import { TbBorderCornerSquare } from "react-icons/tb";
const UpdatesCardCamera = ({ index }: any) => {
  const [hovered, SetHovered] = useState(false);
  const [hovered2, SetHovered2] = useState(false);
  return (
    <div className="">
      {/*-> Rahat code */}
      <div
        onMouseEnter={() => SetHovered(true)}
        onMouseLeave={() => SetHovered(false)}
        className={`border max-sm:h-[350px] h-[300px] border-light-primary-color/30  relative max-sm:rounded-3xl clipPath dark:border-dark-primary-color/30 p-6`}
      >
        {" "}
        <div
          className={`${
            hovered ? "w-full h-full opacity-100" : "w-0 opacity-0 h-0"
          } absolute mx-auto my-auto max-md:hidden transform duration-500 top-0 bottom-0 right-0 flex items-center z-30 justify-center left-0 dark:bg-dark-primary-color bg-light-primary-color flex-col gap-5 text-2xl `}
        >
          <div className="flex gap-x-5">
            <FaTelegramPlane className="text-dark-primary-color dark:text-light-primary-color hover:scale-[120%]  transform duration-500" />
            <FaGoogleDrive className="text-dark-primary-color dark:text-light-primary-color hover:scale-[120%]  transform duration-500" />
            <IoCloudDownloadOutline className="text-dark-primary-color dark:text-light-primary-color hover:scale-[120%] transform duration-500" />
          </div>
          <div
            onMouseEnter={() => SetHovered2(true)}
            onMouseLeave={() => SetHovered2(false)}
            className=" absolute bottom-2"
          >
            <button
              className={`${
                hovered ? "opacity-100 " : "hidden opacity-0"
              } transform duration-500 bottom-0 text-dark-primary-color dark:text-light-primary-color items-center gap-x-1 flex px-4 rounded-xl`}
            >
              <RiRocketFill
                className={`${
                  hovered2 ? "rotate-90 " : ""
                } transform  duration-500 text-lg`}
              />{" "}
              Read More &gt;
            </button>
          </div>
        </div>
        <div className={`absolute -top-1.5 -left-1.5 text-3xl`}>
          <TbBorderCornerSquare />
        </div>
        <div className="absolute rotate-90 -top-1.5 -right-1.5 text-3xl">
          <TbBorderCornerSquare />
        </div>
        <div className="absolute -rotate-90 -bottom-1.5 -left-1.5 text-3xl">
          <TbBorderCornerSquare />
        </div>
        <div className="absolute rotate-180 -bottom-1.5 -right-1.5 text-3xl">
          <TbBorderCornerSquare />
        </div>
        <div className="h-full ">
          <div className="text-2xl">Camera Name</div>
          <div className="text-lg">Version : 1.0.0</div>
          <div className="text-lg">date : 21.03.2024</div>
          <div className="text-lg">Changelog :</div>
          <p className="font-Space h-fit text-sm ">
            Lorem, ipsum dolor sit amet consecteturoiqw joierjqiohad
            jpojroprjepr jeprejrperjeoprjep adipisicing ...
          </p>
        </div>
        <div className=" h-[40px]  mb-auto bottom-0 z-20 absolute left-0 right-0 max-md:flex hidden w-full flex-grow items-center ">
          <div className="flex items-center justify-between w-full bottom-2  ">
            <div className="flex px-4 gap-x-5">
              <FaTelegramPlane className="dark:text-dark-primary-color text-light-primary-color hover:scale-[130%]  transform duration-500" />
              <FaGoogleDrive className="dark:text-dark-primary-color text-light-primary-color hover:scale-[130%]  transform duration-500" />
              <IoCloudDownloadOutline className="dark:text-dark-primary-color text-light-primary-color hover:scale-[130%] transform duration-500" />
            </div>
            <button className="w-[40px] mr-1 mb-2 h-10 dark:bg-dark-primary-color bg-light-primary-color flex items-center hover:animate-spin justify-center dark:text-light-primary-color text-dark-primary-color rounded-3xl">
              <SiPolkadot className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesCardCamera;
