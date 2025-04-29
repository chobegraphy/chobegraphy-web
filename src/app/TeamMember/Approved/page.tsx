"use client";

import ImgMappingComponent from "@/components/PageWise/TeamMember/ImgMappingComponent";
import Pagination from "@/components/PageWise/TeamMember/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useTeamGetPictureDataByStatusQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/TeamGetDataByStatus/ApiSlice";

const Approved = () => {
    const params = useSearchParams();
    const router = useRouter();
    const status = params.get("status") || "Approved";
    const Language = useSelector((state: any) => state.Language.value);
    const { user } = useAuth();

    const ParamsCurrentPage = params.get("CurrentPage");
    const [currentPage, setCurrentPage] = useState(parseInt(ParamsCurrentPage || "1"));
    const [limit] = useState(typeof window !== "undefined" && window.innerWidth > 1024 ? 30 : 30);
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
                <h1
                    id="title"
                    className="font-Righteous text-4xl max-xl:text-3xl text-center text-light-primary-color dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" && " অ্যাপ্রুভড করা ছবি"}
                    </p>
                    <p>{Language === "EN" && "Approved Uploads"}</p>
                </h1>
                <h1
                    id="title2"
                    className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-5/6 text-center text-light-primary-color dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {Language === "BN" &&
                            "আপলোড করা ছবি ⏳ যদি 'Approved' থাকে,তাহলে 'Reject' বা 'Delete' করুন ✅📸"}
                    </p>
                    <p>
                        {Language === "EN" &&
                            "Uploaded photos ⏳ If 'Approved',then 'Reject' or 'Delete' ✅📸"}
                    </p>
                </h1>


                {isLoading ? (
                    <div className="flex justify-center items-center my-10">
                        <ImSpinner className="dark:text-white text-4xl text-light-primary-color animate-spin" />
                    </div>
                ) : (<ImgMappingComponent ImgData={prevImgData} />)}
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

export default Approved;
