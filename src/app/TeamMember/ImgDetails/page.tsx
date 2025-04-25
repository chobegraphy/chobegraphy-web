"use client";

import ApproveOrDecline from "@/components/PageWise/TeamMember/ImgDetails/ApproveOrDecline";
import Banner from "@/components/PageWise/TeamMember/ImgDetails/Banner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ImSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { usePictureApproveMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/TeamApprovePicture/ApiSlice";
import { useGetSingleImgDetailsQuery } from "../../../../Redux/Features/Apis/SingleImgData/ApiSlice";
import { SetImgDetailsData } from "../../../../Redux/Features/StoreImgDetailsData/StoreImgDetailsData";


const ImdDetailsPage = () => {
  const router = useRouter()
  const params = useSearchParams();
  const id = params.get("id");
  const dispatch = useDispatch();
  const pathName = usePathname();
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  // imgDetailsData
  const ImgDetailsData = useSelector(
    (state: any) => state.StoreImgDetailsData.value
  );
  // increase view count
  const [
    pictureApprove,
    {

      isLoading: PictureApproveLoading,

    },
  ] = usePictureApproveMutation();
  // Fetch image details if ImgDetailsData is empty
  const { data, error, isLoading } = useGetSingleImgDetailsQuery(id, {
    skip: !id, // Skip the API call if pictureId or ImgDetailsData is not available
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

  return (
    <div>
      {isLoading || !ImgDetailsData || Object.keys(ImgDetailsData).length === 0 ? (
        <div className="w-full   h-screen">
          <div className="h-dvh dark:bg-gradient-to-br from-black to-light-primary-color bg-dark-primary-color w-full   z-50 top-0 bottom-0 flex fixed justify-center items-center">
            <ImSpinner
              className={`text-3xl animate-spin `}
            />
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-10 sm:px-10 px-5 py-5 max-lg:grid-cols-1  dark:bg-gradient-to-br from-black to-light-primary-color gap-5 h-full">
          <Banner />
          {/* suggestion */}
          <ApproveOrDecline />

        </div>
      )}
    </div>
  );
};

export default ImdDetailsPage;
