import { useState } from "react";
import { useSelector } from "react-redux";

const DistrictWise = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);

  const [selectedDistrict, setSelectedDistrict] = useState<{
    English: string;
    Bengali: string;
  } | null>(null);
  const [districtsToShow, setDistrictsToShow] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const districtValues = [
    { English: "Bagerhat", Bengali: "বাগেরহাট" },
    { English: "Bandarban", Bengali: "বান্দরবান" },
    { English: "Barisal", Bengali: "বরিশাল" },
    { English: "Bhola", Bengali: "ভোলা" },
    { English: "Bogra", Bengali: "বগুড়া" },
    { English: "Brahmanbaria", Bengali: "ব্রাহ্মণবাড়িয়া" },
    { English: "Chandpur", Bengali: "চাঁদপুর" },
    { English: "Chattogram", Bengali: "চট্টগ্রাম" },
    { English: "Chuadanga", Bengali: "চুয়াডাঙ্গা" },
    { English: "Cumilla", Bengali: "কুমিল্লা" },
    { English: "Dhaka", Bengali: "ঢাকা" },
    { English: "Dinajpur", Bengali: "দিনাজপুর" },
    { English: "Faridpur", Bengali: "ফরিদপুর" },
    { English: "Feni", Bengali: "ফেনী" },
    { English: "Gaibandha", Bengali: "গাইবান্ধা" },
    { English: "Gazipur", Bengali: "গাজীপুর" },
    { English: "Gopalganj", Bengali: "গোপালগঞ্জ" },
    { English: "Habiganj", Bengali: "হবিগঞ্জ" },
    { English: "Jamuna", Bengali: "জামুন্না" },
    { English: "Jhalokathi", Bengali: "ঝালকাঠি" },
    { English: "Jhenaidah", Bengali: "ঝিনাইদহ" },
    { English: "Khagrachari", Bengali: "খাগড়াছড়ি" },
    { English: "Khulna", Bengali: "খুলনা" },
    { English: "Kishoreganj", Bengali: "কিশোরগঞ্জ" },
    { English: "Kurigram", Bengali: "কুড়িগ্রাম" },
    { English: "Kushtia", Bengali: "কুষ্টিয়া" },
    { English: "Lakshmipur", Bengali: "লক্ষ্মীপুর" },
    { English: "Lalmonirhat", Bengali: "লালমনিরহাট" },
    { English: "Madaripur", Bengali: "মাদারিপুর" },
    { English: "Magura", Bengali: "মাগুরা" },
    { English: "Manikganj", Bengali: "মানিকগঞ্জ" },
    { English: "Meherpur", Bengali: "মেহেরপুর" },
    { English: "Moulvibazar", Bengali: "মৌলভীবাজার" },
    { English: "Munshiganj", Bengali: "মুন্সিগঞ্জ" },
    { English: "Mymensingh", Bengali: "ময়মনসিংহ" },
    { English: "Naogaon", Bengali: "নওগাঁ" },
    { English: "Narail", Bengali: "নড়াইল" },
    { English: "Narayanganj", Bengali: "নারায়ণগঞ্জ" },
    { English: "Narsingdi", Bengali: "নরসিংদী" },
    { English: "Netrokona", Bengali: "নেত্রকোনা" },
    { English: "Nilphamari", Bengali: "নীলফামারি" },
    { English: "Noakhali", Bengali: "নোয়াখালী" },
    { English: "Pabna", Bengali: "পাবনা" },
    { English: "Panchagarh", Bengali: "পঞ্চগড়" },
    { English: "Patuakhali", Bengali: "পটুয়াখালী" },
    { English: "Pirojpur", Bengali: "পিরোজপুর" },
    { English: "Rajbari", Bengali: "রাজবাড়ী" },
    { English: "Rajshahi", Bengali: "রাজশাহী" },
    { English: "Rangamati", Bengali: "রাঙ্গামাটি" },
    { English: "Rangpur", Bengali: "রংপুর" },
    { English: "Satkhira", Bengali: "সাতক্ষীরা" },
    { English: "Shariatpur", Bengali: "শরীয়তপুর" },
    { English: "Sherpur", Bengali: "শেরপুর" },
    { English: "Sirajganj", Bengali: "সিরাজগঞ্জ" },
    { English: "Sunamganj", Bengali: "সুনামগঞ্জ" },
    { English: "Sylhet", Bengali: "সিলেট" },
    { English: "Tangail", Bengali: "টাঙ্গাইল" },
    { English: "Thakurgaon", Bengali: "ঠাকুরগাঁও" },
  ];
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setDistrictsToShow(5);
  };

  const filteredDistricts = districtValues.filter((district) => {
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
      <div className="mt-3 pb-3 flex  items-start flex-col w-full">
        <h1 className="mb-2">
          <span className="font-BanglaSubHeading text-xl">
            {Language === "BN" && "জেলাভিত্তিক"}
          </span>
          <span className="font-Righteous text-xl">
            {Language === "EN" && "District Wise"}
          </span>
          :
        </h1>
        <div className="relative w-full">
          <input
            placeholder={
              Language === "BN" ? "জেলা অনুসন্ধান করুন" : "Search district"
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
                {districtsToShow === 5 ? "View All Districts" : "View Less"}
              </span>
            )}
            {Language === "BN" && (
              <span className="font-BanglaSubHeading">
                {districtsToShow === 5 ? "সকল জেলা দেখুন" : "কম দেখুন"}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default DistrictWise;
