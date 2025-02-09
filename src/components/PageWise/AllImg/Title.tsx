import { useSelector } from "react-redux";

const Title = () => {
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <>
      <h1
        id="title"
        className="font-Righteous text-4xl max-xl:text-3xl text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
          {Language === "BN" && "ছবির গ্যালারি"}
        </p>
        <p>{Language === "EN" && "Image Gallery"}</p>
      </h1>
      <h1
        id="title2"
        className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
          {Language === "BN" &&
            "ছবি সেটা নয় যা তুমি দেখো, ছবি সেটা যা তুমি অন্যদের দেখাও।"}
        </p>
        <p>
          {Language === "EN" &&
            "Picture is not what you see, but what you make others see"}
        </p>
      </h1>
    </>
  );
};

export default Title;
