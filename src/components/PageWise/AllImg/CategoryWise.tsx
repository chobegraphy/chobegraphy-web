import { useState } from "react";
import { useSelector } from "react-redux";

const CategoryWise = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);

  const [selectedDistrict, setSelectedDistrict] = useState<{
    English: string;
    Bengali: string;
  } | null>(null);
  const [districtsToShow, setDistrictsToShow] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const photoCategoryValues = [
    { English: "Nature", Bengali: "প্রকৃতি" },
    { English: "Portraits", Bengali: "পোর্ট্রেট" },
    { English: "Landscape", Bengali: "দৃশ্যপট" },
    { English: "Wildlife", Bengali: "বন্যপ্রাণী" },
    { English: "Street Photography", Bengali: "স্ট্রিট ফটোগ্রাফি" },
    { English: "Architectural", Bengali: "স্থাপত্য" },
    { English: "Fashion", Bengali: "ফ্যাশন" },
    { English: "Black and White", Bengali: "সাদা-কালো" },
    { English: "Aerial", Bengali: "এয়ারিয়াল" },
    { English: "Macro", Bengali: "ম্যাক্রো" },
    { English: "Event Photography", Bengali: "ইভেন্ট ফটোগ্রাফি" },
    { English: "Sports Photography", Bengali: "খেলাধুলার ফটোগ্রাফি" },
    { English: "Food Photography", Bengali: "খাবারের ফটোগ্রাফি" },
    { English: "Travel Photography", Bengali: "ভ্রমণের ফটোগ্রাফি" },
    { English: "Product Photography", Bengali: "প্রোডাক্ট ফটোগ্রাফি" },
    { English: "Night Photography", Bengali: "রাত্রিকালীন ফটোগ্রাফি" },
    { English: "Underwater Photography", Bengali: "জলের নিচের ফটোগ্রাফি" },
    { English: "Abstract Photography", Bengali: "অ্যাবস্ট্রাক্ট ফটোগ্রাফি" },
    { English: "Candid Photography", Bengali: "ক্যান্ডিড ফটোগ্রাফি" },
    { English: "Documentary Photography", Bengali: "ডকুমেন্টারি ফটোগ্রাফি" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setDistrictsToShow(5);
  };

  const filteredDistricts = photoCategoryValues.filter((district) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      district.English.toLowerCase().includes(searchValue) ||
      district.Bengali.toLowerCase().includes(searchValue)
    );
  });

  const districtsToDisplay = filteredDistricts.slice(0, districtsToShow);

  const toggleShowAll = () => {
    if (districtsToShow === 5) {
      setDistrictsToShow(filteredDistricts.length);
    } else {
      setDistrictsToShow(5);
    }
  };
  return (
    <div>
      <div className="-mt-2 pb-3 flex  items-start flex-col w-full">
        <h1 className="mb-2">
          <span className="font-BanglaSubHeading text-xl">
            {Language === "BN" && "ক্যাটাগরি অনুসারে"}
          </span>
          <span className="font-Righteous text-xl">
            {Language === "EN" && "Category Wise"}
          </span>
          :
        </h1>
        <div className="relative w-full">
          <input
            placeholder={
              Language === "BN" ? "ক্যাটাগরি অনুসন্ধান করুন" : "Search Category"
            }
            className={`w-full my-1 p-1 px-2  font-Space outline-none rounded-lg border-2 border-light-secondary-color ${
              Language === "BN" && "font-BanglaSubHeading"
            }`}
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="mt-1">
          {districtsToDisplay.map((data: any) => (
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
        {filteredDistricts.length > 5 && (
          <button
            onClick={toggleShowAll}
            className="text-light-primary-color dark:text-dark-primary-color p-2 rounded-md -mt-1 font-Space underline -ms-1"
          >
            {Language === "EN" && (
              <span>
                {districtsToShow === 5 ? "View All Category" : "View Less"}
              </span>
            )}
            {Language === "BN" && (
              <span className="font-BanglaSubHeading">
                {districtsToShow === 5 ? "সকল ক্যাটাগরি দেখুন" : "কম দেখুন"}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryWise;
