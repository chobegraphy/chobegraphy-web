import ImgCard from "../Home/Imgcard";

const ImgMappingComponent = ({ ImgData }: any) => {

  return (
    <div onScroll={() => { console.log("hi") }} className="my-10 max-sm:columns-2 max-md:columns-3 max-lg:columns-3 overflow-hidden xl:columns-6 max-xl:columns-4 gap-2 justify-center w-full ">
      {ImgData?.map((imgInfo: any, index: any) => (
        <div key={imgInfo?._id} className="relative ">
          <ImgCard imgData={imgInfo} i={index} />
        </div>
      ))}
    </div>
  );
};

export default ImgMappingComponent;
