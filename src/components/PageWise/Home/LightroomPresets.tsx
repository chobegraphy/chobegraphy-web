"use client";
import "aos/dist/aos.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTopPicturesQuery } from "../../../../Redux/Features/Apis/TopPictures/ApiSlice";
import LightroomCard from "./LightroomCard";
const LightroomPresets = () => {
    const pathName = usePathname();
    // redux writing
    const Language = useSelector((state: any) => state.Language.value);
    // Fetch data using the RTK Query hook
    const { data, error, isLoading, refetch } = useGetTopPicturesQuery([]);

    const [hovered, SetHovered] = useState(false);
    const [hovered2, SetHovered2] = useState(false);
    useEffect(() => {
        refetch();
    }, [pathName]);
    return (
        <div className="w-full dark:bg-light-primary-color bg-dark-primary-color ">
            <div className="max-w-7xl xl:px-16 sm:px-10 px-5 pt-10 pb-20 mx-auto"> <h1
                id="title"
                className="font-Righteous text-5xl max-xl:text-3xl text-center text-black dark:text-dark-primary-color"
            >
                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                    {Language === "BN" && "লাইটরুম প্রিসেট"}
                </p>
                <p>{Language === "EN" && "Lightroom Presets"}</p>
            </h1>
                <h1
                    id="title2"
                    className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-2/3 text-center text-light-primary-color dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {Language === "BN" &&
                            "লাইটরুম প্রিসেট বদলায় না, শুধু ছবিকে নতুন চোখে দেখায়।"}
                    </p>
                    <p>
                        {Language === "EN" &&
                            "Lightroom presets don’t change photos, they change how you see them."}
                    </p>
                </h1>

                <div className="my-10 max-sm:columns-2 max-md:columns-3 max-lg:columns-3 overflow-hidden xl:columns-6 max-xl:columns-4 gap-2 justify-center w-full ">
                    {data?.slice(0, 19).map((imgInfo: any, index: any) => (
                        <div key={imgInfo?._id} className="relative ">
                            <LightroomCard imgData={imgInfo} i={index} />
                        </div>
                    ))}
                </div>
                <Link href={"/AllImg"}>
                    <button
                        className={
                            "border-2 py-3 mt-6 px-6 mx-auto xl:text-lg bg-light-primary-color dark:bg-dark-primary-color dark:text-light-primary-color dark:hover:bg-dark-primary-color/40   dark:hover:text-dark-primary-color transform duration-300 rounded-xl flex items-center font-Righteous gap-x-2 text-dark-primary-color justify-center border-light-primary-color"
                        }
                    >
                        <span>
                            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                                {Language === "BN" ? "সব দেখুন" : "View All"}
                            </p>
                        </span>
                    </button>
                </Link></div>
        </div>
    );
};

export default LightroomPresets;
