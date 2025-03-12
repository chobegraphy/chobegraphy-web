import { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetCollectionsDataQuery } from "../../../../Redux/Features/FeVercelServerApiSlice/Apis/GetCollectionsData/ApiSlice";

interface Category {
    label: string;
    value: string;
}


export default function CategorySelector({
    selectedCategory, setSelectedCategory }: any) {
    const { data: initialCategories } = useGetCollectionsDataQuery({})
    console.log(initialCategories)
    const Language = useSelector((state: any) => state.Language.value);
    const [search, setSearch] = useState("");

    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showNewCollection, setShowNewCollection] = useState<boolean>(false);
    useEffect(() => {
        if (initialCategories) {
            setCategories(initialCategories);
        }
    }, [initialCategories]);

    const handleSelect = (category: Category) => {
        if (selectedCategory.some((item: any) => item.label === category.label)) {
            setSelectedCategory(selectedCategory.filter((item: any) => item.label !== category.label));
        } else {
            setSelectedCategory([...selectedCategory, category]);
        }
    };

    const filteredCategories = categories?.filter(
        (category) =>
            category.label.toLowerCase().includes(search.toLowerCase()) ||
            category.value.includes(search)
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) =>
                prev < filteredCategories.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            handleSelect(filteredCategories[highlightedIndex]);
            setSearch("");
            setHighlightedIndex(-1);
        }
    };


    useEffect(() => {

        const searchInputElement = document.getElementById("searchCategory") as HTMLInputElement;
        if (searchInputElement) {
            searchInputElement.value = "";
        }
    }, [selectedCategory])
    return (
        <div className="w-full mx-auto">
            <div>
                <h1 className="flex items-center gap-x-1 mb-2 font-Space mt-1">
                    <BiSolidCategoryAlt className="text-xl" />
                    <p>
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ক্যাটাগরি সিলেক্ট করুন"}
                        </span>{" "}
                        {Language === "EN" && "Select Categories"} :
                    </p>
                </h1>
                {
                    selectedCategory.length > 0 && <div className="flex flex-wrap gap-2 mb-3">
                        {selectedCategory.map((category: any) => (
                            <button
                                key={category.label}
                                onClick={() => handleSelect(category)}
                                className="bg-black flex items-center justify-center  text-sm text-dark-primary-color dark:bg-dark-primary-color dark:text-light-primary-color border-light-secondary-color overflow-hidden border rounded-lg"
                            >

                                <div className="p-2 font-Space">{category.label} / <span className="font-BanglaSubHeading">{category.value}</span></div> <div className=" bg-dark-primary-color dark:bg-light-primary-color px-1 flex items-center justify-center 
                            text-light-primary-color dark:text-dark-primary-color h-full text-sm"><span className="scale-70">✖</span></div>
                            </button>
                        ))}
                    </div>
                }
            </div>
            <div className="relative"> <input id="searchCategory"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                }}
                className={`${showDropdown ? "border  rounded-xl  rounded-b-none" : "border rounded-xl"} font-Space border border-light-secondary-color  outline-none w-full px-3 py-2`}
                onKeyDown={handleKeyDown}
                onClick={() => setShowDropdown(true)}
            />
                <div className="absolute right-2  flex items-center justify-center top-0  h-full p-1"> <div className=" h-full flex items-center gap-x-1">
                    <IoIosArrowDown onClick={() => setShowDropdown(!showDropdown)} className={`${!showDropdown ? "rotate-180" : "rotate-0"} 
                     w-auto text-light-primary-color dark:text-dark-primary-color p-0.5 h-[80%] my-auto
                     transform duration-300   `} />
                    <FiPlus onClick={() => setShowNewCollection(!showNewCollection)} className={`${!showNewCollection ? "rotate-180" : "rotate-0"} w-auto dark:text-light-primary-color text-dark-primary-color bg-light-primary-color dark:bg-dark-primary-color rounded-full p-0.5 h-[80%] my-auto
                     transform duration-300   `} />
                </div></div>
            </div>
            {!showNewCollection && showDropdown && (
                <div className={`${showDropdown ? "border  rounded-xl  rounded-t-none" : "border rounded-xl "} font-Space border-light-secondary-color overflow-y-auto h-full max-h-[200px]`}>
                    {filteredCategories?.map((category, index) => (
                        <button
                            key={category.label}
                            onClick={() => handleSelect(category)}
                            className={`block w-full text-left p-2 ${selectedCategory.includes(category) && "hidden"}  ${selectedCategory.some((item: any) => item.label === category.label)
                                ? "bg-black text-white dark:bg-dark-primary-color dark:text-light-primary-color"
                                : highlightedIndex === index
                                    ? "dark:bg-dark-primary-color dark:text-light-primary-color bg-light-primary-color text-dark-primary-color"
                                    : " dark:bg-black hover:dark:bg-dark-primary-color hover:dark:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color dark:text-dark-primary-color bg-dark-primary-color text-light-primary-color"
                                }`}
                        >
                            {category.label} / <span className="font-BanglaSubHeading">{category.value}</span>
                        </button>
                    ))}
                </div>
            )}
            {showNewCollection && !showDropdown && (
                <div className={` rounded-xl mt-3 font-Space border-light-secondary-color  flex max-md:flex-col items-center px-5 h-full max-h-[200px]`}>
                    <div><div
                        className="flex w-full gap-x-2 items-center justify-center"
                    >
                        <h1 className="w-[65px]">English :</h1> <input
                            placeholder="English Word"


                            className={`rounded-xl font-Space border-2 border-light-secondary-color  outline-none flex-grow px-3 py-2`}
                        />

                    </div><div
                        className="flex mt-1 w-full gap-x-2 items-center justify-center"
                    >
                            <h1 className="w-[55px]">বাংলা</h1> :<input
                                placeholder="বাংলা শব্দ"


                                className={`rounded-xl font-BanglaSubHeading border-2 border-light-secondary-color  outline-none flex-grow px-3 py-2`}
                            />

                        </div></div><button className="w-full h-full dark:bg-dark-primary-color max-md:py-[10px] bg-light-primary-color dark:text-light-primary-color text-dark-primary-color max-md:mt-2 font-Bold  py-[33px] rounded-xl ms-1 ">                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "যোগ করুন"}
                        </span>{" "}
                        <h1 className="font-Bayon uppercase font-bold">{Language === "EN" && "Add"}</h1></button>
                </div>
            )}
        </div>
    );
}
