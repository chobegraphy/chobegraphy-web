import { Skeleton } from "@/components/ui/Skeleton";
import { useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { MdOutlineSimCardDownload } from "react-icons/md";

const ImgCard = ({ img, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  return (
    <div className="">
      {/*-> Rahat code */}
      {!loadedImg ? (
        <Skeleton className="h-full absolute w-full rounded" />
      ) : (
        <div></div>
      )}
      <img
        onLoad={() => setLoadedImg(true)}
        loading="lazy"
        src={img}
        alt={`Gallery ${i}`}
        className="w-full mb-1 h-auto rounded shadow-lg"
      />

      {loadedImg && (
        <div className="rounded-b max-lg:h-[30px] h-[40px] absolute w-full bottom-0 p-2 bg-light-primary-color/20 flex items-center justify-between text-sm text-white backdrop-blur-lg">
          <h1>Config Name</h1>
          <div className="lg:text-xl flex items-center gap-x-2">
            <IoBookmark className="hover:text-2xl transform duration-300" />
            <MdOutlineSimCardDownload className="hover:text-2xl transform duration-300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgCard;
