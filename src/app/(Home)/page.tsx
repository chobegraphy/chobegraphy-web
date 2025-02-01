import Hero from "@/components/PageWise/Home/Hero";
import Info from "@/components/PageWise/Home/Info";

export default function Home() {
  return (
    <main className="flex bg-black-100 justify-center items-center flex-col overflow-hidden mx-auto  ">
      <div className="max-w-7xl w-full mx-auto sm:px-10 px-5">
        <Hero />
      </div>
      <Info />
      {/* <AboutUs /> */}
    </main>
  );
}
