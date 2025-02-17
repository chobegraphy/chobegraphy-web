import clsx from "clsx"; // Utility for conditional class names
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const ImgCard = ({ imgData, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const pathName = usePathname();
  // Helper function to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"; // 1M, 2.5M
    if (num >= 1000) return (num / 1000).toFixed(1) + "k"; // 1k, 2.1k
    return num.toString(); // Below 1000 stays as is
  };
  // If imgData is empty, do not render anything
  if (!imgData) return null;

  return (
    <Link
      href={
        pathName.includes("AllImg")
          ? `/AllImg/${imgData._id}`
          : `/AllImg/${imgData._id}`
      }
      className={clsx(i !== 0 && "my-2", "block relative overflow-hidden")}
    >
      {/* Low-quality encoded image as background */}
      <div
        style={{
          backgroundImage: `url(${imgData?.encodedUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: loadedImg ? "blur(0px)" : "blur(10px)", // Blur effect on encoded image
          transition: "filter 0.4s ease-in-out",
        }}
        className="relative w-full h-auto rounded-2xl"
      >
        {/* High-resolution Image */}
        <Image
          width={500}
          height={500}
          onLoad={() => setLoadedImg(true)}
          loading="lazy"
          src={imgData?.thumbnail}
          alt={`Gallery ${i}`}
          className={clsx(
            "w-full object-cover object-center h-auto rounded-2xl border-2 border-light-primary-color/10 dark:border-light-primary-color/10 shadow-lg",
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
              {formatNumber(imgData?.react)}
            </p>
            <FiEye />
            <p className="font-Space text-xs -ms-2">
              {formatNumber(imgData?.view)}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ImgCard;
