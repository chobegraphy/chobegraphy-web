"use client";
import Config from "@/components/shared/ConfigUpdates/Config";
import Gcam from "@/components/shared/Navbar/GcamUpdates/Gcam";

const Updates = () => {
  return (
    <div className=" min-h-[500px]  max-sm:p-0 relative p-6">
      {/*-> Rahat code */}
      <Gcam />
      <Config />
    </div>
  );
};

export default Updates;
