"use client";

import ImgMappingComponent from "@/components/PageWise/TeamMember/ImgMappingComponent";
import Pagination from "@/components/PageWise/TeamMember/Pagination";
import Title from "@/components/PageWise/TeamMember/Title";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useTeamGetPictureDataByStatusQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/TeamGetDataByStatus/ApiSlice";

const Pending = () => {
    const params = useSearchParams();
    const router = useRouter();
    const status = params.get("status") || "Pending";
    const Language = useSelector((state: any) => state.Language.value);
    const { user } = useAuth();

    const ParamsCurrentPage = params.get("CurrentPage");
    const [currentPage, setCurrentPage] = useState(parseInt(ParamsCurrentPage || "1"));
    const [limit] = useState(typeof window !== "undefined" && window.innerWidth > 1024 ? 20 : 15);
    const [prevImgData, setPrevImgData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data, isFetching, refetch } = useTeamGetPictureDataByStatusQuery({
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


                {isLoading ? (
                    <div className="flex justify-center items-center my-10">
                        <ImSpinner className="dark:text-white text-4xl text-light-primary-color animate-spin" />
                    </div>
                ) : prevImgData.length === 0 ? (
                    <p className={`${Language === "BN" && "font-BanglaHeading"} mt-20 text-center`}>
                        {Language === "BN" ? "কোন ছবি পেন্ডিং নেই" : "No Picture Is Pending For Approval"}

                    </p>
                ) : (
                    <ImgMappingComponent ImgData={prevImgData} />
                )}
                {!isLoading && prevImgData.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div >
        </div >
    );
};

export default Pending;
