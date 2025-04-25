"use client";
import { useSelector } from "react-redux";
import { useGetSuggestionsDataQuery } from "../../../../Redux/Features/Apis/Suggestions/ApiSlice";

import Masonry from "react-masonry-css";
import { useGetSuggestionDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetSuggestionData/ApiSlice";
import SuggestionImgCard from "./SuggestionImgCard";

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
  const { data: SuggestionData } = useGetSuggestionDataQuery({ collections: ImgDetailsData?.collections })
  const breakpointColumnsObj = {
    default: 3,    // 3 columns for screens >= 1024px
    768: 3,     // 2 columns for tablets
    640: 2,      // 1 column for small screens
    300: 2,
  };
  return (
    <div className={`${SuggestionData !== undefined && SuggestionData.length === 1 && "hidden"} xl:px-3`}>
      <h1 className="text-2xl font-Righteous">
        <span className="font-BanglaHeading">
          {Language === "BN" && "কিছু সাজেসটেড ছবি"}
        </span>
        {Language === "EN" && "Suggested Pictures"} :
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-2 mt-5"
        columnClassName="masonry-column"
      >
        {SuggestionData !== undefined && SuggestionData.filter((image: any) => image?._id !== ImgDetailsData?._id)?.map((image: any, index: any) => (
          <div key={image?._id} className="relative mb-2">
            <SuggestionImgCard i={index} imgData={image} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default RelatedImages;
