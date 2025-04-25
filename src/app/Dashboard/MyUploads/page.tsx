"use client";
import ImgMappingComponent from "@/components/PageWise/MyUploads/ImgMappingComponent";
import Pagination from "@/components/PageWise/MyUploads/Pagination";
import Title from "@/components/PageWise/MyUploads/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tab/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useGetPictureDataByEmailQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetDataByEmail/ApiSlice";

const MyUploads = () => {
    const params = useSearchParams();
    const router = useRouter();
    const status = params.get("status") || "Approved";
    const Language = useSelector((state: any) => state.Language.value);
    const { user } = useAuth();

    const ParamsCurrentPage = params.get("CurrentPage");
    const [currentPage, setCurrentPage] = useState(parseInt(ParamsCurrentPage || "1"));
    const [limit] = useState(typeof window !== "undefined" && window.innerWidth > 1024 ? 20 : 15);
    const [prevImgData, setPrevImgData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data, isFetching, refetch } = useGetPictureDataByEmailQuery({
        email: user?.email,
        page: currentPage,
        limit,
        status: status.toLowerCase(),
    });

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

    return (
        <div className="min-h-[100dvh] dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color">
            <div className="w-full xl:px-16 sm:px-10 px-5 py-10">
                <Title />

                <Tabs value={status} className="w-full flex flex-col justify-center items-center my-5">
                    <TabsList>
                        {["Approved", "Pending", "Rejected"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                onClick={() => {
                                    setIsLoading(true);
                                    router.push(`/Dashboard/MyUploads?status=${tab}&CurrentPage=1`);
                                }}
                                value={tab}
                                className={`${status === tab && "disabled pointer-events-none"}`}
                            >
                                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                                    {Language === "BN"
                                        ? tab === "Approved"
                                            ? "অ্যাপ্রুভড"
                                            : tab === "Pending"
                                                ? "পেন্ডিং"
                                                : "রিজেক্টেড"
                                        : tab}
                                </p>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {["Approved", "Pending", "Rejected"].map((tab) => (
                        <TabsContent key={tab} value={tab}>
                            {status === tab && (
                                <>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center my-10">
                                            <ImSpinner className="dark:text-white text-4xl text-light-primary-color animate-spin" />
                                        </div>
                                    ) : prevImgData.length === 0 ? (
                                        <p className={`${Language === "BN" && "font-BanglaHeading"} mt-20`}>
                                            {Language === "BN"
                                                ? tab === "Approved"
                                                    ? "কোন ছবি অ্যাপ্রুভড করা হয়নি"
                                                    : tab === "Pending"
                                                        ? "কোন ছবি পেন্ডিং করা হয়নি"
                                                        : "কোন ছবি রিজেক্ট হয় নি"
                                                : tab === "Approved"
                                                    ? "No Picture Is Approved"
                                                    : tab === "Pending"
                                                        ? "No Picture Is Pending For Approval"
                                                        : "No Picture Is Rejected"}
                                        </p>
                                    ) : (
                                        <ImgMappingComponent ImgData={prevImgData} />
                                    )}
                                </>
                            )}

                            {/* Pagination only appears when data is fully loaded */}
                            {!isLoading && prevImgData.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default MyUploads;
