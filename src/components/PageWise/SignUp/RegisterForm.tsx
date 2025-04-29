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

import { compressImg } from "@/components/shared/CompressImg/CompressImg";
import { useUploadProfilePictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadUserPhoto/ApiSlice";
import "./SignUp.css";
const RegisterForm = () => {
  const { GoogleSignIn, EmailPassWordSignUp, setUser } = useAuthData();
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [gbuttonLoading, setGbuttonLoadin] = useState(false);
  const [showPass, setShowpass] = useState(false);
  const [fileName, setFileName] = useState<any>(null);
  const [Imgfile, setImgFile] = useState<any>(null);
  const router = useRouter();

  // redux writing
  const Language =
    typeof window !== "undefined"
      ? localStorage.getItem("Language") ?? "BN"
      : "BN";

  const [uploadProfilePictureMutation] = useUploadProfilePictureMutation();


  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    let compressedFile;
    const fileSizeInBytes = file.size;
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

    // If the file size is greater than 4MB, compress it
    if (parseFloat(fileSizeInMB) > 25) {
      toast.error(Language === "EN" ? "File size exceeds 25MB. Please upload a smaller file than 25MB." : "ফাইলের আকার 25MB এর বেশি। দয়া করে 25MB এর চেয়ে ছোট একটি ফাইল আপলোড করুন।")
      return;
    }
    if (parseFloat(fileSizeInMB) > 20 && parseFloat(fileSizeInMB) <= 25) {
      compressedFile = await compressImg({ file, quality: 0.7 }); // Compress the image
    } else if (parseFloat(fileSizeInMB) > 15 && parseFloat(fileSizeInMB) <= 20) {
      compressedFile = await compressImg({ file, quality: 0.8 });
    }
    else if (parseFloat(fileSizeInMB) > 10 && parseFloat(fileSizeInMB) <= 15) {
      compressedFile = await compressImg({ file, quality: 0.9 });
    }
    else if (parseFloat(fileSizeInMB) > 4.5 && parseFloat(fileSizeInMB) <= 10) {
      compressedFile = await compressImg({ file, quality: 0.95 });
    }
    else {
      compressedFile = await compressImg({ file, quality: 1 });
    }


    // Set the compressed image file
    setImgFile(compressedFile);
  };

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    setbuttonLoading(true);
    try {
      const firebaseData = await EmailPassWordSignUp(data?.email, data?.password);

      const formData = new FormData();
      formData.append('photo', Imgfile);
      formData.append('filename', fileName);
      let uploadedImgUrl; // Use a local variable
      const response = await uploadProfilePictureMutation({ formData }).unwrap();

      uploadedImgUrl = response.imageUrl;

      const userData = {
        name: data.name,
        email: data.email,
        picture: uploadedImgUrl,
      };

      const response2 = await axios.post(
        BaseApiUrl + "/add-user",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );


      setUser(response2.data.data);
      toast.success(Language === "BN" ? "নতুন ব্যবহারকারী যুক্ত হয়েছে" : "New User Added Successfully");

      const redirectUrl = localStorage.getItem('redirectUrl') || '/';
      localStorage.removeItem('redirectUrl');
      router.push(redirectUrl);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.message?.split("Firebase:")[1] || "An error occurred", { id: "5" });
    } finally {
      setbuttonLoading(false);
    }
  };

  // DONE:GOOGLE LOGIN::>
  const handleGoogleLogin = () => {
    setGbuttonLoadin(true);
    GoogleSignIn()
      .then(async (firebaseData) => {


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
          toast.success(
            Language === "BN"
              ? "নতুন ব্যবহারকারী যুক্ত হয়েছে"
              : "New User Added Successfully"
          );

          setUser(response.data.data);
          // Redirect to the saved route or the home page
          const redirectUrl = localStorage.getItem('redirectUrl') || '/';
          localStorage.removeItem('redirectUrl');
          router.push(redirectUrl);
        } catch (error) {
          console.error("Error during backend registration:", error);
        }

        setGbuttonLoadin(false);
      })
      .catch((error) => {
        toast.error(error.message.split("Firebase:")[1], {
          id: "5",
        });
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
                  <button type="button" className="btn btn-primary bg-light-primary-color text-dark-primary-color dark:text-light-primary-color dark:bg-dark-primary-color border-none dark:hover:text-white font-VarelaRound dark:hover:bg-light-secondary-color tracking-wider flex items-center rounded-xl py-4 px-7">
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
              className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
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
                    ? "নতুন পাসওয়ার্ড লিখুন"
                    : "Enter new password"
                }
                className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
                  } input mt-1 w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-4`}
                required
              />
              <button
                onClick={() => setShowpass(!showPass)}
                type="button"
                className="absolute   px-4 py-4 rounded-lg lg:right-[10px] right-1 transform duration-300 top-0 -bottom-1 flex items-center  justify-center"
              >
                {showPass === false ? (
                  <FiEyeOff className="text-xl dark:text-dark-primary-color transform duration-300 font-bold" />
                ) : (
                  <FiEye className="text-xl dark:text-dark-primary-color transform duration-300 font-bold" />
                )}
              </button>
            </div>
          </div>
          <div className="form-control mt-3.5">
            <label htmlFor="password" className="label ">
              <span className="text-xl text-light-primary-color dark:text-dark-primary-color font-Righteous font-bold">
                <span className="font-BanglaHeading">
                  {Language === "BN" && "প্রোফাইল ছবি"}
                </span>
                {Language === "EN" && "Profile Picture"}
              </span>
            </label>
            <div className="relative border-y-2 h-full mt-1 bg-[#ffffff] dark:bg-[#121212] cursor-pointer flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
                  } opacity-0 h-full input  w-full  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  z-0   py-2`}
                required
              />
              <h1 className="absolute top-0 left-5 text-[#8a91a0] bottom-0 flex pointer-events-none items-center z-0 justify-center">
                {
                  Imgfile === null ? (
                    <span> <span className="font-BanglaSubHeading">
                      {Language === "BN" && "একটি ছবি নির্বাচন করুন"}
                    </span>
                      {Language === "EN" && "select a  picture"}</span>
                  ) : (
                    <span>{fileName}</span>
                  )
                }
              </h1>
              <button type="button" onClick={
                () => {
                  if (Imgfile !== null) {

                    Imgfile(null);
                  }
                }
              } className="absolute top-0  right-5  bottom-0 flex items-center  justify-center">
                {
                  Imgfile === null && <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`${Language === "BN" ? "font-BanglaSubHeading" : "font-Space"
                      } opacity-0 h-full input  w-full absolute  border-x-0 px-5 border-y-2 outline-none text-light-primary-color dark:text-dark-primary-color  py-2`}
                    required
                  />
                }
                <LuPlus className={`${Imgfile !== null && "rotate-45"} text-xl bg-dark-primary-color rounded-full w-6 h-6  dark:text-light-primary-color transform duration-300 font-bold `} /></button>
            </div>
          </div>
          <div className="form-control mt-6">
            {buttonLoading === true ? (
              <div>
                <button type="button" className="btn btn-primary dark:text-light-primary-color dark:bg-dark-primary-color border-none flex bg-light-primary-color text-dark-primary-color flex-row-reverse items-center gap-x-2  tracking-wider rounded-xl py-4 px-7">
                  <ImSpinner
                    className={`text-lg animate-spin `}
                  />
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
