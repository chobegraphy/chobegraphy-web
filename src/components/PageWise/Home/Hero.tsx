import Image from "next/image";
import { BsNoiseReduction } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import {
  MdLightMode,
  MdOutlineCamera,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { RiBox3Fill } from "react-icons/ri";
import { TbBorderCornerSquare, TbFrame } from "react-icons/tb";
import heroImg from "../../../Assets/Webp/hero.png";
import "./Home.css";
const Hero = () => {
  return (
    <div className="h-full  border dark:border-light-secondary-color w-full my-5 relative border-[#B8B8B8]">
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
      <div className="grid max-xl:grid-cols-1 grid-cols-2 w-full">
        <div className="ms-10 max-xl:mx-5 mt-7">
          <div className=" max-sm:h-fit lg:h-[235px] text-black max-sm:text-6xl text-8xl font-normal font-Bayon dark:text-dark-primary-color leading-[120px]">
            <span className="strokeText">Capture</span> The Best{" "}
            <span className="strokeText">Moments.</span>
          </div>
          <div className="w-[443px] max-md:w-full max-md:h-fit h-[77px] text-zinc-600 text-base font-normal dark:text-dark-primary-color/50 font-Space leading-normal">
            Planning your next event? Make sure to capture all the moments you
            did not get to be a part of. Click the link below to schedule an
            appointment today!
          </div>
          <button
            className={
              "border-2 py-1 max-lg:hidden xl:py-1.5 mt-6 px-6  xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:border-dark-primary-color   hover:text-dark-primary-color transform duration-300 rounded flex items-center gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
            }
          >
            <FaSignInAlt className="text-xl" /> <span>Sign In</span>
          </button>
          <button
            className={
              "border-2 py-1 xl:py-1.5 max-lg:flex hidden mt-6 px-6  xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:border-dark-primary-color   hover:text-dark-primary-color transform duration-300 rounded  items-center gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
            }
          >
            {" "}
            <span>Download Now</span>
          </button>
          <div className="w-full mt-12 min-h-[154px] border border-zinc-400 relative p-4">
            <div className=" max-md:grid-cols-1 grid grid-cols-2 w-full h-full ">
              <div className="max-md:border-b-2 max-md:mb-5 max-md:border-e-0 border-e-2 border-light-primary-color dark:border-dark-primary-color w-full h-full">
                <MdOutlineTipsAndUpdates className="text-5xl text-light-primary-color dark:text-dark-primary-color" />
                <h1 className="text-2xl ">Regular Updates</h1>
                <p className="font-Space">
                  We Provide Regular Config Updates and host them in one place.
                </p>
              </div>
              <div className="max-md:ms-0 max-md:mt-5 ms-4 border-light-primary-color dark:border-dark-primary-color w-full h-full">
                <RiBox3Fill className="text-5xl text-light-primary-color dark:text-dark-primary-color" />
                <h1 className="text-2xl ">Regular Improvement</h1>
                <p className="font-Space">
                  We make changes regularly to improve your experience & make it
                  more user friendly.
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
      <div className="mt-[74px] max-lg:mt-0 mb-10 flex max-sm:flex-col max-sm:mx-5  mx-10">
        <h1 className="text-5xl flex items-center gap-x-2 ">
          Tips{" "}
          <div className="w-6 h-2 dark:bg-dark-primary-color bg-light-primary-color" />
        </h1>
        <div className="bg-light-primary-color max-sm:mx-0 dark:bg-dark-primary-color ms-5 min-h-[175px] max-sm:mt-5 p-4 w-full">
          <div className="w-full h-full max-lg:grid-cols-1 grid grid-cols-3">
            <div className="w-full h-full max-lg:border-b-2 max-lg:mb-5 lg:border-e-2 border-dark-primary-color dark:border-light-primary-color">
              <h1 className="text-3xl flex text-dark-primary-color dark:text-light-primary-color items-center gap-x-2">
                <BsNoiseReduction className="text-5xl  text-dark-primary-color dark:text-light-primary-color" />{" "}
                Noise Reduction
              </h1>
              <p className="font-Space mt-2 text-dark-primary-color dark:text-light-primary-color">
                Try different types of noise model to get best results && reduce
                noise in images.
              </p>
            </div>
            <div className="w-full max-lg:mt-2.5 h-full lg:ms-2.5 max-lg:border-b-2 max-lg:mb-5 lg:border-e-2 border-dark-primary-color dark:border-light-primary-color">
              <h1 className="text-3xl flex text-dark-primary-color dark:text-light-primary-color items-center gap-x-2">
                <TbFrame className="text-5xl  text-dark-primary-color dark:text-light-primary-color" />{" "}
                Frame
              </h1>
              <p className="font-Space mt-2 text-dark-primary-color dark:text-light-primary-color">
                Keep the framing value to -1, which will automatically adjust
                framing value as per scenario need
              </p>
            </div>
            <div className="w-full h-full max-lg:ms-0 max-lg:mb-5 max-lg:mt-5 ms-5 border-dark-primary-color dark:border-light-primary-color">
              <h1 className="text-3xl flex text-dark-primary-color dark:text-light-primary-color items-center gap-x-2">
                <MdLightMode className="text-5xl  text-dark-primary-color dark:text-light-primary-color" />{" "}
                Exposure
              </h1>
              <p className="font-Space mt-2 text-dark-primary-color dark:text-light-primary-color">
                The higher the value, the fewer the highlights. High values are
                recommended for photos in strong lighting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
