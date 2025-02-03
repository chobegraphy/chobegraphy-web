import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import Image from "next/image";
import { useState } from "react";

const ImgCard = ({ img, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  return (
    <div className={`${i !== 0 && "my-2"}`}>
      {/*-> Rahat code */}
      {!loadedImg ? (
        <Skeleton className="h-full absolute w-full rounded" />
      ) : (
        <div></div>
      )}
      <Image
        width={500}
        height={500}
        onLoad={() => setLoadedImg(true)}
        loading="lazy"
        src={img}
        alt={`Gallery ${i}`}
        className="w-full mb-1 h-auto rounded-2xl shadow-lg"
      />

      {/* {loadedImg && (
        <div className="rounded-b max-lg:h-[30px] h-[40px] absolute w-full bottom-0 p-2 bg-light-primary-color/20 flex items-center justify-between text-sm text-white backdrop-blur-lg">
          <h1>Config Name</h1>
          <div className="lg:text-xl flex items-center gap-x-2">
            <IoBookmark className="hover:text-2xl transform duration-300" />
            <MdOutlineSimCardDownload className="hover:text-2xl transform duration-300" />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ImgCard;
