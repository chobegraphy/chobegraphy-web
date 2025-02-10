import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const ImgCard = ({ img, i }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);

  // If img is empty, do not render anything
  if (!img) return null;

  return (
    <Link href={`AllImg/${i}`} className={`${i !== 0 && "my-2"}`}>
      {!loadedImg ? (
        <Skeleton className="h-full absolute w-full rounded" />
      ) : null}
      <div className="relative">
        <Image
          width={500}
          height={500}
          onLoad={() => setLoadedImg(true)}
          loading="lazy"
          src={img}
          alt={`Gallery ${i}`}
          className="w-full mb-1 h-auto rounded-2xl border-2 border-dark-primary-color/10 dark:border-light-primary-color/10 shadow-lg"
        />
      </div>
      {loadedImg && (
        <div className="rounded-2xl max-lg:h-[30px] bg-gradient-to-t from-black/40 to-black/0 h-full absolute w-full bottom-0 p-2 flex items-center justify-between text-sm text-white">
          <div className="flex items-center gap-x-3 absolute bottom-3 left-3">
            <FaRegHeart />
            <p className="font-Space text-xs -ms-2">2.1k</p>
            <FiEye />
            <p className="font-Space text-xs -ms-2">21k</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ImgCard;
