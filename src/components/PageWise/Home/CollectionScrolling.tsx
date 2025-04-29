import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useGetCollectionsDataWithPictureQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetCollectionDataWithPicture/ApiSlice";

const CollectionScrolling = () => {
    const Language = useSelector((state: any) => state.Language.value);
    const { data: collectionData } = useGetCollectionsDataWithPictureQuery({});
    const [collectionImgData, setCollectionImgData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (collectionData) {
            setCollectionImgData(collectionData);
        }
    }, [collectionData]);

    // Filter data based on search term
    const filteredData = collectionImgData.filter((item: any) => {
        const searchValue = searchTerm.toLowerCase();
        const labelMatch = item.label?.toLowerCase().includes(searchValue);
        const valueMatch = item.value?.toLowerCase().includes(searchValue);
        return labelMatch || valueMatch;
    });

    // Split into two halves
    const midpoint = Math.ceil(filteredData.length / 2);
    const firstHalf = filteredData.slice(0, midpoint);
    const secondHalf = filteredData.slice(midpoint);

    // Render each item
    const renderItem = (collectionData: any) => (
        <div
            key={collectionData?.label}
            className="w-[145px] border-2 border-light-primary-color/10 dark:border-dark-primary-color/10 object-cover object-center overflow-hidden h-[100px] relative flex justify-center rounded-2xl items-center text-sm mx-2"
        >
            <Image placeholder="blur"
                blurDataURL={collectionData?.examplePicture?.encodedUrl}
                quality={70}
                className="object-cover object-center h-full w-full"
                alt={collectionData?.label}
                src={collectionData?.examplePicture?.thumbnail}
                width={200}
                height={200}
            />
            <div
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "white" }}
                className="absolute font-Space text-light-primary-color dark:text-dark-primary-color bg-black/20 w-full h-full flex items-center justify-center"
            >
                <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                    {Language === "BN" ? collectionData?.value : collectionData?.label}
                </p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl xl:px-16 sm:px-10 px-5 pt-10 pb-20 w-full mx-auto space-y-4">
            <div className="w-full flex justify-between mb-5 items-center">
                <h1
                    id="title"
                    className="font-Righteous text-lg xl:text-3xl text-start text-black dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" ? "ক্যাটাগরি" : "Collections"}
                    </p>
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={Language === "BN" ? "শব্দ/কীওয়ার্ড" : "word/keyword"}
                        className={`w-[180px] md:w-[250px] bg-transparent outline-none font-Space focus:outline-none px-3 rounded-2xl border-2 border-light-primary-color dark:border-dark-primary-color/10 py-2 ${Language === "BN" && "font-BanglaSubHeading"
                            }`}
                    />
                    <button className="absolute z-30 right-1 bg-light-primary-color rounded-xl text-dark-primary-color p-2 top-1">
                        <LuSearch className="text-xl" />
                    </button>
                </div>
            </div>
            {
                filteredData.length === collectionImgData.length ? <><Marquee pauseOnClick={true} pauseOnHover={true} direction="left" speed={10} className="flex overflow-x-auto example w-full">
                    {filteredData.slice(0, Math.ceil(filteredData.length / 2)).map((item: any) => (
                        <div className="w-[145px] mx-1 flex-shrink-0" key={item?.label}>
                            {renderItem(item)}
                        </div>
                    ))}
                </Marquee>
                    <Marquee pauseOnClick={true} pauseOnHover={true} direction="right" speed={10} className="flex overflow-x-auto  example w-full">
                        {filteredData.slice(Math.ceil(filteredData.length / 2)).map((item: any) => (
                            <div className="w-[145px] mx-1 flex-shrink-0" key={item?.label}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </Marquee></> : <div className="flex overflow-x-auto  example w-full">
                    {filteredData.map((item: any) => (
                        <div className="w-[145px] mx-1 flex-shrink-0" key={item?.label}>
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            }




            {/* Optional: No results */}
            {filteredData.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 font-Space mt-4">
                    {Language === "BN" ? "কোন ফলাফল পাওয়া যায়নি" : "No results found"}
                </p>
            )}
        </div>
    );
};

export default CollectionScrolling;
