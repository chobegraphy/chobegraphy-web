"use client";
import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";
import { MdOutlineCamera, MdOutlineTipsAndUpdates } from "react-icons/md";
import { RiBox3Fill } from "react-icons/ri";
import { TbBorderCornerSquare } from "react-icons/tb";
import { useSelector } from "react-redux";
import heroImg from "../../../Assets/Webp/hero.png";
import "./Home.css";
const Hero = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);

  return (
    <div className="h-full  border dark:border-light-secondary-color w-full my-5 relative overflow-hidden border-[#B8B8B8]">
      {/*-> Rahat code */}
      <div className="absolute -top-1.5 -left-1.5 text-3xl">
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
      <div className="absolute w-[100px] rounded-3xl rotate-45 h-[100px] bg-black top-[220px] max-md:top-[220px] max-lg:top-[230px] max-lg:right-[210px] right-[510px] max-md:-right-10"></div>
      <div className="absolute w-[60px] rounded-3xl rotate-45 h-[60px] left-[140px] bg-black top-[240px] max-md:top-[230px] max-md:left-[90px]"></div>
      <div className="absolute  -right-10 top-10 items-center gap-x-3 max-lg:-right-24 max-lg:scale-90 max-md:hidden rotate-45 flex">
        <div className="bg-light-primary-color w-[100px] rounded-3xl h-[100px]  "></div>
        <div className="bg-light-primary-color w-[150px] rounded-3xl h-[150px]  "></div>
        <div className="bg-light-primary-color w-[100px] rounded-3xl h-[100px]  "></div>
      </div>
      <div className="absolute  right-10 -bottom-4 items-center gap-x-3 -rotate-45 max-md:-bottom-7 max-md:right-[114px] max-md:scale-75 flex">
        <div className="bg-light-primary-color w-[100px] rounded-3xl h-[100px]  "></div>
        <div className="bg-light-primary-color w-[150px] rounded-3xl h-[150px]  "></div>
      </div>
      <div className="grid max-xl:grid-cols-1 grid-cols-2 w-full pb-7">
        <div className="ms-10 max-xl:mx-5 mt-7">
          <div className=" max-sm:h-fit lg:h-[115px] text-black max-sm:text-6xl text-8xl font-normal font-Bayon dark:text-dark-primary-color leading-[120px]">
            <span className="strokeText">
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" ? "ছবিগ্রাফি" : "Chobegraphy"}
              </p>
            </span>
          </div>
          <div className="w-[443px] max-md:w-full max-md:h-fit h-[99px] text-zinc-600 text-base font-normal dark:text-dark-primary-color/50 font-Space leading-normal">
            <p
              className={`${
                Language === "BN" && "font-BanglaSubHeading text-[18px]"
              }`}
            >
              {Language === "BN"
                ? "ফটোগ্রাফি কেবল ছবি নয় - এটি অনুভূতি, গল্প এবং আবেগ সম্পর্কে। একটি ফ্রেম হাজার হাজার স্মৃতি ধরে রাখতে পারে। মুহূর্তগুলি ম্লান হয়ে যায়, কিন্তু ছবিগুলি সেগুলিকে বাঁচিয়ে রাখে। লেন্সের মাধ্যমে, সময় চিরকাল স্থির থাকে।"
                : "Photography isn’t just about pictures— It’s about feelings, stories,            and emotions. A single frame can hold a thousand memories. Moments            fade, but images keep them alive. Through the lens, time stands            still forever."}
            </p>
          </div>
          <button
            className={
              "border-2 py-1 max-lg:hidden xl:py-1.5 mt-6 px-6  xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:border-dark-primary-color   hover:text-dark-primary-color transform duration-300 rounded flex items-center gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
            }
          >
            <FaSignInAlt className="text-xl" />{" "}
            <span>
              <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                {Language === "BN" ? "সাইন ইন" : "Sign In"}
              </p>
            </span>
          </button>
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
          <div className="w-full mt-12 min-h-[154px] border border-zinc-400 relative p-4">
            <div className=" max-md:grid-cols-1 grid grid-cols-2 w-full h-full ">
              <div className="max-md:border-b-2 max-md:mb-5 max-md:border-e-0 border-e-2 border-light-primary-color dark:border-dark-primary-color w-full h-full">
                <MdOutlineTipsAndUpdates className="text-5xl text-light-primary-color dark:text-dark-primary-color" />
                <h1 className="text-2xl ">
                  <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                    {Language === "BN" ? "ফ্রিজ টাইম।" : "Freeze time"}
                  </p>
                </h1>
                <p className="font-Space">
                  <span
                    className={`${
                      Language === "BN" && "font-BanglaSubHeading"
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
                <h1 className="text-2xl ">
                  {" "}
                  <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                    {Language === "BN"
                      ? "চিরতরে বেঁচে থাকো।"
                      : " Relive forever."}
                  </p>
                </h1>
                <p
                  className={`${Language === "BN" && "font-BanglaSubHeading"}`}
                >
                  {Language === "BN"
                    ? "ফটোগ্রাফির শিল্পের মাধ্যমে প্রতিটি মুহূর্তকে চিরতরে পুনরুজ্জীবিত করুন। অনন্তকাল।"
                    : " Relive every moment forever through the art of photography."}
                </p>
              </div>
            </div>
            <div className="absolute -top-1.5 -left-1.5 text-3xl">
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
          </div>
        </div>
        <div className="mt-10 relative flex justify-center">
          <div className="w-[124px] top-28 left-32 h-[124px]  origin-top-left max-lg:hidden p-3 absolute rounded-full  md:hidden max-sm:left-24 max-sm:opacity-30 bg-light-primary-color rotate-[150deg]">
            <div className="bg-light-primary-color outline-dashed outline-dark-primary-color  animate-spin w-full h-full rounded-full"></div>
            <MdOutlineCamera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-white" />
          </div>
          <Image
            style={{ filter: "drop-shadow(0 5px 5px black)" }}
            src={heroImg}
            className="ms-5 max-sm:w-[80%] lg:w-[70%] xl:w-[90%] object-contain max-lg:mb-7 max-sm:ms-0"
            alt="hero"
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
