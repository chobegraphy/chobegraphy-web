import { useSelector } from "react-redux";

const Popular = () => {
    // redux writing
    const Language = useSelector((state: any) => state.Language.value);
    return (
        <div>
            <h1
                id="title"
                className="font-Righteous text-5xl max-xl:text-3xl text-center text-black dark:text-dark-primary-color"
            >
                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                    {Language === "BN" && "সবচেয়ে জনপ্রিয়"}
                </p>
                <p>{Language === "EN" && "Most Popular"}</p>
            </h1>
            <h1
                id="title2"
                className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
            >
                <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                    {Language === "BN" &&
                        "সবচেয়ে জনপ্রিয় হল সেই মুহূর্তগুলি যা সবাইকে আবিষ্ট করে রাখে।"}
                </p>
                <p>
                    {Language === "EN" &&
                        "The most popular are the moments that captivate everyone."}
                </p>
            </h1>
        </div>
    );
};

export default Popular;