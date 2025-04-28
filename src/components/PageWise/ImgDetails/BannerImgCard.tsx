import clsx from "clsx";
import Image from "next/image"; // ✅ Important!
import { useState } from "react";

const BannerImgCard = ({ mainImgLink, encodedUrl, dimensions, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);

  const [width, height] = dimensions
    ? dimensions.split(" x ").map((num: string) => parseInt(num, 10))
    : [1920, 1080];

  return (
    <div
      className={clsx(
        i !== 0 && "my-2",
        "block relative overflow-hidden rounded-2xl"
      )}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* ✅ Blurred Low-Quality Image */}
      {!loadedImg && (
        <Image
          src={encodedUrl || "/placeholder.jpg"}
          alt="Blurred preview"
          fill
          className="object-cover blur-sm "
          style={{
            opacity: loadedImg ? 0 : 1,

          }}
          quality={10} // Very low for blur image
          sizes="100vw"
        />
      )}

      {/* ✅ High-Quality Image */}
      <Image
        src={mainImgLink || "/placeholder.jpg"}
        alt={`Gallery ${i}`}
        width={width}
        height={height}
        loading="eager" // Load immediately
        fetchPriority="high"
        onLoadingComplete={() => setLoadedImg(true)} // ✅ Mark as loaded
        className={clsx(
          "w-full object-cover object-center rounded-2xl dark:border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 shadow-lg ",
        )}
        style={{
          opacity: loadedImg ? 1 : 0,

        }}
        quality={75} // 75% quality for better banner image
        sizes="100vw" // full width
      />
    </div>
  );
};

export default BannerImgCard;
