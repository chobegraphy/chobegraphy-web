"use client";

import RegisterForm from "@/components/PageWise/SignUp/RegisterForm";
const SignUpPage = () => {
  return (
    <div>
      <div className="  min-h-screen dark:bg-gradient-to-br from-black to-light-primary-color h-full flex justify-center items-center">
        <div className=" w-full h-full   p-0 gap-0 grid lg:grid-cols-2">
          <div className="hidden bg-[#07332F]  lg:flex items-center">
            <div className="w-full flex justify-center  ">
              {/* <img className="lg:hidden" src={animationsm} alt="" />
              <img
                className="w-9/12 mx-auto  lg:block hidden"
                src={animationlg}
                alt=""
              /> */}
            </div>
          </div>

          {/* Register Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
