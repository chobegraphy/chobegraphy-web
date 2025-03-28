import Masonry from "react-masonry-css";
import ImgCard from "./Imgcard";

const ImgMappingComponent = ({ ImgData }: any) => {
  const breakpointColumnsObj = {
    default: 5, // 5 columns on large screens
    1280: 5,    // 4 columns for screens >= 1280px
    1024: 4,    // 3 columns for screens >= 1024px
    768: 3,     // 2 columns for tablets
    640: 2,      // 1 column for small screens
    300: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-2 mt-5"
      columnClassName="masonry-column"
    >
      {ImgData?.map((imgInfo: any, index: number) => (
        <div key={imgInfo?._id} className="relative w-full mb-2">
          <ImgCard imgData={imgInfo} i={index} />
        </div>
      ))}
    </Masonry>
  );
};

export default ImgMappingComponent;
