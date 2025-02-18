import clsx from "clsx"; // Utility for conditional class names
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useIncreaseViewCountMutation } from "../../../../Redux/Features/Apis/IncreaseViewCount/ApiSlice";
import { SetImgDetailsData } from "../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";

const ImgCard = ({ imgData, i }: any) => {
  // Redux dispatch function
  const dispatch = useDispatch();
  const [loadedImg, setLoadedImg] = useState(false);
  // increase view count
  const [
    increaseViewCount,
    {
      data: updateViewCountData,
      isLoading: updateViewCountLoading,
      isError: updateViewCountError,
      error: updateViewCountInitial,
    },
  ] = useIncreaseViewCountMutation();

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
  const handleClick = async () => {
    // Trigger the view count update API when the image is clicked
    if (imgData?._id) {
      const UpdateViewCountResponse = await increaseViewCount({
        id: imgData._id,
      }).unwrap();
      dispatch(SetImgDetailsData(UpdateViewCountResponse?.updatedData));
      // return;
    }

    // Dispatch the image details to the Redux store
  };

  return (
    <Link
      onClick={handleClick}
      href={`/AllImg/${imgData._id}`}
      className={clsx(
        i !== 0 && "my-2",
        "block relative overflow-hidden rounded-2xl"
      )}
    >
      {/* Blurred Low-Quality Background */}
      <div
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
          src={imgData?.thumbnail || "/placeholder.jpg"} // Fallback if missing
          alt={imgData?.name || `Gallery ${i}`}
          className={clsx(
            "w-full object-cover object-center rounded-2xl border-2 border-light-primary-color/10 dark:border-light-primary-color/10 shadow-lg",
            loadedImg
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          )}
        />
      </div>

      {/* Overlay for Icons */}
      {loadedImg && (
        <div className="rounded-2xl max-lg:h-[30px] bg-gradient-to-t from-black/40 to-black/0 h-full absolute w-full bottom-0 p-2 flex items-center justify-between text-sm text-white">
          <div className="flex items-center gap-x-3 absolute bottom-3 left-3">
            <FaRegHeart />
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
    </Link>
  );
};

export default ImgCard;
