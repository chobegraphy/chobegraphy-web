"use client";
import CustomButton from "@/components/ui/CustomButton/CustomButton";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FaLanguage, FaMagnifyingGlass } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
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
  const { setTheme } = useTheme();
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  const dispatch = useDispatch();
  console.log(Language);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("Language");
      if (storedLanguage) {
        dispatch(setLanguage(storedLanguage));
      } else {
        dispatch(setLanguage("BN"));
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (!isOpen && !isOpen2) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTimeout(() => {
          setIsOpen2(false);
        }, 200);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef, isOpen, isOpen2]);

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
  }, []);

  return (
    <div
      className={`flex xl:backdrop-blur bg-dark-primary-color/80 dark:bg-light-primary-color/80 z-50 bg-black-100 justify-between w-full items-center overflow-hidden sticky top-0 mx-auto  sm:p-5 p-5 h-[65px] `}
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
        <CustomButton className={"border-e-2 border-[#575757]"} path="/">
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "হোম" : "Home"}
          </p>
        </CustomButton>
        <CustomButton className={"border-e-2 border-[#575757]"} path="/Gallery">
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "গ্যালারি" : "Gallery"}
          </p>
        </CustomButton>
        <CustomButton className={"border-e-2 border-[#575757]"} path="/Team">
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "টীম" : "Team"}
          </p>
        </CustomButton>
        <CustomButton className={"border-e-2 border-[#575757]"} path="/Event">
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "ইভেন্ট" : "Event"}
          </p>
        </CustomButton>
        <CustomButton className={"border-e-2 border-[#575757]"} path="/Pages">
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "পেইজ" : "Pages"}
          </p>
        </CustomButton>
        {/* <CustomButton
          className={"border-e-2 border-[#575757]"}
          path="/PhotoGallery"
        >
          LibPatcher
        </CustomButton> */}
        {/* <CustomButton className={"border-e-2 border-[#575757]"} path="/Contact">
          Contact
        </CustomButton> */}
        <CustomButton className={"border-e-2 border-[#575757]"} path="/About">
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "আমাদের সম্পর্কে" : "About"}
          </p>
        </CustomButton>
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
            className={`${
              languageOpen ? "w-full " : "w-0 -z-30 opacity-0"
            } transform duration-300 flex scale-90 items-center bg-light-primary-color p-0.5 rounded`}
          >
            <button
              onClick={() => dispatch(SetLanguageBN())}
              className={`${
                Language === "BN"
                  ? "text-light-primary-color bg-dark-primary-color"
                  : "bg-light-primary-color text-dark-primary-color"
              } text-sm font-BanglaHeading px-2 py-1 transform duration-300 rounded-s`}
            >
              বাংলা
            </button>
            <button
              onClick={() => dispatch(SetLanguageEN())}
              className={`${
                Language === "EN"
                  ? "text-light-primary-color bg-dark-primary-color"
                  : "bg-light-primary-color text-dark-primary-color"
              } text-sm px-2 py-1 transform duration-300 rounded-e`}
            >
              English
            </button>
          </div>
        </div>
        {/* <CustomButton path="/About">Support/Help</CustomButton> */}
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

        <button
          className={
            "border-2 py-1 xl:py-1.5 ms-5 px-6  xl:text-lg hover:bg-light-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color dark:border-dark-primary-color  dark:text-dark-primary-color hover:text-dark-primary-color transform duration-300 rounded text-light-primary-color border-light-primary-color"
          }
        >
          <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
            {Language === "BN" ? "আপলোড" : "Upload"}
          </p>
        </button>
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
        className={`${
          isOpen2 ? "h-screen w-screen opacity-100 " : "opacity-0"
        } fixed z-50 overflow-hidden top-0 left-0 bg-black/90`}
      >
        <div
          ref={divRef}
          className={`${
            isOpen ? "right-0" : "-right-[120%]"
          } absolute transform duration-500 bg-background w-3/4 border-s-2 p-4 border-[#575757] max-w-[320px] h-full`}
        >
          <div className="w-full flex flex-col h-full ">
            <div className="w-full h-[60px] dark:bg-dark-primary-color flex mb-5 bg-black rounded">
              <div className="w-3/4 h-full flex items-center ps-3">
                <div className="text-2xl flex items-center gap-x-2 dark:text-black text-white">
                  <FaSignInAlt />
                  <p
                    className={`${
                      Language === "BN" && "font-BanglaSubHeading"
                    }`}
                  >
                    {Language === "BN" ? "সাইন ইন" : "Sign In"}
                  </p>
                </div>
              </div>
              <div className="flex-grow mt-1.5 h-full ">
                <FaMagnifyingGlass className="text-white dark:text-black text-lg text-center w-full" />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                    </svg>
                  </span>
                  <input
                    onChange={(e) =>
                      setTheme(e.target.checked ? "dark" : "light")
                    }
                    type="checkbox"
                    checked={
                      localStorage.getItem("theme") === "dark" ? true : false
                    }
                    className="input"
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <CustomButton
              className={` text-2xl  hover:text-3xl my-1 px-0 `}
              path="/"
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "হোম" : "Home"}
              </p>
            </CustomButton>
            <CustomButton
              className={" hover:text-3xl text-2xl mb-1 px-0 "}
              path="/Gallery"
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "গ্যালারি" : "Gallery"}
              </p>
            </CustomButton>
            <CustomButton
              className={" hover:text-3xl px-0 text-2xl mb-1 "}
              path="/Team"
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "টীম" : "Team"}
              </p>
            </CustomButton>
            <CustomButton
              className={" hover:text-3xl px-0 text-2xl mb-1 "}
              path="/Event"
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "ইভেন্ট" : "Event"}
              </p>
            </CustomButton>
            <CustomButton
              className={" hover:text-3xl px-0 text-2xl mb-1 "}
              path="/Pages"
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "পেইজ" : "Pages"}
              </p>
            </CustomButton>

            <CustomButton
              className={" hover:text-3xl px-0 text-2xl mb-1 "}
              path="/About"
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "আমাদের সম্পর্কে" : "About"}
              </p>
            </CustomButton>
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
                className={`${
                  languageOpen ? " " : " -z-30 opacity-0"
                } transform duration-300 flex scale-90 items-center bg-light-primary-color p-0.5 rounded`}
              >
                <button
                  onClick={() => dispatch(SetLanguageBN())}
                  className={`${
                    Language === "BN"
                      ? "text-light-primary-color bg-dark-primary-color"
                      : "bg-light-primary-color text-dark-primary-color"
                  } text-sm font-BanglaHeading px-2 py-1 transform duration-300 rounded-s`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => dispatch(SetLanguageEN())}
                  className={`${
                    Language === "EN"
                      ? "text-light-primary-color bg-dark-primary-color"
                      : "bg-light-primary-color text-dark-primary-color"
                  } text-sm px-2 py-1 transform duration-300 rounded-e`}
                >
                  English
                </button>
              </div>
            </div>
            <button
              className={
                "border-2 mt-5 py-1 xl:py-1.5  px-6  xl:text-lg hover:bg-black dark:hover:bg-dark-primary-color dark:hover:text-black dark:border-dark-primary-color hover:text-white dark:text-dark-primary-color transform duration-300 rounded text-black border-[#000000]"
              }
            >
              <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                {Language === "BN" ? "আপলোড" : "Upload"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
