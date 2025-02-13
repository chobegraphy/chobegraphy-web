"use client";
import { useSelector } from "react-redux";

const Featured = () => {
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <section className="py-20 pt-32  ">
      <section id="title">
        <h1
          id="title"
          className="font-Righteous text-5xl max-xl:text-3xl text-center text-black dark:text-dark-primary-color"
        >
          <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
            {Language === "BN" && "সময়ের ফ্রেম, আলোর গল্প"}
          </p>
          <p>{Language === "EN" && "Frames of Time, Stories in Light"}</p>
        </h1>
        <h1
          id="title2"
          className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
        >
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" &&
              "প্রতিটি বন্দী মুহূর্ত এক একটি গল্প—রঙ, অনুভূতি আর অসীম আকাশের মাঝে হারিয়ে যান।"}
          </p>
          <p>
            {Language === "EN" &&
              "Every captured moment whispers a tale—wander through colors, emotions, and endless skies"}
          </p>
        </h1>
      </section>

      <div className="relative">
        <section className="grid lg:w-[85%] xl:w-[70%] mx-auto mt-10 gap-1 relative grid-cols-3 grid-rows-4">
          <div className="bg-red-500 h-[230px] col-span-2  max-md:h-[110px] border-2"></div>
          <div className="bg-red-500 row-span-2 border-2 "></div>
          <div className="bg-red-500 max-md:h-[110px] h-[230px]  border-2"></div>
          <div className="bg-red-500 max-md:h-[110px] h-[230px]  border-2"></div>
          <div className="bg-red-500 row-span-2 border-2 "></div>
          <div className="bg-red-500 max-md:h-[110px] h-[230px]  border-2"></div>
          <div className="bg-red-500 max-md:h-[110px] h-[230px]  border-2"></div>
          <div className="bg-red-500 max-md:h-[110px] h-[230px]  border-2"></div>
          <div className="bg-red-500 max-md:h-[110px] h-[230px]  border-2"></div>
        </section>
        <div className="bg-red-500 h-[260px] border-2 top-[40%] max-lg:scale-[85%]  w-[260px] max-md:translate-x-1/2 rotate-[20deg]   max-lg:left-[200px] max-md:left-[34px] max-md:top-[37%] max-md:w-[130px] max-md:h-[130px] max-xl:left-[330px] left-[452px]  right-0 absolute "></div>
      </div>
    </section>
  );
};

export default Featured;
