import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetPictureDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureData/ApiSlice";
import PopularImgCard from "./PopularImgCard";

const Popular = () => {
    const pathName = usePathname();


    // redux writing
    const Language = useSelector((state: any) => state.Language.value);
    const { data, error, isLoading, refetch } = useGetPictureDataQuery({
        filter: "popular",
        page: 1,
        limit: window.innerWidth > 1024 ? 15 : window.innerWidth > 425 ? 12 : 12,
    });
    const [PopularImgData, setPopularImgData] = useState([]);
    useEffect(() => {
        if (data) {
            setPopularImgData(data.data);
        }
    }, [data, pathName]);

    return (
        <div className="max-w-7xl xl:px-16 sm:px-10 px-5 pt-10 pb-20 w-full mx-auto">
            <div className="w-full  flex justify-between items-center"><h1
                id="title"
                className="font-Righteous text-lg xl:text-3xl  text-start text-black dark:text-dark-primary-color"
            >
                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                    {Language === "BN" && "সবচেয়ে জনপ্রিয়"}
                </p>
                <p>{Language === "EN" && "Most Popular"}</p>
            </h1>
                <Link href={`/AllImg?filter=popular&CurrentPage=1`}>
                    <button
                        className={
                            " py-3 transform duration-300 dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color  text-light-primary-color rounded-2xl hover:px-6 mx-auto xl:text-lg  flex items-center font-Righteous gap-x-2 dark:text-dark-primary-color justify-center "
                        }
                    >
                        <span>
                            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                                {Language === "BN" ? "সব দেখুন" : "View ALl"}
                            </p>
                        </span>
                        <FaAngleRight />
                    </button>
                </Link></div>

            <div className="grid max-lg:grid-cols-4 max-md:grid-cols-3 max-md:my-2 grid-cols-5 gap-2 my-5">
                {
                    PopularImgData?.map((item: any, index: number) =>
                        <div key={item?._id} className="relative ">
                            <PopularImgCard setPopularImgData={setPopularImgData} PopularImgData={PopularImgData} imgData={item} i={index} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Popular;