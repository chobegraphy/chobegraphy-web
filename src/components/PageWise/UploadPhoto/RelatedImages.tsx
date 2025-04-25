"use client";
import { useSelector } from "react-redux";
import { useGetSuggestionsDataQuery } from "../../../../Redux/Features/Apis/Suggestions/ApiSlice";

const RelatedImages = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  // imgDetailsData
  const ImgDetailsData = useSelector(
    (state: any) => state.StoreImgDetailsData.value
  );
  

  //  RTK Query hook to get picture suggestions
  const { data, error, isLoading } = useGetSuggestionsDataQuery({
    categories: ImgDetailsData?.collections,
    excludedId: ImgDetailsData?._id,
  });
  return (
    <div className="xl:px-3">
      <h1 className="text-2xl font-Righteous">
        {/* <span className="font-BanglaHeading">
          {Language === "BN" && "কিছু সাজেসটেড ছবি"}
        </span>
        {Language === "EN" && "Suggested Pictures"} : */}
      </h1>
      <div className="my-3 max-sm:columns-2 max-md:columns-3 max-lg:columns-3 overflow-hidden xl:columns-3 max-xl:columns-3 gap-2 justify-center w-full ">
        {/* {images.slice(0, 10).map((image, index) => (
          <div key={index} className="relative ">
            <ImgCard img={image} i={index} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default RelatedImages;
