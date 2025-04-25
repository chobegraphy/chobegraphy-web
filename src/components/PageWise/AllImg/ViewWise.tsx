import { useState } from "react";
import { useSelector } from "react-redux";

const ViewWise = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);

  const [selectedDistrict, setSelectedDistrict] = useState<{
    English: string;
    Bengali: string;
  } | null>(null);

  const viewCategory = [
    { English: "Most Viewed", Bengali: "সর্বাধিক ভিউ" },
    { English: "Less Viewed", Bengali: "কম ভিউ" },
  ];

  return (
    <div className="pb-10">
      <div className="-mt-2 pb-3 flex  items-start flex-col w-full">
        <h1 className="mb-2">
          <span className="font-BanglaSubHeading text-xl">
            {Language === "BN" && "ভিউ অনুসারে"}
          </span>
          <span className="font-Righteous text-xl">
            {Language === "EN" && "View Wise"}
          </span>
          :
        </h1>
        <div className="">
          {viewCategory.map((data: any) => (
            <button
              onClick={() => {
                setSelectedDistrict(data);
              }}
              key={data.English}
              className={`${
                Language === "BN" ? "gap-x-2" : "gap-x-1 font-Space"
              } flex items-center `}
            >
              <div className="content">
                <label className="checkBox">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDistrict(data);
                      }
                    }}
                    id="ch1"
                    type="checkbox"
                    checked={
                      selectedDistrict?.English === data.English ||
                      selectedDistrict?.Bengali === data.Bengali
                    }
                  />
                  <div className="transition"></div>
                </label>
              </div>{" "}
              <span className="font-BanglaSubHeading">
                {Language === "BN" && data?.Bengali}
              </span>
              {Language === "EN" && data?.English}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewWise;
