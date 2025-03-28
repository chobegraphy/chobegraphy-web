"use client";





import AccountInfo from "@/components/PageWise/ViewImgProfile/AccountInfo";
import Banner from "@/components/PageWise/ViewImgProfile/Banner";
import ImgMappingComponent from "@/components/PageWise/ViewImgProfile/ImgMappingComponent";
import Pagination from "@/components/PageWise/ViewImgProfile/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tab/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useGetPictureDataByEmailQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetDataByEmail/ApiSlice";
import { useGetPictureDataByEmailForProfileQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureDataByEmailForProfile/ApiSlice";

const ViewProfilePage = () => {
    const params = useSearchParams();
    const router = useRouter();
    const status = params.get("status") || "About Me";
    const authorEmail = params.get("AuthorMail");
    const Language = useSelector((state: any) => state.Language.value);
    const { user } = useAuth();

    const ParamsCurrentPage = params.get("CurrentPage");
    const [currentPage, setCurrentPage] = useState(parseInt(ParamsCurrentPage || "1"));
    const [limit] = useState(typeof window !== "undefined" && window.innerWidth > 1024 ? 20 : 15);
    const [prevImgData, setPrevImgData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data, isFetching, refetch } = useGetPictureDataByEmailQuery({
        email: authorEmail,
        page: currentPage,
        limit,
        status: "approved",
    });
    const { data: PictureDataByEmailForProfile } = useGetPictureDataByEmailForProfileQuery({ email: authorEmail })
    useEffect(() => {
        if (PictureDataByEmailForProfile) {

            setBannerPicture(PictureDataByEmailForProfile?.data[0])
        }
    }, [PictureDataByEmailForProfile])
    useEffect(() => {
        if (data?.data) {
            setPrevImgData(data.data);
        }
    }, [data]);

    useEffect(() => {
        setIsLoading(true);
        refetch().finally(() => setIsLoading(false));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage, refetch, status]);

    useEffect(() => {
        const pageFromUrl = params.get("CurrentPage");
        if (pageFromUrl) {
            setCurrentPage(parseInt(pageFromUrl));
        }
    }, [params]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`/Dashboard/MyUploads?status=${status}&CurrentPage=${newPage}`);
    };

    const totalPages = data?.data.length ? Math.ceil(data.total / limit) : 1;
    const [BannerPicture, setBannerPicture] = useState<any>(null);
    return (
        <div className="min-h-[100dvh]">

            {isLoading ? <div className="flex fixed dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color z-30  top-0 h-full w-full min-h-[100dvh] justify-center items-center ">
                <ImSpinner className="dark:text-white text-4xl text-light-primary-color animate-spin" />
            </div> : <><Banner BannerPicture={BannerPicture} />

                <Tabs value={status} className="w-full flex flex-col justify-center items-center my-5">
                    {/* "Lr Presets" */}
                    <TabsList>
                        {["About Me", "Pictures"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                onClick={() => {
                                    router.push(`/ViewImgProfile?AuthorMail=${authorEmail}&status=${tab}&CurrentPage=1`);
                                }}
                                value={tab}
                                className={`${status === tab && "disabled pointer-events-none"}`}
                            >
                                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                                    {Language === "BN"
                                        ? tab === "About Me"
                                            ? "আমার সম্পর্কে"
                                            : tab === "Pictures"
                                                ? "ছবি"
                                                : "এলআর প্রিসেট"
                                        : tab}
                                </p>
                            </TabsTrigger>
                        ))}
                    </TabsList>


                    {/* "Lr Presets" */}
                    <div className="">{["About Me", "Pictures"].map((tab) => (
                        <TabsContent className="w-full max-w-7xl max-md:px-5 mx-auto px-10" key={tab} value={tab}>
                            {
                                tab === "About Me" &&
                                <div className="grid gap-x-5 max-lg:grid-cols-1 grid-cols-7 w-full"><div className="col-span-3 w-full max-md:col-span-1"><AccountInfo setBannerPicture={setBannerPicture} /></div> <div className="col-span-4  max-md:col-span-1"><h1
                                    id="title"
                                    className="font-Righteous text-3xl max-xl:text-3xl text-center text-light-primary-color dark:text-dark-primary-color mt-5 -mb-2"
                                >
                                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                                        {Language === "BN" && "অ্যাপ্রুভ করা ছবি"}
                                    </p>
                                    <p>{Language === "EN" && "Approved Pictures"}</p>
                                </h1><ImgMappingComponent ImgData={prevImgData} />{!isLoading && prevImgData.length > 0 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        setCurrentPage={setCurrentPage}
                                        onPageChange={handlePageChange}
                                    />
                                )}</div></div>

                            }
                            {
                                tab === "Pictures" &&
                                <div className="w-full max-w-7xl max-md:px-5 mx-auto px-10"><ImgMappingComponent ImgData={prevImgData} />{!isLoading && prevImgData.length > 0 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        setCurrentPage={setCurrentPage}
                                        onPageChange={handlePageChange}
                                    />
                                )}</div>

                            }
                        </TabsContent>
                    ))}</div>


                </Tabs></>}

        </div>
    );
};

export default ViewProfilePage;