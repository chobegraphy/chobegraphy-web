"use client"
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
    const status = params.get("status");
    const Language = useSelector((state: any) => state.Language.value);
    const { user } = useAuth()
    const ParamsCurrentPage = params.get("CurrentPage");
    const [currentPage, setCurrentPage] = useState(parseInt(ParamsCurrentPage || "1"));
    const [limit] = useState(window.innerWidth > 1024 ? 20 : 15);
    const [loading, setLoading] = useState(false); // To manage the loading state manually
    const [ImgData, setImgData] = useState([]);
    const { data, isFetching, isError, error, refetch } = useGetPictureDataByEmailQuery({
        email: user?.email,
        page: currentPage,
        limit, status: status?.toLowerCase()
    });

    const [isLoading, setIsLoading] = useState(isFetching);

    // Calculate total pages based on the total data count and limit
    const totalPages = ImgData?.length ? Math.ceil(ImgData?.length / limit) : 1;

    // Update the page when pagination changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setLoading(true); // Start loading when changing pages
    };

    useEffect(() => {
        if (data?.data) {
            setLoading(false); // Stop loading when data is available
            setImgData(data?.data);
        }
    }, [data]); // When ImgData changes, stop the loading state

    useEffect(() => {
        if (currentPage) {
            refetch();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage, refetch, status]);
    useEffect(() => {
        const pageFromUrl = params.get("CurrentPage");
        if (pageFromUrl) {
            setCurrentPage(parseInt(pageFromUrl));
        }
    }, [params]);
    console.log(ImgData)
    return (
        <div className="min-h-[100dvh] dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color">
            {isLoading && !ImgData ?
                <div className="w-full h-dvh flex items-center justify-center absolute right-0 left-0 top-0 bottom-0 dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color z-50">
                    <ImSpinner className="dark:text-white text-3xl text-light-primary-color animate-spin" />
                </div> : <div className="w-full  xl:px-16 sm:px-10 px-5 py-10">
                    <Title />

                    <Tabs value={status || ""} className="w-full flex flex-col justify-center items-center my-5">
                        <TabsList>
                            <TabsTrigger onClick={() => {
                                setIsLoading(true)
                                setImgData([])
                                router.push(`/Dashboard/MyUploads?status=Approved&CurrentPage=${currentPage}`)
                            }} value="Approved" className={`${status === "Approved" && "disabled pointer-events-none"}`}>
                                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>{Language === "BN" ? "অ্যাপ্রুভড" : "Approved"}</p>
                            </TabsTrigger>
                            <TabsTrigger className={`${status === "Pending" && "disabled pointer-events-none"}`} onClick={() => {
                                setIsLoading(true)
                                setImgData([])
                                router.push(`/Dashboard/MyUploads?status=Pending&CurrentPage=${currentPage}`)
                            }} value="Pending">
                                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>{Language === "BN" ? "পেন্ডিং" : "Pending"}</p>
                            </TabsTrigger>
                            <TabsTrigger className={`${status === "Rejected" && "disabled pointer-events-none"}`} onClick={() => {
                                setIsLoading(true)
                                setImgData([])
                                router.push(`/Dashboard/MyUploads?status=Rejected&CurrentPage=${currentPage}`)
                            }} value="Rejected">
                                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>{Language === "BN" ? "রিজেক্টেড" : "Rejected"}</p>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="Approved">
                            {
                                status === "Approved" && (!isLoading || !isFetching) && ImgData.length === 0 ? <p className={`${Language === "BN" && "font-BanglaHeading"} mt-20`}>{Language === "BN" ? " কোন ছবি অ্যাপ্রুভড করা হয়নি" : "No Picture Is Approved"}</p> : <ImgMappingComponent ImgData={ImgData} />
                            }

                            {ImgData?.length > 0 && <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                onPageChange={handlePageChange}
                            />}
                        </TabsContent>
                        <TabsContent value="Pending">
                            {
                                status === "Pending" && (!isLoading || !isFetching) && ImgData.length === 0 ? <p className={`${Language === "BN" && "font-BanglaHeading"} mt-20`}>{Language === "BN" ? "কোন ছবি পেন্ডিং করা হয়নি" : "No Picture Is Pending For Approval"}</p> : <ImgMappingComponent ImgData={ImgData} />
                            }
                            {ImgData?.length > 0 && <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                onPageChange={handlePageChange}
                            />}
                        </TabsContent>
                        <TabsContent value="Rejected">
                            {
                                status === "Rejected" && (!isLoading || !isFetching) && ImgData.length === 0 ? <p className={`${Language === "BN" && "font-BanglaHeading"} mt-20`}>{Language === "BN" ? "কোন ছবি রিজেক্ট হয় নি" : "No Picture Is Rejected"}</p> : <ImgMappingComponent ImgData={ImgData} />
                            }
                            {ImgData?.length > 0 && <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                onPageChange={handlePageChange}
                            />}
                        </TabsContent>
                    </Tabs>


                </div>
            }

        </div>
    );
};

export default MyUploads;