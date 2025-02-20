"use client";
import Banner from "@/components/PageWise/ImgDetails/Banner";
import RelatedImages from "@/components/PageWise/ImgDetails/RelatedImages";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIncreaseViewCountMutation } from "../../../../../Redux/Features/Apis/IncreaseViewCount/ApiSlice";
import { useGetSingleImgDetailsQuery } from "../../../../../Redux/Features/Apis/SingleImgData/ApiSlice";
import { SetImgDetailsData } from "../../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";

const ImdDetailsPage = () => {
  const pictureId = useParams()?.id;
  const dispatch = useDispatch();
  const pathName = usePathname();
  // imgDetailsData
  const ImgDetailsData = useSelector(
    (state: any) => state.StoreImgDetailsData.value
  );
  // increase view count
  const [
    increaseViewCount,
    {
      data: updateViewCountData,
      isLoading: updateViewCountLoading,
      isError: updateViewCountError,
      error: updateViewCountInitial,
    },
  ] = useIncreaseViewCountMutation();
  // Fetch image details if ImgDetailsData is empty
  const { data, error, isLoading } = useGetSingleImgDetailsQuery(pictureId, {
    skip: !pictureId || !ImgDetailsData, // Skip the API call if pictureId or ImgDetailsData is not available
  });
  useEffect(() => {
    if (data) {
      dispatch(SetImgDetailsData(data));
    }
  }, [data, dispatch]);
  // Reset ImgDetailsData when navigating away
  useEffect(() => {
    return () => {
      dispatch(SetImgDetailsData({})); // Clear the data on unmount or navigation
    };
  }, [pathName, dispatch]);

  const updateViewCount = async () => {
    if (pictureId) {
      const UpdateViewCountResponse = await increaseViewCount({
        id: pictureId,
      }).unwrap();
      console.log(UpdateViewCountResponse);
      dispatch(SetImgDetailsData(UpdateViewCountResponse?.updatedData));
    }
  };
  useEffect(() => {
    const hasViewed =
      typeof window !== "undefined" && localStorage.getItem(`viewed`);
    if (!hasViewed && typeof window !== "undefined" && pictureId) {
      updateViewCount();
      localStorage.setItem(`viewed`, pictureId.toString());
    }
  }, [pictureId]);
  return (
    <div>
      {!ImgDetailsData || Object.keys(ImgDetailsData).length === 0 ? (
        <div className="w-full   h-screen">
          <div className="h-screen dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color w-full   z-50 top-0 bottom-0 flex fixed justify-center items-center">
            <div className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-10 sm:px-10 px-5 py-5 max-lg:grid-cols-1  dark:bg-gradient-to-br from-black to-light-primary-color gap-5 h-full">
          <Banner />
          {/* suggestion */}
          <div className="col-span-4 w-full max-lg:col-span-6 ">
            <RelatedImages />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImdDetailsPage;
