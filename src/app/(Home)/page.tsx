"use client";
import DistrictGallery from "@/components/PageWise/Home/DistrictGallery";
import Hero from "@/components/PageWise/Home/Hero";
import HomeGallery from "@/components/PageWise/Home/HomeGallery";
import Info from "@/components/PageWise/Home/Info";
import LightroomPresets from "@/components/PageWise/Home/LightroomPresets";
import Popular from "@/components/PageWise/Home/Popular";
import Team from "@/components/PageWise/Home/Team";

export default function Home() {
  return (
    <main className="flex bg-black-100 justify-center items-center flex-col overflow-hidden mx-auto  ">
      <div className="max-w-7xl w-full mx-auto sm:px-10 px-5">
        <Hero />
        {/* <Featured /> */}
      </div>
      <div className="max-w-7xl w-full mx-auto ">
        <Info />
        <Popular />
      </div>

      <div className=" w-full mx-auto ">
        <HomeGallery />
        <div className=" w-full max-w-7xl mx-auto ">
          <DistrictGallery />

        </div>
        <LightroomPresets />
      </div>
      <div className=" w-full max-w-7xl mx-auto ">
        <Team />

      </div>
    </main>
  );
}
