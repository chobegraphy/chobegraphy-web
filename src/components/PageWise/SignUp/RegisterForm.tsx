import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./SignUp.css";
const RegisterForm = () => {
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [gbuttonLoading, setGbuttonLoadin] = useState(false);
  const [showPass, setShowpass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setbuttonLoading(true);
  };
  // DONE:GOOGLE LOGIN::>
  const handleGoogleLogin = () => {};
  return (
    <div>
      <div className="flex flex-shrink-0 w-full justify-center   py-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-[420px] mx-[10px] p-[30px] lg:mx-auto border-none"
        >
          <h1 className="text-center font-KaushanScript font-bold dark:text-dark-primary-color  text-3xl">
            Sign Up to <span className=" ">Chobegraphy</span>
          </h1>
          <p className="font-Space text-center text-light-primary-color dark:text-dark-primary-color/70 mb-8">
            Enter your details to create an account
          </p>
          <section>
            <div className="form-control flex justify-center mt-0">
              {gbuttonLoading === true ? (
                <div>
                  <button className="btn btn-primary bg-[#F7A582] border-none text-white font-VarelaRound hover:bg-[#07332F] tracking-wider rounded-xl h-[66px]">
                    <div className="loader">
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                    loading
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-primary dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7"
                  >
                    <BsGoogle /> <span className="mt-1"></span>
                  </button>
                </div>
              )}
            </div>
            <div className="mt-7 gap-x-5 items-center justify-center flex mb-5">
              <div className="divider  text-2xl  text-light-primary-color dark:text-dark-primary-color/90">
                Or Sign up with
              </div>
            </div>
          </section>
          <div className="form-control flex flex-col">
            <label htmlFor="name" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                Name
              </span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color font-Space py-4"
              required
            />
          </div>
          <div className="form-control mt-3.5 flex flex-col">
            <label htmlFor="email" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                Email Address
              </span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              className="input w-full mt-1 border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color font-Space py-4"
              required
            />
          </div>
          <div className="form-control mt-3.5">
            <label htmlFor="password" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                Password
              </span>
            </label>
            <div className="relative h-full mt-1">
              <input
                type={`${showPass === true ? "text" : "password"}`}
                {...register("password")}
                placeholder="Password"
                className="input w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color font-Space py-4"
                required
              />
              <button
                onClick={() => setShowpass(!showPass)}
                type="button"
                className="absolute   px-4 py-4 rounded-lg lg:right-[10px] right-1 transform duration-300 top-0 bottom-0"
              >
                {showPass === false ? (
                  <FiEyeOff className="text-xl dark:text-dark-primary-color transform duration-300 font-bold" />
                ) : (
                  <FiEye className="text-xl dark:text-dark-primary-color transform duration-300 font-bold" />
                )}
              </button>
            </div>
          </div>
          <div className="form-control mt-6">
            {buttonLoading === true ? (
              <div>
                <button className="btn btn-primary dark:text-light-primary-color dark:bg-dark-primary-color border-none flex flex-row-reverse items-center gap-x-2  tracking-wider rounded-xl py-4 px-7">
                  <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                  <div className="mt-0.5">loading</div>
                </button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="form-control mt-6 max-lg:mt-10 text-center lg:text-[18px] font-VarelaRound  dark:text-dark-primary-color/70 text-light-secondary-color">
            <h1>
              Already registered?{" "}
              <Link
                href="/Login"
                className="dark:text-dark-primary-color text-light-primary-color"
              >
                SIGN IN
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
