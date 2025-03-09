"use client";
import CustomButton from "@/components/ui/CustomButton/CustomButton";
import { NavRoutes, ProfileRoutes } from "@/ExportedFunctions/NavRoutes";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";
import { IoIosArrowDown, IoMdMoon } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useAuth } from "../../../../Provider/AuthProvider";
import {
  setLanguage,
  SetLanguageBN,
  SetLanguageEN,
} from "../../../../Redux/Features/Language/Language";
import darklogo from "../../../Assets/logo/darklogo.png";
import logo from "../../../Assets/logo/logo.png";
import "./Nav.css";

const Navbar = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { user, logOut } = useAuth();
  // Location states
  const [country, setCountry] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const { setTheme } = useTheme();
  const [showProfileRoutes, setShowProfileRoutes] = useState(false);
  // Redux
  const Language = useSelector((state: any) => state.Language.value);
  const dispatch = useDispatch();
  console.log(Language);

  // Set language from local storage (on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("Language");

      if (storedLanguage) {
        dispatch(setLanguage(storedLanguage));
      }
    }
  }, [dispatch]);

  // Fetch location and set country
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setCountry(data.address?.country || "Country not found");
          } catch (err) {
            setError("Failed to fetch location details.");
          }
        },
        (error) => {
          // If geolocation is denied or fails, set the language to English
          setError("Geolocation permission denied or failed.");
          dispatch(setLanguage("EN")); // Set language to English if location is not allowed or an error occurs
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      dispatch(setLanguage("EN")); // Set language to English if geolocation is not supported
    }
  }, [dispatch]);


  // Set language based on country when country updates
  useEffect(() => {
    if (country) {
      const storedLanguage = localStorage.getItem("Language");

      if (!storedLanguage) {
        if (country === "Bangladesh") {
          dispatch(setLanguage("BN"));
        } else {
          dispatch(setLanguage("EN"));
        }
      }
    }
  }, [country, dispatch]);

  // Handle click outside to close menu
  useEffect(() => {
    if (!isOpen && !isOpen2) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTimeout(() => setIsOpen2(false), 200);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [divRef, isOpen, isOpen2]);

  // Disable scrolling when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen2 ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen2]);

  // Set theme from local storage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemPreference);
    }
  }, [setTheme]);
  const [theme, setTheme2] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);
  return (
    <div
      className={`flex  xl:backdrop-blur bg-dark-primary-color/80 dark:bg-black/80 z-50 bg-black-100 justify-between w-full items-center overflow-hidden sticky -top-0.5 mx-auto  sm:p-5 p-5 h-[65px] `}
    >
      {/*-> Rahat code */}
      <div className="transform duration-300  max-md:scale-90 dark:hidden max-md:-ms-4">
        <Image
          src={logo}
          className="h-[50px] max-md:ms-0.5 -ms-2  w-fit"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      <div className="max-md:scale-90 dark:block z-50 hidden max-md:-ms-4">
        <Image
          src={darklogo}
          className="h-[50px] max-md:ms-0.5 -ms-2  w-fit"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      <div className="w-fit max-xl:hidden flex items-center h-full">
        {
          NavRoutes.map((route, index) => <CustomButton key={index} className={"border-e-2 border-[#575757]"} path={route.path}>
            <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
              {Language === "BN" ? route?.bnName : route?.enName}
            </p>
          </CustomButton>)
        }

        <div className="flex items-center">
          <button
            onClick={() => {
              setLanguageOpen(!languageOpen);
            }}
            className="text-light-primary-color dark:text-dark-primary-color ms-2"
          >
            <FaLanguage className="text-3xl" />
          </button>
          <div
            className={`${languageOpen ? "w-full " : "w-0 -z-30 opacity-0"
              } transform duration-300 flex scale-90 items-center bg-light-primary-color p-0.5 rounded`}
          >
            <button
              onClick={() => dispatch(SetLanguageBN())}
              className={`${Language === "BN"
                ? "text-light-primary-color bg-dark-primary-color"
                : "bg-light-primary-color text-dark-primary-color"
                } text-sm font-BanglaHeading px-2 py-1 transform duration-300 rounded-s`}
            >
              বাংলা
            </button>
            <button
              onClick={() => dispatch(SetLanguageEN())}
              className={`${Language === "EN"
                ? "text-light-primary-color bg-dark-primary-color"
                : "bg-light-primary-color text-dark-primary-color"
                } text-sm px-2 py-1 transform duration-300 rounded-e`}
            >
              English
            </button>
          </div>
        </div>
        <div className="">
          <label className="switch">
            <span className="sun">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g className="fill-black dark:fill-white">
                  <circle r="5" cy="12" cx="12"></circle>
                  <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                </g>
              </svg>
            </span>
            <span className="moon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
              </svg>
            </span>
            <input
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              type="checkbox"
              className="input"
              checked={localStorage.getItem("theme") === "dark" ? true : false}
            />
            <span className="slider"></span>
          </label>
        </div>

        <Link href="/UploadPhoto"
          className={
            "border-2 py-1 xl:py-1.5 ms-5 px-6  xl:text-lg hover:bg-light-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color dark:border-dark-primary-color  dark:text-dark-primary-color hover:text-dark-primary-color transform duration-300 rounded text-light-primary-color border-light-primary-color"
          }
        >
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "আপলোড" : "Upload"}
          </p>
        </Link>

        {
          user && <div>
            <Image className="w-10 h-10 rounded-full hover:border-light-primary-color dark:hover:border-dark-primary-color/70 transform duration-200 border-2 border-light-secondary-color ms-5 " src={user?.picture} alt="" width={500} height={500} loading="lazy" />
          </div>
        }
      </div>

      {/* mobile Navebar */}
      <div
        role="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsOpen2(!isOpen2);
        }}
        className="xl:hidden"
      >
        <IoMenuSharp className="text-4xl" />
      </div>
      <div
        className={`${isOpen2 ? "h-[100dvh] w-screen opacity-100 " : "opacity-0"
          } fixed z-50 overflow-hidden top-0 left-0 bg-black/90`}
      >
        <div
          ref={divRef}
          className={`${isOpen ? "right-0" : "-right-[120%]"
            } absolute transform duration-500 bg-dark-primary-color dark:bg-gradient-to-br from-black to-light-primary-color w-3/4 border-s-2 p-4 border-[#575757]  max-w-[320px] h-full`}
        >
          <div className="w-full flex flex-col h-full ">
            <div className="w-full h-[55px] mb-3.5  rounded justify-between flex items-center">
              {
                user ? <div
                  onClick={() => {
                    setShowProfileRoutes(!showProfileRoutes);
                  }}
                  className="w-fit flex-nowrap text-nowrap px-5 h-full  items-center mt-5 rounded-xl   dark:bg-dark-primary-color flex mb-5 relative bg-black"
                >
                  <div className="text-3xl flex items-center justify-center gap-x-2   w-full dark:text-black text-white">
                    <Image className="w-10 h-10 rounded-full  -ms-2 " src={user?.picture} alt="" width={500} height={500} loading="lazy" />
                    <p
                      className={`font text-lg`}
                    >
                      {user?.name.slice(0, 10)}

                    </p>
                    <IoIosArrowDown className={`${!showProfileRoutes ? "rotate-180" : "rotate-0"} text-[18px] transform duration-300 -me-1  right-2 bottom-0`} />
                  </div>
                </div> : <Link
                  href="/SignIn"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => setIsOpen2(false), 200);
                  }}
                  className="w-fit flex-nowrap text-nowrap px-5 h-full  items-center mt-5 rounded-xl   dark:bg-dark-primary-color flex mb-5 bg-black"
                >
                  <div className="text-3xl flex items-center justify-center gap-x-2   w-full dark:text-black text-white">
                    <FaUserCircle className="-ms-2" />
                    <p
                      className={`${Language === "BN" && "font-BanglaSubHeading"
                        } text-lg`}
                    >
                      {Language === "BN" ? "সাইন ইন" : "Sign In"}

                    </p>
                  </div>
                </Link>
              }

              <div className="flex justify-center items-center  h-full  rounded-full w-[55px]  relative "> <motion.div
                key={theme}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0, rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {theme === "dark" ? (
                  <IoMdMoon className="pointer-events-none text-2xl text-light-primary-color dark:text-dark-primary-color" />
                ) : (
                  <MdLightMode className="pointer-events-none text-2xl text-light-primary-color dark:text-dark-primary-color" />
                )}
              </motion.div>

                <input
                  onChange={(e) => {
                    setTheme2(e.target.checked ? "dark" : "light")
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                  }
                  type="checkbox"
                  checked={
                    localStorage.getItem("theme") === "dark" ? true : false
                  }
                  className="absolute opacity-0 top-0 bottom-0 left-0 right-0"
                /></div>
            </div>
            <div className="w-full h-[2px] bg-light-secondary-color mb-1"></div>
            <motion.div
              initial={{ opacity: 0, top: -50, rotate: 0 }}
              animate={{ opacity: 1, top: 0, rotate: 0 }}
              exit={{ opacity: 0, top: -50, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              key={showProfileRoutes ? 'profile' : 'nav'}>
              {
                showProfileRoutes ? <>{
                  ProfileRoutes.map((route, index) => <CustomButton
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setIsOpen2(false), 200);
                    }}
                    className={` text-2xl  hover:text-3xl  my-1 px-0 `}
                    path={route.path}
                  >
                    <p className={`${Language === "BN" && "font-BanglaSubHeading font-bold"}`}>
                      {Language === "BN" ? route?.bnName : route?.enName}
                    </p>
                  </CustomButton>)
                }</> : <>{
                  NavRoutes.map((route, index) => <CustomButton
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setIsOpen2(false), 200);
                    }}
                    className={` text-2xl  hover:text-3xl  my-1 px-0 `}
                    path={route.path}
                  >
                    <p className={`${Language === "BN" && "font-BanglaSubHeading font-bold"}`}>
                      {Language === "BN" ? route?.bnName : route?.enName}
                    </p>
                  </CustomButton>)
                }</>
              }
            </motion.div>



            <div className="flex items-center">
              <button
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                }}
                className="text-light-primary-color dark:text-dark-primary-color flex items-center gap-x-2"
              >
                <FaLanguage className="text-2xl" />
                {/* <p
                  className={`${Language === "BN" && "font-BanglaSubHeading"}`}
                >
                  {Language === "BN" ? "ভাষা" : "Language"}
                </p> */}
              </button>
              <div
                className={`${languageOpen ? " " : " -z-30 opacity-0"
                  } transform duration-300 flex scale-90 items-center bg-light-primary-color p-0.5 rounded`}
              >
                <button
                  onClick={() => dispatch(SetLanguageBN())}
                  className={`${Language === "BN"
                    ? "text-light-primary-color bg-dark-primary-color"
                    : "bg-light-primary-color text-dark-primary-color"
                    } text-sm font-BanglaHeading px-2 py-1 transform duration-300 rounded-s`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => dispatch(SetLanguageEN())}
                  className={`${Language === "EN"
                    ? "text-light-primary-color bg-dark-primary-color"
                    : "bg-light-primary-color text-dark-primary-color"
                    } text-sm px-2 py-1 transform duration-300 rounded-e`}
                >
                  English
                </button>
              </div>

            </div>
            <div className="fixed bottom-0 w-full px-4 bg-dark-primary-color dark:bg-gradient-to-br from-black to-light-primary-color right-0 left-0">
              <button onClick={() => {
                setIsOpen(false);
                setTimeout(() => setIsOpen2(false), 200);
              }} className={
                "border-2 w-full mt-2 py-2 xl:py-1.5  mb-2  xl:text-lg hover:bg-black dark:hover:bg-dark-primary-color dark:hover:text-black dark:border-dark-primary-color hover:text-white dark:text-dark-primary-color transform duration-300 rounded-xl text-black border-[#000000] text-center"
              }><p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                  {Language === "BN" ? "ছবি আপলোড করুন" : "Upload Picture"}
                </p></button>
              {
                user && <button onClick={() => {
                  logOut().then(() => {
                    toast.success(Language === "BN" ? "সাইন আউট সফল হয়েছে" : "SignOut Successful");
                  })
                  setIsOpen(false);
                  setTimeout(() => setIsOpen2(false), 200);
                }} className={
                  "border-2 mb-2 w-full  py-2 xl:py-1.5    xl:text-lg bg-black dark:bg-dark-primary-color dark:text-black dark:border-dark-primary-color text-white  transform duration-300 rounded-xl  border-[#000000] text-center"
                }><p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                    {Language === "BN" ? "সাইন আউট" : "SignOut"}
                  </p></button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
