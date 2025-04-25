import { useSelector } from "react-redux";

const HeadingAndSubHeading = ({
  heading,
  headingBn,
  subHeading,
  subHeadingBn,
}: {
  heading: string;
  headingBn: string;
  subHeading: string;
  subHeadingBn: string;
}) => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <div>
      <h1
        id="title"
        className="font-Righteous text-4xl max-xl:text-3xl text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
          {Language === "BN" && headingBn}
        </p>
        <p>{Language === "EN" && heading}</p>
      </h1>
      <h1
        id="title2"
        className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
          {Language === "BN" && subHeadingBn}
        </p>
        <p>{Language === "EN" && subHeading}</p>
      </h1>
    </div>
  );
};

export default HeadingAndSubHeading;
