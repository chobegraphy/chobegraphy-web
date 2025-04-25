"use client";

import SignInForm from "@/components/PageWise/SignIn/SIgnInForm";
import SharedHero from "@/components/shared/Hero/SharedHero";
import useAuthData from "@/ExportedFunctions/useAuthData";
const SignInPage = () => {
  const { GoogleSignIn } = useAuthData();
  return (
    <div>
      <div className="  min-h-screen dark:bg-gradient-to-br from-black to-light-primary-color h-full flex justify-center items-center">
        <div className=" w-full  max-w-6xl xl:w-[90%] h-full   p-0 gap-0 grid lg:grid-cols-2  mx-auto">
          <div className="scale-90 flex items-center justify-center w-full max-lg:hidden"> <SharedHero /></div>

          {/* Register Form */}
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
