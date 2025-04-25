"use client";
import PhotoMetaData from "@/components/PageWise/ImgDetails/PhotoMetaData";
import Banner from "@/components/PageWise/UploadPhoto/Banner";
import CategorySelector from "@/components/PageWise/UploadPhoto/CategorySelector";
import CopyRightType from "@/components/PageWise/UploadPhoto/CopyRightType";
import UploadInfo from "@/components/PageWise/UploadPhoto/UploadInfo";
import { useState } from "react";
import { useSelector } from "react-redux";

const UploadPhotoPage = () => {
    const Language = useSelector((state: any) => state.Language.value);
    const [exifData, setExifData] = useState({
        aperture: "",
        exposureTime: "",
        flash: "",
        iso: "",
        model: "",
        software: "",
        datetimeOriginal: "",
        focalLength: "",
        creatorTool: "",
        subjectDistance: "",

    });
    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const [colors, setColors] = useState<Array<{ r: number; g: number; b: number; hex: string; area: number }>>([]);
    const [SelectedCopyrightType, setSelectedCopyrightType] = useState("");
    return (
        <div className="grid grid-cols-10 max-lg:grid-cols-1 sm:px-10 px-5 py-5  dark:bg-gradient-to-br from-black to-light-primary-color gap-5 h-full">
            <Banner SelectedCopyrightType={SelectedCopyrightType} setSelectedCopyrightType={setSelectedCopyrightType} colors={colors} setColors={setColors} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} exifData={exifData} setExifData={setExifData} />
            <div className="max-lg:hidden col-span-4">
                {
                    (exifData.iso !== "" || exifData.focalLength !== "" || exifData.exposureTime !== "" || exifData.aperture !== "" || exifData.datetimeOriginal !== "" || exifData.model !== "" || exifData.software !== "" || exifData.creatorTool !== "" || exifData.subjectDistance !== "" || exifData.flash !== "") && <PhotoMetaData type="button" MetaData={exifData} colors={colors} />
                }
                <CategorySelector colors={colors} setColors={setColors} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <CopyRightType colors={colors} SelectedCopyrightType={SelectedCopyrightType} setSelectedCopyrightType={setSelectedCopyrightType} />
                <UploadInfo colors={colors} />
                <button onClick={() => {
                    document.getElementById("uploadPicture")?.click();
                }} className="flex items-center dark:bg-dark-primary-color  max-lg:scale-90 w-full bg-light-primary-color text-dark-primary-color rounded-xl mt-2 justify-center gap-x-2 z-50 dark:text-light-primary-color cursor-pointer  py-3 "
                ><svg className="w-14  h-14 max-md:w-10 max-md:h-10" viewBox="0 0 73 60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.1366 14.7458L36.2288 14.7733L36.2328 14.7688C36.6705 14.8481 37.1047 14.586 37.2332 14.1519C38.4049 10.2152 42.096 7.46504 46.2084 7.46504C46.6953 7.46504 47.0901 7.07016 47.0901 6.5833C47.0901 6.09643 46.6952 5.70156 46.2084 5.70156C41.1542 5.70156 36.9071 9.06665 35.5433 13.6493C35.4042 14.1162 35.6701 14.6067 36.1366 14.7458Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
                        <path d="M56.4523 42.4384H52.062C51.658 42.4384 51.3302 42.1107 51.3302 41.7067C51.3302 41.3027 51.6579 40.9749 52.062 40.9749H56.4523C62.5042 40.9749 67.4283 36.0509 67.4283 29.999C67.4283 23.9471 62.5042 19.023 56.4523 19.023H56.3467C56.1345 19.023 55.9328 18.9311 55.7937 18.7706C55.6547 18.6101 55.592 18.3974 55.6223 18.1873C55.6877 17.7315 55.7206 17.2737 55.7206 16.8279C55.7206 11.5829 51.4529 7.31531 46.208 7.31531C44.1675 7.31531 42.2216 7.95296 40.5804 9.15978C40.2198 9.42478 39.7076 9.30718 39.499 8.91047C34.851 0.0596993 22.7108 -1.12887 16.4168 6.57053C13.7653 9.81417 12.7236 14.0336 13.5583 18.146C13.6503 18.6002 13.3028 19.0236 12.8412 19.0236H12.548C6.49615 19.0236 1.57208 23.9477 1.57208 29.9996C1.57208 36.0514 6.49615 40.9755 12.548 40.9755H16.9384C17.3424 40.9755 17.6701 41.3032 17.6701 41.7072C17.6701 42.1113 17.3424 42.439 16.9384 42.439H12.548C5.68905 42.439 0.108551 36.8585 0.108551 29.9995C0.108551 23.3329 5.3801 17.8742 11.9736 17.5731C11.3543 13.3066 12.5386 9.00295 15.2836 5.64437C22.0223 -2.5996 34.9365 -1.67556 40.3957 7.51707C42.1372 6.42522 44.1301 5.85244 46.2078 5.85244C52.5623 5.85244 57.5977 11.261 57.1571 17.58C63.6899 17.9463 68.8915 23.3763 68.8915 29.999C68.8915 36.8585 63.311 42.4384 56.452 42.4384L56.4523 42.4384Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
                        <path d="M15.9586 41.2935C15.9586 51.4634 24.2322 59.737 34.402 59.737C44.572 59.737 52.8455 51.4633 52.8455 41.2935C52.8455 31.1235 44.572 22.85 34.402 22.85C24.2321 22.85 15.9586 31.1237 15.9586 41.2935ZM17.7224 41.2935C17.7224 32.0966 25.205 24.6138 34.402 24.6138C43.5989 24.6138 51.0817 32.0964 51.0817 41.2935C51.0817 50.4904 43.5989 57.9732 34.402 57.9732C25.2051 57.9732 17.7224 50.4905 17.7224 41.2935Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
                        <path d="M34.0513 48.6577C34.0513 49.0363 34.3584 49.3434 34.737 49.3434C35.1156 49.3434 35.4227 49.0367 35.4227 48.6577V34.7291C35.4227 34.3504 35.1157 34.0434 34.737 34.0434C34.3584 34.0434 34.0513 34.3504 34.0513 34.7291V48.6577Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="1" />
                        <path d="M34.7367 35.7002L30.936 39.5008L34.7367 35.7002ZM34.7367 35.7002L38.5374 39.5009C38.6711 39.6347 38.8472 39.7018 39.0223 39.7018L34.7367 35.7002ZM29.9661 39.5009C30.2339 39.7687 30.6683 39.7689 30.9359 39.5009L39.0223 39.7018C39.1971 39.7018 39.3733 39.6352 39.5072 39.5009C39.7751 39.233 39.775 38.799 39.5072 38.5312L35.2215 34.2455C34.9537 33.9777 34.5193 33.9776 34.2517 34.2455C34.2517 34.2456 34.2517 34.2456 34.2517 34.2456L29.9661 38.5312C29.6982 38.799 29.6982 39.2331 29.9661 39.5009Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="1" />
                    </svg>
                    <span className="">
                        <p className={`${Language === "BN" && "font-BanglaHeading"} text-lg`}>
                            {Language === "BN" && "ছবি আপলোড করুন"}
                        </p>
                        {Language === "EN" && <span className="font-Righteous text-xl">Upload Picture</span>}
                    </span>

                </button>
            </div>
        </div>
    );
};

export default UploadPhotoPage;