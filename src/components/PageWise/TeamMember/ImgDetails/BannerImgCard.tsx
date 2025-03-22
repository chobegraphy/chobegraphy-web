import clsx from "clsx"; // Utility for conditional class names
import { useState } from "react";

const BannerImgCard = ({ mainImgLink, encodedUrl, dimensions, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);

  if (!dimensions) return null;

  // Extract width and height safely (default to 1920x1080 if missing)
  const [width, height] = dimensions
    ? dimensions.split(" x ").map((num: string) => parseInt(num, 10))
    : [1920, 1080];

  return (
    <div
      className={clsx(
        i !== 0 && "my-2",
        "block relative overflow-hidden rounded-2xl"
      )}
      style={{ aspectRatio: `${width}/${height}` }} // Maintain aspect ratio
    >
      {/* Blurred Low-Quality Image */}
      <img
        src={encodedUrl || "/placeholder.jpg"} // Use encodedUrl as the blurred background
        alt="Blurred preview"
        className="absolute inset-0 w-full h-full object-cover blur-xl transition-opacity duration-500"
        style={{ opacity: loadedImg ? 0 : 1 }} // Hide blurred image when main image loads
      />

      {/* High-Quality Image */}
      <img

        onLoad={() => setLoadedImg(true)}
        loading="lazy"
        src={mainImgLink || "/placeholder.jpg"} // Main image
        alt={`Gallery ${i}`}
        className={clsx(
          "w-full object-cover object-center rounded-2xl border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 shadow-lg transition-opacity duration-500",
          loadedImg ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default BannerImgCard;
