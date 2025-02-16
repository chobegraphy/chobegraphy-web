import { BaseApiUrl } from "@/ExportedFunctions/BaseApiUrl";
import useAuthData from "@/ExportedFunctions/useAuthData";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./SignUp.css";
const RegisterForm = () => {
  const { GoogleSignIn, EmailPassWordSignUp } = useAuthData();
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [gbuttonLoading, setGbuttonLoadin] = useState(false);
  const [showPass, setShowpass] = useState(false);
  // redux writing
  const Language = localStorage?.getItem("Language") ?? "BN";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setbuttonLoading(true);
    EmailPassWordSignUp(data?.email, data?.password)
      .then(async (firebaseData) => {
        console.log(firebaseData);

        // Firebase registration success, now send data to your backend
        const userData = {
          name: data.name,
          email: data.email,
          picture: "",
        };

        try {
          const response = await axios.post(
            BaseApiUrl + "/add-user",
            userData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          // Handle response from the backend if needed (e.g., saving additional data)
          console.log(
            "User registered successfully on backend:",
            response.data
          );
        } catch (error) {
          console.error("Error during backend registration:", error);
        }

        setbuttonLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setbuttonLoading(false);
      });
    console.log(data);
  };
  // DONE:GOOGLE LOGIN::>
  const handleGoogleLogin = () => {
    setGbuttonLoadin(true);
    GoogleSignIn()
      .then(async (firebaseData) => {
        console.log(firebaseData);

        const userData = {
          name: firebaseData.user.displayName || "Unknown",
          email: firebaseData.user.email,
          picture: firebaseData.user.photoURL || "",
        };

        try {
          const response = await axios.post(
            BaseApiUrl + "/add-user",
            userData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log(
            "User registered successfully on backend:",
            response.data
          );
        } catch (error) {
          console.error("Error during backend registration:", error);
        }

        setGbuttonLoadin(false);
      })
      .catch((error) => {
        console.log(error);
        setGbuttonLoadin(false);
      });
  };

  return (
    <div className="">
      <div className="flex flex-shrink-0 w-full justify-center   py-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-[420px] mx-[10px] p-[30px] lg:mx-auto border-none"
        >
          <h1 className="text-center font-KaushanScript font-bold dark:text-dark-primary-color  text-3xl">
            {Language === "BN" && (
              <span className="font-BanglaHeading">
                ছবিগ্রাফিতে সাইন আপ করুন
              </span>
            )}
            {Language === "EN" && (
              <span>
                Sign Up to <span className=" ">Chobegraphy</span>
              </span>
            )}
          </h1>
          <p className="font-Space text-center text-light-primary-color dark:text-dark-primary-color/70 mb-6">
            <span className="font-BanglaSubHeading mt-2">
              {Language === "BN" &&
                "একটি অ্যাকাউন্ট তৈরি করতে আপনার বিবরণ লিখুন"}
            </span>
            {Language === "EN" && "Enter your details to create an account"}
          </p>
          <section>
            <div className="form-control flex justify-center mt-0">
              {gbuttonLoading === true ? (
                <div>
                  <button className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider flex items-center rounded-xl py-4 px-7">
                    <div className="mt-0.5">
                      <span className="font-BanglaHeading">
                        {Language === "BN" && "লোডিং"}
                      </span>
                      {Language === "EN" && "Loading"}
                    </div>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7"
                  >
                    <BsGoogle /> <span className="mt-1"></span>
                  </button>
                </div>
              )}
            </div>
            <div className="mt-7 gap-x-5 items-center justify-center flex mb-5">
              <div className="divider  text-2xl  text-light-primary-color dark:text-dark-primary-color/90">
                <span className="font-BanglaHeading">
                  {Language === "BN" && "অথবা সাইন আপ করুন"}
                </span>
                {Language === "EN" && "Or Sign up with"}
              </div>
            </div>
          </section>
          <div className="form-control flex flex-col">
            <label htmlFor="name" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                <span className="font-BanglaHeading">
                  {Language === "BN" && "নাম"}
                </span>
                {Language === "EN" && "Name"}
              </span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder={
                Language === "BN" ? "আপনার নাম লিখুন" : "Enter your name"
              }
              className={`${
                Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
              } input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-4`}
              required
            />
          </div>
          <div className="form-control mt-3.5 flex flex-col">
            <label htmlFor="email" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                <span className="font-BanglaHeading">
                  {Language === "BN" && "ইমেল"}
                </span>
                {Language === "EN" && "Email Address"}
              </span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder={
                Language === "BN"
                  ? "আপনার ইমেল লিখুন"
                  : "Enter your email address"
              }
              className={`${
                Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
              } input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-4`}
              required
            />
          </div>
          <div className="form-control mt-3.5">
            <label htmlFor="password" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                <span className="font-BanglaHeading">
                  {Language === "BN" && "পাসওয়ার্ড"}
                </span>
                {Language === "EN" && "Password"}
              </span>
            </label>
            <div className="relative h-full mt-1">
              <input
                type={`${showPass === true ? "text" : "password"}`}
                {...register("password")}
                placeholder={
                  Language === "BN"
                    ? "নতুন পাসওয়ার্ড লিখুন"
                    : "Enter new password"
                }
                className={`${
                  Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
                } input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-4`}
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
                <button className="btn btn-primary dark:text-light-primary-color dark:bg-dark-primary-color border-none flex bg-light-primary-color text-dark-primary-color flex-row-reverse items-center gap-x-2  tracking-wider rounded-xl py-4 px-7">
                  <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                  <div className="mt-0.5">
                    <div className="mt-0.5">
                      <span className="font-BanglaHeading">
                        {Language === "BN" && "লোডিং"}
                      </span>
                      {Language === "EN" && "Loading"}
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7">
                  <span className="font-BanglaHeading">
                    {Language === "BN" && "সাইন আপ"}
                  </span>
                  {Language === "EN" && "Sign up"}
                </button>
              </div>
            )}
          </div>

          <div className="form-control mt-6 max-lg:mt-10 text-center lg:text-[18px] font-VarelaRound  dark:text-dark-primary-color/70 text-light-secondary-color">
            <h1>
              <span className="font-BanglaHeading">
                {Language === "BN" && "ইতিমধ্যে নিবন্ধিত?"}
              </span>
              {Language === "EN" && "Already registered?"}{" "}
              <Link
                href="/SignIn"
                className="dark:text-dark-primary-color text-light-primary-color underline underline-offset-2"
              >
                <span className="font-BanglaHeading ">
                  {Language === "BN" && "সাইন ইন"}
                </span>
                {Language === "EN" && "Sign In"}
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
