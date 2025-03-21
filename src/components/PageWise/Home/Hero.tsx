"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiBox3Fill } from "react-icons/ri";
import { TbBorderCornerSquare } from "react-icons/tb";
import { useSelector } from "react-redux";

import { useRef } from "react";
import { useGetPictureDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureData/ApiSlice";
import "./Home.css";
import ImgCardHero from "./ImgCardHero";
const Hero = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  const ref = useRef(null)

  const inView = useInView(ref, { once: true });

  const { data, error, isLoading } = useGetPictureDataQuery({
    filter: "popular",
    page: 1,
    limit: 9,
  });
  const getRandomDuration = () => Math.random() * (1.5 - 0.7) + 0.7; // Random duration between 0.7s and 1.5s

  const imgSection = <> <div className="w-full h-full  flex justify-center max-md:mt-5 max-md:mb-20 max-md:ms-0 ms-5 items-center relative">

    <div className="w-[450px] h-[450px] grid-cols-3 max-md:w-[290px] max-md:h-[290px] rotate-45 scale-90 gap-3 grid grid-rows-3">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-100 rounded-3xl overflow-hidden border-2 border-light-secondary-color rounded-br-none w-full h-full"
      >
        <div className="object-cover object-center w-full h-full scale-150 -rotate-45"><ImgCardHero imgData={data?.data[0]} i={0} /></div>
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-200 w-full h-full rounded-3xl rounded-bl-none border-2 border-light-secondary-color overflow-hidden"
      ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[1]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-300 rounded-full w-full h-full border-2 border-light-secondary-color overflow-hidden"
      ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[2]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-400 rounded-3xl border-2 border-light-secondary-color rounded-tr-none w-full overflow-hidden h-full"
      ><div className="object-cover object-center relative top-5 w-[160%] h-[160%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[3]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-600 rounded-b-full overflow-hidden rounded-tr-full w-full h-full border-2 border-light-secondary-color"
      ><div className="object-cover object-center relative  w-[160%] h-[160%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[4]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-700 rounded-t-full overflow-hidden rounded-br-full w-full h-full border-2 border-light-secondary-color"
      ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[5]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-800 rounded-full overflow-hidden w-full h-full border-2 border-light-secondary-color"
      ><div className="object-cover object-center relative w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[6]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-red-900 rounded-b-full rounded-tl-full w-full h-full border-2 border-light-secondary-color overflow-hidden"
      ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[7]} i={0} /></div></motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0,
          rotate: inView ? 0 : 0,
        }}
        exit={{ opacity: 0, scale: 0, rotate: 0 }}
        transition={{
          duration: getRandomDuration(),
          ease: "easeInOut",
        }}
        className="bg-pink-800 w-full h-full rounded-b-full rounded-tr-full border-2 border-light-secondary-color overflow-hidden"
      ><div className="object-cover object-center relative   w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[8]} i={0} /></div></motion.div>
    </div>
  </div></>
  return (
    <div className="">
      <div className="h-full   dark:border-light-secondary-color w-full my-5 relative mt-10  border-[#B8B8B8]">
        {/*-> Rahat code */}
        <div className="absolute -top-1.5 -left-1.5 text-3xl">
          <TbBorderCornerSquare className="text-light-secondary-color dark:text-dark-primary-color" />
        </div>
        <div className="absolute rotate-90 -top-1.5 -right-1.5 text-3xl">
          <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
        </div>
        <div className="absolute -rotate-90 -bottom-1.5 -left-1.5 text-3xl">
          <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
        </div>
        <div className="absolute rotate-180 -bottom-1.5 -right-1.5 text-3xl">
          <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
        </div>

        <div className="grid max-xl:grid-cols-1 grid-cols-2 max-md:h-full w-full pb-7">
          <div className="ms-10 max-xl:mx-5 z-20 mt-7">
            <div className=" max-sm:h-fit lg:h-[115px] max-sm:text-6xl text-8xl font-normal text-light-primary-color font-Bayon dark:text-dark-primary-color   leading-[120px]">
              <span className="">
                <p
                  className={`${Language === "BN" &&
                    "font-BanglaHeading  text-[70px] md:text-[115px] "
                    }`}
                >
                  {Language === "BN" ? "ছবিগ্রাফি" : "Chobegraphy"}
                </p>
              </span>
            </div>
            <div className="w-[443px] max-md:w-full max-md:h-fit h-[99px] text-light-secondary-color text-base font-normal dark:text-dark-secondary-color/60 font-Space leading-normal ">
              <p
                className={`${Language === "BN" && "font-BanglaSubHeading text-[18px]"
                  }`}
              >
                {Language === "BN"
                  ? "ফটোগ্রাফি কেবল ছবি নয় - এটি অনুভূতি, গল্প এবং আবেগ সম্পর্কে। একটি ফ্রেম হাজার হাজার স্মৃতি ধরে রাখতে পারে। মুহূর্তগুলি ম্লান হয়ে যায়, কিন্তু ছবিগুলি সেগুলিকে বাঁচিয়ে রাখে। লেন্সের মাধ্যমে, সময় চিরকাল স্থির থাকে।"
                  : "Photography isn’t just about data— It’s about feelings, stories,            and emotions. A single frame can hold a thousand memories. Moments            fade, but images keep them alive. Through the lens, time stands            still forever."}
              </p>
            </div>
            <Link
              href="/SignIn"
              className={
                "border-2 py-1 max-lg:hidden xl:py-1.5 mt-6 px-6  xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:border-dark-primary-color   hover:text-dark-primary-color transform duration-300 rounded flex items-center gap-x-2 text-dark-primary-color w-fit justify-center border-light-primary-color"
              }
            >
              <FaSignInAlt className="text-xl" />{" "}
              <span>
                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                  {Language === "BN" ? "সাইন ইন" : "Sign In"}
                </p>
              </span>
            </Link>
            <button
              className={
                "border-2 py-1 xl:py-1.5 max-lg:flex hidden mt-6 px-6  xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:border-dark-primary-color   hover:text-dark-primary-color transform duration-300 rounded  items-center gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
              }
            >
              {" "}
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" ? "গ্যালারি" : "Gallery"}
              </p>
            </button>

            <div className="w-full mt-12 min-h-[154px] border border-light-primary-color dark:border-dark-primary-color/30 relative p-4">
              <div className=" max-md:grid-cols-1 grid grid-cols-2 w-full h-full ">
                <div className="max-md:border-b-2 max-md:mb-5 max-md:border-e-0 border-e-2 border-light-primary-color dark:border-dark-primary-color w-full h-full">
                  <MdOutlineTipsAndUpdates className="text-5xl text-light-secondary-color dark:text-dark-primary-color" />
                  <h1 className="text-2xl text-light-primary-color dark:text-dark-primary-color  ">
                    <p
                      className={`${Language === "BN" && "font-BanglaHeading"}`}
                    >
                      {Language === "BN" ? "ফ্রিজ টাইম।" : "Freeze time"}
                    </p>
                  </h1>
                  <p className="font-Space text-light-secondary-color dark:text-dark-secondary-color">
                    <span
                      className={`${Language === "BN" && "font-BanglaSubHeading"
                        }`}
                    >
                      {Language === "BN"
                        ? "ফটোগ্রাফি ক্ষণস্থায়ী মুহূর্তগুলিকে ধারণ করে, চিরকালের জন্য সংরক্ষণ করে।"
                        : " Photography captures fleeting moments, preserving them for                  eternity."}
                    </span>
                  </p>
                </div>
                <div className="max-md:ms-0 max-md:mt-5 ms-4 border-light-primary-color dark:border-dark-primary-color w-full h-full">
                  <RiBox3Fill className="text-5xl text-light-primary-color dark:text-dark-primary-color" />
                  <h1 className="text-2xl text-light-primary-color dark:text-dark-primary-color ">
                    {" "}
                    <p
                      className={`${Language === "BN" && "font-BanglaHeading"}`}
                    >
                      {Language === "BN"
                        ? "চিরতরে বেঁচে থাকো।"
                        : " Relive forever."}
                    </p>
                  </h1>
                  <p
                    className={`${Language === "BN" && "font-BanglaSubHeading"
                      } text-light-secondary-color font-Space dark:text-dark-secondary-color`}
                  >
                    {Language === "BN"
                      ? "ফটোগ্রাফির শিল্পের মাধ্যমে প্রতিটি মুহূর্তকে চিরতরে পুনরুজ্জীবিত করুন। অনন্তকাল।"
                      : " Relive every moment forever through the art of photography."}
                  </p>
                </div>
              </div>
              <div className="absolute -top-1.5 -left-1.5 text-3xl">
                <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
              </div>
              <div className="absolute rotate-90 -top-1.5 -right-1.5 text-3xl">
                <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
              </div>
              <div className="absolute -rotate-90 -bottom-1.5 -left-1.5 text-3xl">
                <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
              </div>
              <div className="absolute rotate-180 -bottom-1.5 -right-1.5 text-3xl">
                <TbBorderCornerSquare className="text-light-primary-color dark:text-dark-primary-color" />
              </div>
            </div>
          </div>
          {/* <div
            className={`mt-10 relative flex justify-center opacity-0 ${window.screen.width === 360 && "left-2.5"
              } `}
          >
            <div className="absolute w-[100px] rounded-3xl rotate-45 h-[100px] bg-green-700 max-md:hidden top-[5px] max-md:top-[770px] max-lg:top-[230px] max-lg:right-[210px] max-md:w-[70px] max-md:h-[70px] right-[323px] max-md:right-[270px] max-xl:top-[-505px] max-lg:hidden "></div>

            <div className="absolute  -right-10 top-0.5 items-center gap-x-3 max-lg:-right-24 max-lg:scale-75 max-md:-right-14 max-md:scale-75 max-md:top-[-192px] max-xl:top-[-510px] max-lg:top-[-550px] rotate-45 flex">
              <div className=" w-[100px] rounded-3xl h-[100px] overflow-hidden flex justify-center items-center relative top-8 ">
                <div className="-rotate-45    w-[240px] scale-125 h-[100px]">
                  <img src="https://i.ibb.co.com/BHcrFyKP/retouch-2024103008520781.jpg" alt="" width={500} height={500} loading="lazy" />
                </div>
              </div>
              <div className="overflow-hidden flex items-center justify-center w-[150px] rounded-3xl h-[150px]  ">
                <img src="https://i.ibb.co.com/hxHnj7Nv/retouch-2024112709514109-2.jpg" alt="" width={500} height={500} loading="lazy" />
              </div>
              <div className="bg-gray-800 w-[100px] rounded-3xl h-[100px]  relative -top-2 "></div>
            </div>
            <div className="absolute  right-10 -bottom-10 items-center max-xl:-bottom-0 gap-x-3 -rotate-45 max-md:-bottom-7 max-md:right-[90px] max-md:scale-75 max-md:top-[25px] max-lg:opacity-100 max-xl:opacity-35 max-xl:top-[-100px] flex">
              <div className="bg-light-primary-color w-[100px] rounded-3xl max-lg:hidden max-md:block h-[100px]  "></div>
              <div className="bg-light-primary-color w-[150px] rounded-3xl max-lg:hidden max-md:block h-[150px]  "></div>
            </div>
            <div className="w-[124px] top-28 left-32 h-[124px]  origin-top-left max-lg:hidden p-3 absolute rounded-full  md:hidden max-sm:left-24 max-sm:opacity-30 bg-light-primary-color rotate-[150deg] ">
              <div className="bg-light-primary-color outline-dashed outline-dark-primary-color  animate-spin w-full h-full rounded-full"></div>
              <MdOutlineCamera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-white" />
            </div>
            <div
              className="absolute w-[200px] rounded-3xl rotate-45 h-[200px]  top-[100px] max-xl:-top-[405px] max-md:top-[-107px] max-lg:top-[-470px] 
          max-lg:scale-75
          max-lg:right-[90px] max-md:scale-95 right-[190px] max-md:h-[150px] overflow-hidden max-md:w-[150px] max-md:right-[170px]"
            >
              <img className=" object-cover object-center object-center w-full h-full" src="https://i.ibb.co.com/hRy5NsQb/retouch-2024110413453895-3.jpg" alt="s" width={500} height={500} loading="lazy" />
            </div>
            <div className="absolute w-[90px] rounded-3xl rotate-45 h-[90px] max-xl:-top-[300px] bg-red-900 top-[205px] max-md:top-[-23px] max-lg:top-[230px] max-lg:right-[210px] right-[70px] max-lg:hidden max-md:block max-md:right-[74px]"></div>
            <div className="absolute w-[60px] rounded-xl rotate-45 h-[60px] max-xl:-top-[230px] max-lg:hidden max-md:block bg-red-200 top-[270px] max-md:top-[210px] max-lg:top-[230px] max-lg:right-[210px] right-[160px] max-md:right-[170px]"></div>
            <div className="absolute w-[60px] rounded-xl rotate-45 h-[60px] max-xl:right-[214px] max-lg:hidden max-md:block max-xl:-top-[180px] bg-red-200 top-[320px] max-md:top-[-255px] max-lg:top-[230px] max-lg:right-[210px] right-[210px] max-md:right-[133px]"></div>
          </div> */}
          {imgSection}

        </div>
      </div>
    </div>
  );
};

export default Hero;
