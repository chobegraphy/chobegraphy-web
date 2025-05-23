import { BaseApiUrl } from "@/ExportedFunctions/BaseApiUrl";
import useAuthData from "@/ExportedFunctions/useAuthData";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { LuPlus } from "react-icons/lu";
import "./SignUp.css";
const SignInForm = () => {
  const { GoogleSignIn, EmailPasswordLogin, passwordReset, setUser } = useAuthData();
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [gbuttonLoading, setGbuttonLoadin] = useState(false);
  const [showPass, setShowpass] = useState(false);
  const [ForgotPassEmail, setForgotPassEmail] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
  const router = useRouter();
  // redux writing
  const Language =
    typeof window !== "undefined"
      ? localStorage.getItem("Language") ?? "BN"
      : "BN";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setbuttonLoading(true);
    EmailPasswordLogin(data?.email, data?.password)
      .then(async (firebaseData) => {


        toast.success(
          Language === "BN" ? "সাইন ইন সফল হয়েছে" : "Sign In Successfull"
        );
        // Redirect to the saved route or the home page
        const redirectUrl = localStorage.getItem('redirectUrl') || '/';
        localStorage.removeItem('redirectUrl');
        router.push(redirectUrl);
        setbuttonLoading(false);
      })
      .catch((error) => {

        setbuttonLoading(false);
        toast.error(error.message.split("Firebase:")[1], {
          id: "5",
        });
      });
  };
  // DONE:GOOGLE LOGIN::>
  const handleGoogleLogin = () => {
    setGbuttonLoadin(true);
    GoogleSignIn()
      .then(async (data) => {

        setGbuttonLoadin(false);
        const userData = {
          name: data.user.displayName || "Unknown",
          email: data.user.email,
          picture: data.user.photoURL || "",
        };
        const response = await axios.post(
          BaseApiUrl + "/add-user",
          userData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setUser(response.data.data);
        toast.success(
          Language === "BN" ? "সাইন ইন সফল হয়েছে" : "Sign In Successfull"
        );
        // Redirect to the saved route or the home page
        const redirectUrl = localStorage.getItem('redirectUrl') || '/';
        localStorage.removeItem('redirectUrl');
        router.push(redirectUrl);
      })
      .catch((error) => {

        setGbuttonLoadin(false);
        toast.error(error.message.split("Firebase:")[1], {
          id: "4",
        });
      });
  };

  const forgotPassSubmit = () => {
    setbuttonLoading(true);
    if (ForgotPassEmail === "") {
      setbuttonLoading(false);
      toast.error(
        Language === "BN" ? "আপনার ইমেইল লিখুন" : "Enter Your Email",
        {
          id: "5",
        }
      );
      return;

    }
    passwordReset(ForgotPassEmail)
      .then(() => {
        toast.success(
          Language === "BN" ? "পাসওয়ার্ড রিসেট লিঙ্কের জন্য আপনার ইমেল চেক করুন" : "Check your email for password reset link"
        );
        setbuttonLoading(false);
        setForgotPass(false);
        setForgotPassEmail("");
      })
      .catch((error) => {
        setbuttonLoading(false);

        toast.error(error.message.split("Firebase:")[1], {
          id: "5",
        });
      });
  }
  return (
    <div className="">
      {
        !forgotPass ? <section>
          <div className="flex flex-shrink-0 w-full justify-center   py-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:w-[420px] mx-[10px] p-[30px] lg:mx-auto border-none"
            >
              <h1 className="text-center font-KaushanScript font-bold dark:text-dark-primary-color  text-3xl">
                {Language === "BN" && (
                  <span className="font-BanglaHeading">
                    ছবিগ্রাফিতে সাইন ইন করুন
                  </span>
                )}
                {Language === "EN" && (
                  <span>
                    Sign In to <span className=" ">Chobegraphy</span>
                  </span>
                )}
              </h1>
              <p className="font-Space text-center text-light-primary-color dark:text-dark-primary-color/70 mb-6">
                <span className="font-BanglaSubHeading mt-2">
                  {Language === "BN" && "সাইন ইন করতে আপনার তথ্য দিন।"}
                </span>
                {Language === "EN" && "Enter your credentials to sign in"}
              </p>
              <section>
                <div
                  id="goodleButton"
                  className="form-control flex justify-center mt-0"
                >
                  {gbuttonLoading === true ? (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7"
                      >
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
                      {Language === "BN" && "অথবা সাইন ইন করুন"}
                    </span>
                    {Language === "EN" && "Or Sign in with"}
                  </div>
                </div>
              </section>

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
                  className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
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
                        ? "আপনার পাসওয়ার্ড লিখুন"
                        : "Enter your password"
                    }
                    className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
                      } input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-4`}
                    required
                  />
                  <button
                    onClick={() => setShowpass(!showPass)}
                    type="button"
                    className="absolute   px-4 py-4 rounded-lg lg:right-[10px] right-1 transform duration-300 top-0 -bottom-0.5"
                  >
                    {showPass === false ? (
                      <FiEyeOff className="text-xl dark:text-dark-primary-color transform duration-300 font-bold" />
                    ) : (
                      <FiEye className="text-xl dark:text-dark-primary-color transform duration-300 font-bold" />
                    )}
                  </button>
                </div>
                <h1 className="text-right  text-[14px] font-VarelaRound mt-1">
                  <button
                    onClick={() => setForgotPass(!forgotPass)}
                    className="dark:text-dark-primary-color text-light-primary-color underline underline-offset-2"
                  >
                    <span className="font-BanglaHeading ">
                      {Language === "BN" && "পাসওয়ার্ড ভুলে গেছেন? "}
                    </span>
                    {Language === "EN" && "Forgot Password?"}
                  </button>
                </h1>
              </div>
              <div className="form-control mt-6">
                {buttonLoading === true ? (
                  <div>
                    <button className="btn btn-primary dark:text-light-primary-color dark:bg-dark-primary-color border-none flex flex-row-reverse items-center gap-x-2  tracking-wider rounded-xl py-4 px-7">
                      <ImSpinner
                        className={`text-lg animate-spin `}
                      />
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
                    <button className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7">
                      <span className="font-BanglaHeading">
                        {Language === "BN" && "সাইন ইন"}
                      </span>
                      {Language === "EN" && "Sign in"}
                    </button>
                  </div>
                )}
              </div>

              <div className="form-control mt-6 max-lg:mt-10 text-center lg:text-[18px] font-VarelaRound  dark:text-dark-primary-color/70 text-light-secondary-color">
                <h1>
                  <span className="font-BanglaHeading">
                    {Language === "BN" && "নতুন এখানে?"}
                  </span>
                  {Language === "EN" && "New here?"}{" "}
                  <Link
                    href="/SignUp"
                    className="dark:text-dark-primary-color text-light-primary-color underline underline-offset-2"
                  >
                    <span className="font-BanglaHeading ">
                      {Language === "BN" && "সাইন আপ "}
                    </span>
                    {Language === "EN" && "Sign Up"}
                  </Link>
                </h1>
              </div>
            </form>
          </div></section> : <section>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-shrink-0 w-full justify-center   py-5">
            <div

              className="lg:w-[420px] mx-[10px] p-[30px] lg:mx-auto border-none"
            >
              <h1 className="text-center font-KaushanScript font-bold dark:text-dark-primary-color  text-3xl">
                {Language === "BN" && (
                  <span className="font-BanglaHeading">
                    ছবিগ্রাফি একাউন্ট পুনরুদ্ধার করুন
                  </span>
                )}
                {Language === "EN" && (
                  <span>
                    Restore Chobegraphy Account
                  </span>
                )}
              </h1>



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
                  onPaste={(e) => {
                    setForgotPassEmail(e.clipboardData.getData('text'))
                  }}
                  onChange={(e) => setForgotPassEmail(e.target.value)}
                  placeholder={
                    Language === "BN"
                      ? "আপনার ইমেল লিখুন"
                      : "Enter your email address"
                  }
                  className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
                    } input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-4`}
                  required
                />
              </div>

              <div className="form-control mt-6">
                {buttonLoading === true ? (
                  <div>
                    <button className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl flex items-center gap-x-3 py-4 px-7">
                      <ImSpinner
                        className={`text-lg animate-spin `}
                      />
                      <div className="mt-0.5">
                        <span className="font-BanglaHeading">
                          {Language === "BN" && "লোডিং"}
                        </span>
                        {Language === "EN" && "Loading"}
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1">
                    <button onClick={() => forgotPassSubmit()} className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider rounded-xl py-4 px-7">
                      <span className="font-BanglaHeading">
                        {Language === "BN" && "পাসওয়ার্ড রিসেট ইমেল পান"}
                      </span>
                      {Language === "EN" && "Get password reset email"}
                    </button>
                    <button onClick={() => setForgotPass(false)} className="form-control   flex justify-center items-center text-center bg-light-primary-color dark:bg-dark-primary-color  rounded-xl w-fit p-4 border-2 border-light-secondary-color ">
                      <h1 className="dark:text-light-primary-color  rotate-45 text-dark-primary-color text-xl">
                        <LuPlus />
                      </h1>
                    </button>
                  </div>
                )}
              </div>


            </div>
          </form></section>
      }
    </div>
  );
};

export default SignInForm;
