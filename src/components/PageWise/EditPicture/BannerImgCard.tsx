import clsx from "clsx"; // Utility for conditional class names
import Image from "next/image";
import { useState } from "react";

const BannerImgCard = ({ mainImgLink, encodedUrl, dimensions, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);

  // Ensure imgData exists before using it
  if (!dimensions) return null;

  // Extract width and height safely (default to 1920x1080 if missing)
  const [width, height] = dimensions
    ? dimensions.split(" x ").map((num: string) => parseInt(num, 10))
    : [1920, 1080];

  // Calculate aspect ratio (default to 16:9)
  const aspectRatio = width / height || 16 / 9;

  // Format numbers for likes/views
  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <div
      className={clsx(
        i !== 0 && "my-2",
        "block relative overflow-hidden rounded-2xl"
      )}
    >
      {/* Blurred Low-Quality Background */}
      <div
        style={{
          backgroundImage: `url(${encodedUrl})`,
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
          src={mainImgLink || "/placeholder.jpg"} // Fallback if missing
          alt={`Gallery ${i}`}
          className={clsx(
            "w-full object-cover object-center rounded-2xl border-2 border-light-primary-color/10 dark:border-light-primary-color/10 shadow-lg",
            loadedImg
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          )}
        />
      </div>
    </div>
  );
};

export default BannerImgCard;
