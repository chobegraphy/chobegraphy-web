import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const BannerImgCard = ({ mainImgLink, encodedUrl, dimensions, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const mainImgRef = useRef<HTMLImageElement>(null);

  const [width, height] = dimensions
    ? dimensions.split(" x ").map((num: string) => parseInt(num, 10))
    : [1920, 1080];

  useEffect(() => {
    if (!mainImgLink) return;

    // Preload main image immediately
    const img = new Image();
    img.src = mainImgLink;
    img.onload = () => {
      img.decode()
        .then(() => setLoadedImg(true))
        .catch(() => setLoadedImg(true)); // Fail-safe: mark as loaded even if decode fails
    };
  }, [mainImgLink]);

  return (
    <div
      className={clsx(
        i !== 0 && "my-2",
        "block relative overflow-hidden rounded-2xl"
      )}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Blurred Low-Quality Image */}
      <img
        src={encodedUrl || "/placeholder.jpg"}
        alt="Blurred preview"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{
          opacity: loadedImg ? 0 : 1,
          imageRendering: "pixelated",
          transform: "scale(1)",
          transition: "opacity 0.5s ease-in-out",
        }}
      />

      {/* High-Quality Image */}
      <img
        ref={mainImgRef}
        src={mainImgLink || "/placeholder.jpg"}
        loading="eager"
        fetchPriority="high"
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
