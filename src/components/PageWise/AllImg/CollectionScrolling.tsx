import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCollectionsDataWithPictureQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetCollectionDataWithPicture/ApiSlice";

const CollectionScrolling = () => {
    const Language = useSelector((state: any) => state.Language.value);
    const { data: collectionData } = useGetCollectionsDataWithPictureQuery({});
    const [collectionImgData, setCollectionImgData] = useState<{ label: string; value: string; examplePicture: { thumbnail: string; encodedUrl: string; } }[]>([]);
    const router = useRouter();
    const params = useSearchParams();
    const filter = params.get("filter");
    const currentPage = params.get("CurrentPage");
    const collection = params.get("collection");
    useEffect(() => {
        if (collectionData) {
            const collectionLower = collection?.toLowerCase();
            const matched = collectionData.find(
                (item: any) => item.label?.toLowerCase() === collectionLower
            );

            const newCollection = [{
                label: "All",
                value: "সব",
                examplePicture: {
                    thumbnail: "/images/All.png",
                    encodedUrl: "/images/All.png",
                }
            }];

            if (matched) {
                newCollection.push(matched);
            }

            newCollection.push(
                ...collectionData.filter(
                    (item: any) => item.label?.toLowerCase() !== collectionLower
                )
            );

            setCollectionImgData(newCollection);
        }
    }, [collectionData]);




    // Split into two halves



    // Render each item
    const renderItem = (collectionData: any) => (
        <div key={collectionData?.label} onClick={() => {
            router.replace(`/AllImg?filter=${filter}&CurrentPage=${currentPage}&collection=${collectionData?.label}`);

        }}

            className={`max-lg:w-[100px] max-lg:h-[40px] w-[135px] border-2 max-lg:rounded-lg object-cover object-center cursor-pointer overflow-hidden h-[50px] relative flex justify-center rounded-xl items-center max-md:text-[10px] text-xs me-2
                ${collectionData?.label === collection ? "dark:border-dark-primary-color/80 border-light-primary-color" : "border-light-primary-color/10 dark:border-dark-primary-color/10"}`}
        >
            {collectionData?.label === "All" ? <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> : <Image placeholder="blur"
                blurDataURL={collectionData?.examplePicture?.encodedUrl}
                quality={70}
                className="object-cover object-center h-full w-full"
                alt={collectionData?.label}
                src={collectionData?.examplePicture?.thumbnail}
                width={200}
                height={200}
            />}
            <div
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "white" }}
                className="absolute font-Space text-light-primary-color dark:text-dark-primary-color bg-black/20 w-full text-center h-full flex items-center justify-center"
            >
                <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                    {Language === "BN" ? collectionData?.value : collectionData?.label}
                </p>
            </div>
        </div>
    );

    return (
        <div className="-mb-5">
            <div className="w-full flex justify-between mb-2 mt-5 items-center">
                <h1
                    id="title"
                    className="font-Righteous text-lg xl:text-2xl text-start text-black dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" ? "ক্যাটাগরি :" : "Collections :"}
                    </p>
                </h1>

            </div>
            <div style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }} className="flex overflow-x-auto    w-full">
                {collectionImgData?.map((item: any) => (
                    <div className="w-[130px] max-lg:w-[100px] max-lg:mx-0.5 mx-1 flex-shrink-0" key={item?.label}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionScrolling;
