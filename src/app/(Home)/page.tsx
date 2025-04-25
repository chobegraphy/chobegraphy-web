"use client";
import Hero from "@/components/PageWise/Home/Hero";
import Info from "@/components/PageWise/Home/Info";
import Popular from "@/components/PageWise/Home/Popular";
import RecentImg from "@/components/PageWise/Home/RecentImg";

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
        <RecentImg />
        <div className=" w-full max-w-7xl mx-auto ">
          {/* <DistrictGallery /> */}

        </div>
        {/* <LightroomPresets /> */}
      </div>
      <div className=" w-full max-w-7xl mx-auto ">
        {/* <Team /> */}

      </div>
    </main>
  );
}
