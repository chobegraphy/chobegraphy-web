"use client"
import ImgMappingComponent from "@/components/PageWise/MyUploads/ImgMappingComponent";
import Pagination from "@/components/PageWise/MyUploads/Pagination";
import Title from "@/components/PageWise/MyUploads/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tab/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

    const { data: ImgData, isFetching, isError, error, refetch } = useGetPictureDataByEmailQuery({
        email: user?.email,
        page: currentPage,
        limit, status: status?.toLowerCase()
    });

    const isLoading = isFetching;

    // Calculate total pages based on the total data count and limit
    const totalPages = ImgData?.data?.length ? Math.ceil(ImgData?.data?.length / limit) : 1;

    // Update the page when pagination changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setLoading(true); // Start loading when changing pages
    };

    useEffect(() => {
        if (ImgData) {
            setLoading(false); // Stop loading when data is available
        }
    }, [ImgData]); // When ImgData changes, stop the loading state

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
    console.log(ImgData?.data?.length)
    return (
        <div className="min-h-[100dvh] dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color"><div className="w-full  xl:px-16 sm:px-10 px-5 py-10">
            <Title />

            <Tabs value={status || ""} className="w-full flex flex-col justify-center items-center my-5">
                <TabsList>
                    <TabsTrigger onClick={() => router.push(`/Dashboard/MyUploads?status=Approved&CurrentPage=${currentPage}`)} value="Approved">
                        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>{Language === "BN" ? "অ্যাপ্রুভড" : "Approved"}</p>
                    </TabsTrigger>
                    <TabsTrigger onClick={() => router.push(`/Dashboard/MyUploads?status=Pending&CurrentPage=${currentPage}`)} value="Pending">
                        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>{Language === "BN" ? "পেন্ডিং" : "Pending"}</p>
                    </TabsTrigger>
                    <TabsTrigger onClick={() => router.push(`/Dashboard/MyUploads?status=Rejected&CurrentPage=${currentPage}`)} value="Rejected">
                        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>{Language === "BN" ? "রিজেক্টেড" : "Rejected"}</p>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="Approved">
                    <ImgMappingComponent ImgData={ImgData?.data} />
                    {ImgData?.data?.length > 0 && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        onPageChange={handlePageChange}
                    />}
                </TabsContent>
                <TabsContent value="Pending">
                    <ImgMappingComponent ImgData={ImgData?.data} />
                    {ImgData?.data?.length > 0 && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        onPageChange={handlePageChange}
                    />}
                </TabsContent>
                <TabsContent value="Rejected">
                    <ImgMappingComponent ImgData={ImgData?.data} />
                    {ImgData?.data?.length > 0 && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        onPageChange={handlePageChange}
                    />}
                </TabsContent>
            </Tabs>


        </div></div>
    );
};

export default MyUploads;