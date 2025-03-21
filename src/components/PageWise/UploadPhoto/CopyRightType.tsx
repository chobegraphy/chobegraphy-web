import { useTheme } from "next-themes";
import { useState } from "react";
import { useSelector } from "react-redux";

const CopyRightType = ({ SelectedCopyrightType, setSelectedCopyrightType, colors }: any) => {
    const Language = useSelector((state: any) => state.Language.value);
    const { theme } = useTheme()
    const [showCopyRightInfo, setShowCopyRightInfo] = useState(false);
    return (
        <div>
            <p style={{ border: `2px solid ${colors?.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="mt-6 mb-2  rounded-xl w-fit px-2 font-Space">
                <span className="font-BanglaHeading">
                    {Language === "BN" && "কপিরাইট টাইপ"}
                </span>{" "}
                {Language === "EN" && "Copyright type"} :
            </p>
            <div onClick={() => setSelectedCopyrightType("CC-0")} className="flex justify-between items-center px-2 cursor-pointer  w-[80px]">
                <div className="text-lg">CC-0</div>

                <div className="flex items-center justify-center gap-x-1">
                    <div className="w-4 h-4 -mt-0.5 rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`${SelectedCopyrightType === "CC-0" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"} rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>
                </div>
            </div>
            <h1 className="px-2 font-Space text-justify"> <span className="font-BanglaSubHeading">
                {Language === "BN" && "এই লাইসেন্সের অধীনে ব্যবহারকারী এই ছবি/ইমেজ বাণিজ্যিক, অবাণিজ্যিক কাজে ব্যবহার, কপি, পরিবর্তন,প্রকাশ এবং সরবরাহ করতে পারবেন। এজন্য ব্যবহারকারীকে ইমেজের স্বত্বধারীর অনুমতি নিতে হবে না অথবা তার নাম উল্ল্যেখ করতে হবে না।"}
            </span>{" "}
                {Language === "EN" && " Under this license, the user is free to use, copy, modify, publish, and distribute this image for commercial or non-commercial purposes. The user does not need to obtain permission from or attribute the image's copyright holder."} </h1>

            <div className="my-3 h-[1px] w-full bg-light-secondary-color  rounded-full opacity-50 " />
            <div onClick={() => setSelectedCopyrightType("CC-BY")} className="flex  items-center cursor-pointer justify-between px-2 w-[80px]">
                <div className="text-lg">CC-BY</div>
                <div className="flex items-center justify-center gap-x-1"><div className="w-4 h-4 -mt-0.5 rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`${SelectedCopyrightType === "CC-BY" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"} rounded-xl border-none transform duration-300 flex m-auto justify-center items-center`}></div></div>
                </div>
            </div>
            <h1 className="px-2 font-Space text-justify"> <span className="font-BanglaSubHeading">
                {Language === "BN" && "এই লাইসেন্সের অধীনে ব্যবহারকারী এই ছবি/ইমেজ বাণিজ্যিক/অবাণিজ্যিক কাজে ব্যবহার, কপি, মোডিফাই (পরিবর্তন) সরবরাহ এবং প্রকাশ করতে পারবেন। এক্ষেত্রে ব্যবহারকারীকে উক্ত কাজে এই ছবি/ইমেজের স্বত্বধারীর নাম উল্ল্যেখ করে ক্রেডিট দিতে হবে।"}
            </span>{" "}
                {Language === "EN" && " Under this license, the user may use, copy, modify, distribute, and publish this image for commercial/non-commercial purposes. In this case, the user must give credit to the copyright holder of this image in the work."} </h1>

            <div className="my-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

        </div>
    );
};

export default CopyRightType;