import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const BannerImgCard = ({ mainImgLink, encodedUrl, dimensions, i }: any) => {
  const [loadedHighQuality, setLoadedHighQuality] = useState(false);

  const [width, height] = dimensions
    ? dimensions.split(" x ").map((num: string) => parseInt(num, 10))
    : [1920, 1080];

  return (
    <div
      className={clsx("relative overflow-hidden rounded-2xl")}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* 👇 Blurred placeholder using encodedUrl */}
      {!loadedHighQuality && encodedUrl && (
        <Image
          src={encodedUrl}
          alt="Blur preview"
          fill
          className="object-cover blur-sm "
          quality={25}
          sizes="100vw"
        />
      )}

      {/* 👇 Low-Quality version of main image */}
      {!loadedHighQuality && (
        <Image
          src={mainImgLink}
          alt="Low quality"
          width={width}
          height={height}
          quality={20}
          className={clsx(
            "absolute inset-0 w-full h-full object-cover blur-[1px]  ",
            loadedHighQuality ? "opacity-0" : "opacity-100"
          )}
          sizes="100vw"
          priority={i === 0}
        />
      )}

      {/* 👇 High-Quality version */}
      <Image
        src={mainImgLink}
        alt={`Gallery ${i}`}
        width={width}
        height={height}
        quality={100}
        onLoadingComplete={() => setLoadedHighQuality(true)}
        className={clsx(
          "w-full h-full object-cover object-center rounded-2xl ",
          loadedHighQuality ? "opacity-100" : "opacity-0"
        )}
        sizes="100vw"
        priority={i === 0}
      />
    </div>
  );
};

export default BannerImgCard;
