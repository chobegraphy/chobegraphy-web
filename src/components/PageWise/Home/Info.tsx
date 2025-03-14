"use client";

import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import Lottie from "lottie-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



import { useGetImgCountQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetImgCount/ApiSlice";
import { useGetUserCountQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetUserCount/ApiSlice";
import imgAnimation from "../../../Assets/Animation/img.json";
import peopleAnimation from "../../../Assets/Animation/people.json";
import menLight from "../../../Assets/Animation/photographerLight.json";

const Info = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  // user count rtk query
  const { data: UserCountData } = useGetUserCountQuery({});
  const { data: ImgCountData } = useGetImgCountQuery({});
  console.log(UserCountData?.totalDataCount);

  // Motion value for count
  const countImg = useMotionValue(0);
  const countUser = useMotionValue(0);
  const countPhotographer = useMotionValue(0);

  // Local state to store the rounded value of counts
  const [roundedImgCount, setRoundedImgCount] = useState(0);
  const [roundedPhotographerCount, setRoundedPhotographerCount] = useState(0);
  const [roundedUserCount, setRoundedUserCount] = useState(0);

  // Listen to count changes and update the rounded count states
  useMotionValueEvent(countImg, "change", (latest: any) => {
    setRoundedImgCount(Math.round(latest)); // Update the state to trigger a re-render
  });

  useMotionValueEvent(countPhotographer, "change", (latest: any) => {
    setRoundedPhotographerCount(Math.round(latest)); // Update the state to trigger a re-render
  });

  useMotionValueEvent(countUser, "change", (latest: any) => {
    setRoundedUserCount(Math.round(latest)); // Update the state to trigger a re-render
  });

  // Trigger count animation immediately (without the "on view" check)
  useEffect(() => {
    // Animate Img count to 1000 at a faster speed
    const controlsImg = animate(countImg, ImgCountData?.totalDataCount || 0, { duration: 4 });

    // Animate Photographer count to 10 at a slower speed
    const controlsPhotographer = animate(countPhotographer, 10, { duration: 6 });

    const controlsUser = animate(countUser, UserCountData?.totalDataCount || 0, { duration: 6 });

    return () => {
      controlsImg.stop();
      controlsPhotographer.stop();
      controlsUser.stop();
    };
  }, [ImgCountData?.totalDataCount, UserCountData?.totalDataCount]);

  return (
    <section className="mt-20 max-md:mt-20">
      <h1
        id="title"
        className="font-Righteous text-5xl max-xl:text-3xl text-center text-black dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
          {Language === "BN" && (
            <span>
              আমাদের প্রভাব <br className="max-md:block hidden" />
            </span>
          )}
        </p>
        <p>{Language === "EN" && "Our Impact"}</p>
      </h1>
      <h1
        id="title2"
        className="font-Space mt-1 text-xl mx-auto max-lg:text-base max-md:w-[90%] w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
          {Language === "BN" &&
            "প্রতিটি সংখ্যা বলে এক গল্প—মুহূর্তের, দৃষ্টির, আর ভালোবাসার।"}
        </p>
        <p>
          {Language === "EN" &&
            "Every number tells a story—of moments, vision, and passion."}
        </p>
      </h1>
      <div className="w-full max-md:mt-5 mt-20 my-32 grid-cols-3  grid sm:px-10 relative max-md:grid-cols-1 px-5 gap-10 max-md:gap-5">
        <div className="absolute -right-10 top-10 items-center gap-x-3 max-lg:-right-24 max-lg:scale-90 rotate-45 flex">
          <div className="bg-light-primary-color w-[100px] rounded-3xl h-[100px]"></div>
        </div>
        <div className="absolute left-20 items-center gap-x-3 max-lg:-left-24 max-lg:scale-90 rotate-45 flex">
          <div className="bg-light-primary-color w-[70px] rounded-3xl h-[70px]"></div>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <Lottie className={`${Language === "BN" ? "max-w-[135px]" : "max-w-[120px]"}`} animationData={imgAnimation} />
          <Link href={"/AllImg"} className="focus:underline"><motion.pre
            className="text-2xl font-Righteous text-light-primary-color dark:text-dark-primary-color"
          >
            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
              <span className="font-Bayon">{roundedImgCount}+</span>&nbsp;
              {Language === "BN" ? "ইমেজ/ছবি" : " Images/Photos"}
            </p>
          </motion.pre></Link>
          <p className="text-center text-light-primary-color dark:text-dark-primary-color text-sm mt-1 font-Space">
            <span className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
              {Language === "BN"
                ? "আপনি ফ্রি ছবি ডাউনলোড ব্যক্তিগত ও ব্যবসায়িক ফটো ডিজাইনে ব্যবহার করতে           পারবেন, তবে এটি কোনো ওয়েবসাইট, ক্লাউড স্টোরেজ এর মাধ্যমে শেয়ার করা           নিষিদ্ধ।"
                : " You can download free images for personal and commercial photo design,        but sharing them via any website or cloud storage is prohibited."}
            </span>
          </p>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <Lottie className="max-w-[200px]" animationData={peopleAnimation} />
          <h1 className="text-2xl font-Righteous text-light-primary-color dark:text-dark-primary-color">
            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
              <span className="font-Bayon">{roundedUserCount}+</span>&nbsp;
              {Language === "BN" ? "সদস্য/অ্যাকাউন্ট" : " Members/Accounts"}
            </p>
          </h1>
          <p className="text-center text-light-primary-color dark:text-dark-primary-color text-sm mt-1 font-Space ">
            <span className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
              {Language === "BN"
                ? "যাদের অংশগ্রহণেই আমাদের ফটোগ্রাফি কমিউনিটি এত বড় হয়েছে! 📸✨ আপনাদের সৃষ্টিশীলতাই আমাদের অনুপ্রেরণা। সঙ্গে থাকুন, সুন্দর মুহূর্তগুলো শেয়ার করুন! ❤️"
                : " Thanks to their participation, our photography community has grown so much! 📸✨ Your creativity is our inspiration. Stay tuned, share the beautiful moments!"}
            </span>
          </p>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <div className="max-w-[200px] overflow-hidden h-[135px] relative">
            <div className="relative w-full h-full -top-8">
              <Lottie className="object-cover rounded-b-3xl w-[200px]" animationData={menLight} />
            </div>
          </div>
          <h1 className="text-2xl font-Righteous text-light-primary-color dark:text-dark-primary-color">
            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
              <span className="font-Bayon">{roundedPhotographerCount}+</span>&nbsp;
              {Language === "BN" ? "দক্ষ ফটোগ্রাফার" : "skilled Photographer"}
            </p>
          </h1>
          <p className="text-center text-light-primary-color dark:text-dark-primary-color text-sm mt-1 font-Space">
            <span className={`${Language === "BN" && "font-BanglaSubHeading "}`}>
              {Language === "BN"
                ? " অভিজ্ঞ ফটোগ্রাফার রয়েছেন, যারা ফটোগ্রাফি বিষয়ে দিচ্ছেন মূল্যবান পরামর্শ ও গাইডলাইন। 📸✨ আপনার দক্ষতা বাড়াতে ও সেরা মুহূর্ত ক্যামেরাবন্দি করতে আমাদের সঙ্গে থাকুন!"
                : "Experienced photographers who provide valuable advice and guidelines on photography. 📸✨ Join us to improve your skills and capture the best moments!"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Info;
