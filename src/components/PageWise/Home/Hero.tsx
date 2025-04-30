"use client";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiBox3Fill } from "react-icons/ri";
import { TbBorderCornerSquare } from "react-icons/tb";
import { useSelector } from "react-redux";

import SharedHero from "@/components/shared/Hero/SharedHero";
import AOS from "aos";
import { LuSearch } from "react-icons/lu";
import "./Home.css";
AOS.init();
const Hero = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);



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
                  : "Photography isn’t just about data— It’s about feelings, stories,            and e. A single frame can hold a thousand memories. Moments            fade, but images keep them alive. Through the lens, time stands            still forever."}
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
            <Link href={"/AllImg?filter=recent&CurrentPage=1&collection=All"}
              className={
                "border-2 py-1 w-fit xl:py-1.5 max-lg:flex hidden mt-6 px-6  xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:border-dark-primary-color   hover:text-dark-primary-color transform duration-300 rounded-md  items-center gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
              }
            >
              {" "}
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" ? "গ্যালারি" : "Gallery"}
              </p>
            </Link>
            <div className="relative max-md:block hidden mt-6 -mb-4 ">
              <input
                type="text"

                placeholder={Language === "BN" ? "শব্দ/কীওয়ার্ড" : "word/keyword"}
                className={`w-full  bg-transparent outline-none font-Space focus:outline-none px-3 rounded-2xl border-2 border-light-primary-color dark:border-dark-primary-color/10 py-3 ${Language === "BN" && "font-BanglaSubHeading"
                  }`}
              />
              <button className="absolute z-30 right-1 bg-light-primary-color dark:bg-light-secondary-color/30 rounded-xl text-dark-primary-color p-3 top-1">
                <LuSearch className="text-xl" />
              </button>
            </div>
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

          <div data-aos="zoom-in"><SharedHero /></div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
