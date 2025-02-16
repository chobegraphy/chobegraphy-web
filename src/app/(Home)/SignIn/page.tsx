"use client";

import SignInForm from "@/components/PageWise/SignIn/SIgnInForm";
import useAuthData from "@/ExportedFunctions/useAuthData";
import { MdOutlineCamera } from "react-icons/md";
const SignInPage = () => {
  const { GoogleSignIn } = useAuthData();
  return (
    <div>
      <div className="  min-h-screen dark:bg-gradient-to-br from-black to-light-primary-color h-full flex justify-center items-center">
        <div className=" w-full  max-w-6xl xl:w-[90%] h-full   p-0 gap-0 grid lg:grid-cols-2  mx-auto">
          <div
            className={`mt-10 max-lg:hidden scale-90 lg:h-[530px] xl:h-[500px] relative flex items-center max-xl:top-5 justify-center   right-10`}
          >
            <div className="absolute w-[100px] rounded-3xl rotate-45 h-[100px] bg-green-700 max-md:hidden top-[5px] max-md:top-[770px] max-lg:top-[230px] max-lg:right-[210px] max-md:w-[70px] max-md:h-[70px] right-[323px] max-md:right-[270px] max-lg:hidden "></div>

            <div className="absolute  -right-10 top-0.5 items-center gap-x-3 max-lg:-right-24 max-lg:scale-75 max-md:-right-14 max-md:scale-75 max-md:top-[-192px]  max-lg:top-[-550px] rotate-45 flex">
              <div className="bg-gray-500 w-[100px] rounded-3xl h-[100px] relative top-8 "></div>
              <div className="bg-gray-600 w-[150px] rounded-3xl h-[150px]  "></div>
              <div className="bg-gray-800 w-[100px] rounded-3xl h-[100px]  relative -top-2 "></div>
            </div>
            <div className="absolute  right-10 -bottom-10 items-center max-xl:-bottom-0 gap-x-3 -rotate-45 max-md:-bottom-7 max-md:right-[90px] max-md:scale-75 max-md:top-[25px] max-lg:opacity-100 max-xl:opacity-35  flex">
              <div className="bg-light-primary-color w-[100px] rounded-3xl max-lg:hidden max-md:block h-[100px]  "></div>
              <div className="bg-light-primary-color w-[150px] rounded-3xl max-lg:hidden max-md:block h-[150px]  "></div>
            </div>
            <div className="w-[124px] top-28 left-32 h-[124px]  origin-top-left max-lg:hidden p-3 absolute rounded-full  md:hidden max-sm:left-24 max-sm:opacity-30 bg-light-primary-color rotate-[150deg] ">
              <div className="bg-light-primary-color outline-dashed outline-dark-primary-color  animate-spin w-full h-full rounded-full"></div>
              <MdOutlineCamera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-white" />
            </div>
            <div
              className="absolute w-[200px] rounded-3xl rotate-45 h-[200px] bg-red-500 top-[100px] max-md:top-[-107px] max-lg:top-[-470px] 
                       max-lg:scale-75
                       max-lg:right-[90px] max-md:scale-95 right-[190px] max-md:h-[150px] max-md:w-[150px] max-md:right-[170px]"
            ></div>
            <div className="absolute w-[90px] rounded-3xl rotate-45 h-[90px]  bg-red-900 top-[205px] max-md:top-[-23px] max-lg:top-[230px] max-lg:right-[210px] right-[70px] max-lg:hidden max-md:block max-md:right-[74px]"></div>
            <div className="absolute w-[60px] rounded-xl rotate-45 h-[60px]  max-lg:hidden max-md:block bg-red-200 top-[270px] max-md:top-[210px] max-lg:top-[230px] max-lg:right-[210px] right-[160px] max-md:right-[170px]"></div>
            <div className="absolute w-[60px] rounded-xl rotate-45 h-[60px] max-xl:right-[214px] max-lg:hidden max-md:block  bg-red-200 top-[320px] max-md:top-[-255px] max-lg:top-[230px] max-lg:right-[210px] right-[210px] max-md:right-[133px]"></div>
          </div>

          {/* Register Form */}
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
