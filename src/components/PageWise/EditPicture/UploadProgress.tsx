import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuFileImage } from "react-icons/lu";
import { PiShareNetworkBold } from "react-icons/pi";
import { RiUploadCloudFill } from "react-icons/ri";
import { SiSparkpost } from "react-icons/si";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";

const UploadProgress = ({ isOpen, setIsOpen, isOpen2, setIsOpen2, uploadProgress, setUploadProgress, uploadedPictureId, divRef, fileName }: any) => {
    const Language = useSelector((state: any) => state.Language.value);
    const { user } = useAuth()
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    text:
                        Language === "EN"
                            ? "Check out this amazing image!"
                            : "এই চমৎকার ছবিটি দেখুন!",
                    url: `https://chobegraphy.vercel.app/ImgDetails/${uploadedPictureId}`,
                });

            } catch (error) {

            }
        } else {
            toast.error("Your browser doesn't support sharing.");
        }
    };

    return (
        <div
            className={`${isOpen2 ? "h-[100dvh] w-screen opacity-100 " : "opacity-0"
                } fixed z-50 right-0 flex justify-center items-center overflow-hidden top-0 left-0 bg-black/90`}
        >
            <div
                ref={divRef}
                className={`${isOpen ? "bottom-8 max-lg:bottom-2" : "-bottom-[120%]"
                    } absolute transform duration-500 bg-dark-primary-color border-2 dark:bg-black left-0 right-0 max-md:w-[95%] w-3/4 rounded-2xl mx-auto p-4 border-light-secondary-color lg:scale-125 dark:text-dark-primary-color text-light-primary-color md:max-w-[320px] ${uploadProgress === 100 ? "h-[185px]" : "h-[200px]"}`}
            >
                {
                    user.teamMember === true && uploadProgress === 100 && <div><p className={`${Language === "BN" && "font-BanglaHeading"} text-lg text-center mb-3`}>
                        {Language === "BN" && "আপলোড সফল হয়েছে"}
                        {Language === "EN" && <span className="font-Righteous text-xl">Uploading Success</span>}
                    </p>

                        <div className="grid grid-cols-3 gap-2 mt-2 w-full h-[100px]">

                            <div onClick={() => {
                                setIsOpen(false);
                                setTimeout(() => setIsOpen2(false), 200);
                                setUploadProgress(0)
                                handleShare()
                            }
                            } className="w-full h-full flex flex-col cursor-pointer  justify-center items-center rounded-xl hover:bg-light-primary-color hover:text-dark-primary-color bg-dark-primary-color text-light-primary-color border-2 border-light-primary-color transform duration-300 dark:bg-light-primary-color dark:text-dark-primary-color dark:border-light-secondary-color hover:dark:bg-dark-primary-color hover:dark:text-light-primary-color hover:dark:border-dark-primary-color">
                                <PiShareNetworkBold className="text-4xl" />
                                <span className={`${Language === "BN" && "mt-1"}  text-center`}>
                                    <p className={`${Language === "BN" && "font-BanglaHeading"} text-[10px] text-center`}>
                                        {Language === "BN" && "লিঙ্ক শেয়ার করুন"}
                                    </p>
                                    {Language === "EN" && <span className="font-Space font-bold text-[10px]">Share Link</span>}
                                </span>
                            </div>
                            <Link href={`/ImgDetails/${uploadedPictureId}`} onClick={() => {
                                setIsOpen(false);
                                setTimeout(() => setIsOpen2(false), 200);
                                setUploadProgress(0)
                            }
                            } className="w-full h-full flex flex-col cursor-pointer  justify-center items-center rounded-xl hover:bg-light-primary-color hover:text-dark-primary-color bg-dark-primary-color text-light-primary-color border-2 border-light-primary-color transform duration-300 dark:bg-light-primary-color dark:text-dark-primary-color dark:border-light-secondary-color hover:dark:bg-dark-primary-color hover:dark:text-light-primary-color hover:dark:border-dark-primary-color">
                                <SiSparkpost className="text-4xl" />
                                <span className={`${Language === "BN" && "mt-1.5"} text-center`}>
                                    <p className={`${Language === "BN" && "font-BanglaHeading"} text-[10px] text-center`}>
                                        {Language === "BN" && "পোস্ট হিসেবে দেখুন"}
                                    </p>
                                    {Language === "EN" && <span className="font-Space  font-bold text-[10px]">View As Post</span>}
                                </span>
                            </Link>
                            <div onClick={() => {
                                setIsOpen(false);
                                setTimeout(() => setIsOpen2(false), 200);
                                setUploadProgress(0)

                            }
                            } className="w-full h-full flex flex-col cursor-pointer  justify-center items-center rounded-xl hover:bg-light-primary-color hover:text-dark-primary-color bg-dark-primary-color text-light-primary-color border-2 border-light-primary-color transform duration-300 dark:bg-light-primary-color dark:text-dark-primary-color dark:border-light-secondary-color hover:dark:bg-dark-primary-color hover:dark:text-light-primary-color hover:dark:border-dark-primary-color"><RiUploadCloudFill className="text-4xl" />
                                <span className={`${Language === "BN" ? "mt-1 " : "-mt-1"} text-center`}>
                                    <p className={`${Language === "BN" && "font-BanglaHeading"} text-[10px] text-center px-2`}>
                                        {Language === "BN" && " আরেকটি  "}
                                    </p>
                                    {Language === "EN" && <span className="font-Space  font-bold text-[10px]"> Another </span>}
                                </span>
                            </div>
                        </div>
                    </div>
                }
                {
                    uploadProgress! < 100 && <div className="text-center"><p className={`${Language === "BN" && "font-BanglaHeading"} text-lg text-center mb-3 `}>
                        {Language === "BN" && "আপলোড করা হচ্ছে"}
                    </p>
                        {Language === "EN" && <span className="font-Righteous text-xl mb-3">Uploading Picture</span>}
                        <div className="flex justify-center w-full"><LuFileImage className="text-center text-4xl mb-2" /></div>
                        <h1 className="text-center mb-2">{fileName || "Loading..."}</h1>
                        <div className="relative h-[40px]"><div
                            className="h-full dark:bg-white bg-light-primary-color  rounded-xl z-10 duration-300 transform relative ease-in-out"
                            style={{ width: `${uploadProgress}%` }}
                        ><span className="absolute top-0 bottom-0 right-1 flex items-center justify-center font-bold dark:text-black text-dark-primary-color">
                                {Language === "EN" && <span className=" text-xl mb-3">{uploadProgress > 10 && uploadProgress + "%"}</span>}

                                {Language === "BN" && <span className="font-BanglaSubHeading">{uploadProgress > 10 && convertToBanglaNum(uploadProgress) + "%"}</span>}
                            </span></div>

                            <div className="dark:bg-light-primary-color bg-black/10 rounded-xl absolute top-0 left-0 right-0 bottom-0 h-full"></div>
                        </div></div>
                }

            </div>
        </div>
    );
};

export default UploadProgress;