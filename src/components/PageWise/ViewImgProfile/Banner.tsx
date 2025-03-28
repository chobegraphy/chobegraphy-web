import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useGetSingleUserDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetSingleUser/ApiSlice";

const Banner = ({ BannerPicture }: any) => {
    const { user } = useAuth();
    const params = useSearchParams();

    console.log(BannerPicture);
    const Language = useSelector((state: any) => state.Language.value);
    const [loadedImg, setLoadedImg] = useState(false);
    const authorEmail = params.get("AuthorMail");
    const { data: SingleUserData } = useGetSingleUserDataQuery({ email: authorEmail })

    return (
        <div>

            <div className="relative flex flex-col items-center ">
                <div className="overflow-hidden max-lg:h-[200px] h-[300px] max-md:h-[150px] w-full ">
                    <img
                        src={BannerPicture?.encodedUrl || "/placeholder.jpg"} // Use encodedUrl as the blurred background
                        alt="Blurred preview"
                        className="absolute inset-0 w-full max-lg:h-[200px] h-[300px] max-md:h-[150px] object-cover blur-xl transition-opacity duration-500"
                        style={{ opacity: loadedImg ? 0 : 1 }} // Hide blurred image when main image loads
                    />

                    {/* High-Quality Image */}
                    <img

                        onLoad={() => setLoadedImg(true)}

                        src={BannerPicture?.thumbnail || "/placeholder.jpg"} // Main image
                        alt={`Gallery `}
                        className={clsx(
                            "w-full max-lg:h-[200px] h-[300px] max-md:h-[150px] object-cover object-center  border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 shadow-lg transition-opacity duration-500",
                            loadedImg ? "opacity-100" : "opacity-0"
                        )}
                    />
                </div>
                <div className="w-[250px] max-lg:h-[140px]  max-lg:w-[140px] h-[250px]  rounded-full max-lg:-bottom-[66px] absolute   -bottom-24  border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 bg-dark-primary-color dark:bg-light-primary-color">
                    <img src={SingleUserData?.picture} width={500} height={500} className="w-full h-full rounded-full" alt="" />
                </div>

            </div>
            <div className="mt-20 flex flex-col items-center justify-center lg:mt-28"><h1 className="text-2xl max-lg:text-lg">{SingleUserData?.name}</h1>
            </div>
        </div>
    );
};

export default Banner;