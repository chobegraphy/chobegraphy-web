import Image from "next/image";
import Darklogo from "../../../Assets/logo/darklogo.svg";
import logo from "../../../Assets/logo/logo.svg";
import "./loading.css";
const LoadingAnimation = () => {
  return (
    <div className="fixed example top-0 bottom-0 left-0 right-0 bg-black-100 w-full flex items-center justify-center z-30 h-full">
      <Image
        src={logo}
        className=" dark:hidden h-fit zoom-in-out"
        alt="logo"
        width={100}
        height={100}
      />
      <Image
        src={Darklogo}
        className=" dark:block hidden h-fit zoom-in-out"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default LoadingAnimation;
