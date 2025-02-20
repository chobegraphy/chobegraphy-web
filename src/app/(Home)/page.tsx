"use client";
import DistrictGallery from "@/components/PageWise/Home/DistrictGallery";
import Featured from "@/components/PageWise/Home/Featured";
import Hero from "@/components/PageWise/Home/Hero";
import HomeGallery from "@/components/PageWise/Home/HomeGallery";
import Info from "@/components/PageWise/Home/Info";

export default function Home() {
  return (
    <main className="flex bg-black-100 justify-center items-center flex-col overflow-hidden mx-auto  ">
      <div className="max-w-7xl w-full mx-auto sm:px-10 px-5">
        <Hero />
        <Featured />
      </div>
      <div className="max-w-7xl w-full mx-auto ">
        <Info />
      </div>

      <div className="max-w-7xl w-full mx-auto ">
        <HomeGallery />
        <DistrictGallery />
      </div>
    </main>
  );
}
