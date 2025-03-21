import clsx from "clsx"; // Utility for conditional class names
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { SetImgDetailsId } from "../../../../Redux/Features/StoreImgDetailsId/StoreImgDetailsId";
const ImgCardHero = ({ imgData, i, setRecentImgData, RecentImgData }: any) => {
    // Initialize router

    // Redux dispatch function
    const dispatch = useDispatch();
    const [loadedImg, setLoadedImg] = useState(false);



    // Ensure imgData exists before using it
    if (!imgData) return null;

    // Extract width and height safely (default to 1920x1080 if missing)
    const [width, height] = imgData.dimensions
        ? imgData.dimensions.split(" x ").map((num: string) => parseInt(num, 10))
        : [1920, 1080];

    // Format numbers for likes/views


    return (
        <div

            className={clsx(
                i !== 0 && "my-2",
                "block relative overflow-hidden rounded-2xl"
            )}
        >
            {/* Blurred Low-Quality Background */}
            <Link
                href={`/ImgDetails?id=${imgData?._id}`}
                onClick={() => dispatch(SetImgDetailsId(imgData?._id))}
                style={{
                    backgroundImage: `url(${imgData?.encodedUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: loadedImg ? "blur(0px)" : "blur(10px)",
                    transition: "filter 0.4s ease-in-out",
                    aspectRatio: `${width}/${height}`, // Set aspect ratio dynamically
                }}
                className="relative w-full rounded-2xl overflow-hidden"
            >
                {/* High-Quality Image */}
                <img
                    width={width}
                    height={height}
                    onLoad={() => setLoadedImg(true)}
                    loading="lazy"
                    src={imgData?.thumbnail || "/placeholder.jpg"} // Fallback if missing
                    alt={imgData?.name || `Gallery ${i}`}
                    className={clsx(
                        "w-full object-cover object-center rounded-2xl border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 shadow-lg",
                        loadedImg
                            ? "opacity-100 transition-opacity duration-500"
                            : "opacity-0"
                    )}
                />
                <div className="rounded-2xl h-full bg-gradient-to-t from-black/10 to-black/0  absolute w-full  bottom-0 p-2 flex items-center justify-between text-sm text-white"></div>
            </Link>


        </div>
    );
};

export default ImgCardHero;
