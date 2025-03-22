"use client";
import { useSelector } from "react-redux";
import { useGetSuggestionsDataQuery } from "../../../../Redux/Features/Apis/Suggestions/ApiSlice";

import { useGetSuggestionDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetSuggestionData/ApiSlice";
import SuggestionImgCard from "./SuggestionImgCard";

const RelatedImages = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  // imgDetailsData
  const ImgDetailsData = useSelector(
    (state: any) => state.StoreImgDetailsData.value
  );
  console.log("🚀 ~ RelatedImages ~ ImgDetailsData:", ImgDetailsData);

  //  RTK Query hook to get picture suggestions
  const { data, error, isLoading } = useGetSuggestionsDataQuery({
    categories: ImgDetailsData?.collections,
    excludedId: ImgDetailsData?._id,
  });
  const { data: SuggestionData } = useGetSuggestionDataQuery({ collections: ImgDetailsData?.collections })
  console.log("🚀 ~ RelatedImages ~ data:", SuggestionData);
  return (
    <div className={`${SuggestionData !== undefined && SuggestionData.length === 1 && "hidden"} xl:px-3`}>
      <h1 className="text-2xl font-Righteous">
        <span className="font-BanglaHeading">
          {Language === "BN" && "কিছু সাজেসটেড ছবি"}
        </span>
        {Language === "EN" && "Suggested Pictures"} :
      </h1>
      <div className="my-3 max-sm:columns-2 max-md:columns-3 max-lg:columns-3 overflow-hidden xl:columns-3 max-xl:columns-3 gap-2 justify-center w-full ">
        {SuggestionData !== undefined && SuggestionData.filter((image: any) => image?._id !== ImgDetailsData?._id)?.map((image: any, index: any) => (
          <div key={image?._id} className="relative ">
            <SuggestionImgCard i={index} imgData={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedImages;
