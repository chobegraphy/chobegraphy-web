import useAuthData from "@/ExportedFunctions/useAuthData";
import clsx from "clsx"; // Utility for conditional class names
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { usePictureLikeMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLike/ApiSlice";
import {
    usePictureUnLikeMutation,
} from "../../../../Redux/Features/Apis/PictureLike/ApiSlice";

import { usePictureLikeCountDecreaseMutation, usePictureLikeCountIncreaseMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/PictureLikeCountIncreaseDecrease/ApiSlice";
import { useGetTopPicturesQuery } from "../../../../Redux/Features/Apis/TopPictures/ApiSlice";
import { SetImgDetailsData } from "../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";
import { SetImgDetailsId } from "../../../../Redux/Features/StoreImgDetailsId/StoreImgDetailsId";
import { SetPictureLikeIds } from "../../../../Redux/Features/StoreLikedPictureData/StoreLikedPictureData";
const SuggestionImgCard = ({ imgData, i }: any) => {
    // framer motion
    const { user } = useAuthData();

    const router = useRouter(); // Initialize router

    // Redux dispatch function
    const dispatch = useDispatch();
    const [loadedImg, setLoadedImg] = useState(false);

    const [likeLoading, setLikeLoading] = useState(false);
    const LikedPictureData = useSelector(
        (state: any) => state.StoreLikedPictureData.value
    );
    const Language = useSelector((state: any) => state.Language.value);
    const { data, error, isLoading, refetch } = useGetTopPicturesQuery([]);



    const [
        LikedData,
        {
            data: likedData,
            isLoading: likedLoading,
            isError: likedError,
            error: likedInitial,
        },
    ] = usePictureLikeMutation();
    const [
        UnLikedData,
        {
            data: UnlikedData,
            isLoading: UnlikedLoading,
            isError: UnlikedError,
            error: UnlikedInitial,
        },
    ] = usePictureUnLikeMutation();
    const [LikedCountData] = usePictureLikeCountIncreaseMutation();
    const [UnLikedCountData] = usePictureLikeCountDecreaseMutation();
    // use effect for like unlike loading
    useEffect(() => {
        setLikeLoading(likedLoading || UnlikedLoading);
    }, [likedLoading, UnlikedLoading]);

    // Ensure imgData exists before using it
    if (!imgData) return null;

    // Extract width and height safely (default to 1920x1080 if missing)
    const [width, height] = imgData.dimensions
        ? imgData.dimensions.split(" x ").map((num: string) => parseInt(num, 10))
        : [1920, 1080];

    // Format numbers for likes/views
    const formatNumber = (num: number) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
        return num.toString();
    };

    const handleLike = async () => {
        if (!user) {
            router.push("/SignIn");
            toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
            return;
        }
        if (imgData?._id) {
            const LikedResponse = await LikedData({
                UserId: user?._id,
                PictureId: imgData._id,
            }).unwrap();
            LikedCountData({
                PictureId: imgData._id,
            }).unwrap();
            refetch();
            dispatch(SetPictureLikeIds(LikedResponse?.updatedData?.PictureLiked));
        }
    };

    const handleUnlike = async () => {
        if (!user) {
            router.push("/SignIn");
            toast.error(Language === "BN" ? "সাইন ইন করুন" : "Please SignIn First");
            return;
        }
        if (imgData?._id) {
            const UnLikedResponse = await UnLikedData({
                UserId: user?._id,
                PictureId: imgData._id,
            }).unwrap();
            UnLikedCountData({
                PictureId: imgData._id,
            }).unwrap();
            refetch();
            dispatch(SetPictureLikeIds(UnLikedResponse?.updatedData?.PictureLiked));
        }
    };

    return (
        <div

            className={clsx(

                "block relative overflow-hidden rounded-2xl"
            )}
        >
            {/* Blurred Low-Quality Background */}
            <Link
                href={`/ImgDetails?id=${imgData?._id}`}
                onClick={() => {
                    dispatch(SetImgDetailsData({}))
                    dispatch(SetImgDetailsId(imgData?._id))
                }}
                style={{
                    backgroundImage: `url(${imgData?.encodedUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: loadedImg ? "blur(0px)" : "blur(10px)",
                    transition: "filter 0.4s ease-in-out",
                    aspectRatio: `${width}/${height}`, // Set aspect ratio dynamically
                }}
                className="relative w-full rounded-2xl overflow-hidden"
            >
                {/* High-Quality Image */}
                <Image
                    width={width}
                    height={height}
                    onLoad={() => setLoadedImg(true)}
                    loading="lazy"
                    src={imgData?.thumbnail} // Fallback if missing
                    alt={imgData?.name || `Gallery ${i}`}
                    className={clsx(
                        "w-full object-cover object-center rounded-2xl border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 shadow-lg",
                        loadedImg
                            ? "opacity-100 transition-opacity duration-500"
                            : "opacity-0"
                    )}
                />
                <div className="rounded-2xl h-full bg-gradient-to-t from-black/10 to-black/0  absolute w-full  bottom-0 p-2 flex items-center justify-between text-sm text-white"></div>
            </Link>

            {/* Overlay for Icons */}
            {loadedImg && (
                <div className="rounded-2xl h-[30px]   absolute  bottom-0 p-2 flex items-center justify-between text-sm text-white">
                    <div className="flex items-center gap-x-3 absolute bottom-3 left-3">
                        {likeLoading !== true && (
                            <span>
                                {LikedPictureData?.includes(imgData?._id) ? (
                                    <FaHeart
                                        onClick={handleUnlike}
                                        className="text-pink-600 cursor-pointer"
                                    />
                                ) : (
                                    <FaRegHeart onClick={handleLike} className="cursor-pointer" />
                                )}
                            </span>
                        )}
                        {likeLoading === true && (
                            <ImSpinner
                                className={`${LikedPictureData?.includes(imgData?._id)
                                    ? "text-pink-600"
                                    : "text-white"
                                    } animate-spin `}
                            />
                        )}
                        <p className="font-Space text-xs -ms-2">
                            {formatNumber(imgData?.react || 0)}
                        </p>
                        <FiEye />
                        <p className="font-Space text-xs -ms-2">
                            {formatNumber(imgData?.view || 0)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestionImgCard;
