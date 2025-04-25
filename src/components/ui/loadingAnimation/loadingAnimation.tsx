import { useEffect, useState } from "react";
import "./loading.css";

const LoadingAnimation = () => {
  // State to hold localStorage language
  const [storedLanguage, setStoredLanguage] = useState("");

  // Fetch localStorage data safely on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("Language") !== null &&
        localStorage.getItem("Language") !== undefined &&
        localStorage.getItem("Language") !== ""
      ) {
        setStoredLanguage(localStorage.getItem("Language") ?? "");
      } else {
        setStoredLanguage("BN");
      }
    }
  }, []);

  return (
    <div className="fixed example top-0 bottom-0 left-0 right-0 bg-dark-primary-color dark:bg-gradient-to-br dark:from-black dark:to-[#03140a] w-full flex items-center justify-center z-30 h-full text-5xl">
      <div className="dark:hidden h-fit zoom-in-out">
        <p className={`${storedLanguage === "BN" ? "font-BanglaHeading" : ""}`}>
          {storedLanguage === "BN" && "ছবিগ্রাফি"}
          {storedLanguage === "EN" && "Chobegraphy"}
        </p>
      </div>
      <div className="dark:block hidden h-fit zoom-in-out">
        <p className={`${storedLanguage === "BN" ? "font-BanglaHeading" : ""}`}>
          {storedLanguage === "BN" && "ছবিগ্রাফি"}
          {storedLanguage === "EN" && "Chobegraphy"}
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
