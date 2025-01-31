import AboutUs from "@/components/PageWise/Home/AboutUs";
import Hero from "@/components/PageWise/Home/Hero";

export default function Home() {
  return (
    <main className="flex bg-black-100 justify-center items-center flex-col overflow-hidden mx-auto  sm:px-10 px-5">
      <div className="max-w-7xl w-full mx-auto">
        <Hero />
        <AboutUs />
      </div>
    </main>
  );
}
