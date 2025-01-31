import "./loading.css";
const LoadingAnimation = () => {
  return (
    <div className="fixed example top-0 bottom-0 left-0 right-0 bg-black-100 w-full flex items-center justify-center z-30 h-full text-5xl">
      {/* <Image
        src={logo}
        className=" dark:hidden h-fit zoom-in-out"
        alt="logo"
        width={100}
        height={100}
      /> */}

      <div className=" dark:hidden h-fit zoom-in-out">Chobegraphy</div>
      <div className=" dark:block hidden h-fit zoom-in-out">Chobegraphy</div>
      {/* <Image
        src={Darklogo}
        className=" dark:block hidden h-fit zoom-in-out"
        alt="logo"
        width={100}
        height={100}
      /> */}
    </div>
  );
};

export default LoadingAnimation;
