import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useAddNewCollectionDataMutation } from "../../../../Redux/Features/FeVercelServerApiSlice/Apis/AddCollectionData/ApiSlice";
import { useGetCollectionsDataQuery } from "../../../../Redux/Features/FeVercelServerApiSlice/Apis/GetCollectionsData/ApiSlice";

interface Category {
    label: string;
    value: string;
}


export default function CategorySelector({
    selectedCategory, setSelectedCategory, colors }: any) {
    console.log(colors)
    const { theme } = useTheme()
    const { data: initialCategories, refetch } = useGetCollectionsDataQuery({})
    const [AddCollectionData] = useAddNewCollectionDataMutation()
    console.log(initialCategories)
    const Language = useSelector((state: any) => state.Language.value);

    const [search, setSearch] = useState("");

    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showNewCollection, setShowNewCollection] = useState<boolean>(false);
    const [newCollectionBanglaName, setNewCollectionBanglaName] = useState<string>('');
    const [newCollectionEnglishName, setNewCollectionEnglishName] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialCategories) {
            setCategories((prev) => {
                // ✅ Merge previous categories with initial categories, avoiding duplicates
                const mergedCategories = [...prev, ...initialCategories].reduce((acc, category) => {
                    if (!acc.find((item: any) => item.label === category.label)) {
                        acc.push(category);
                    }
                    return acc;
                }, [] as Category[]);

                return mergedCategories;
            });
        }
    }, [initialCategories]);  // ✅ Remove `categories` from dependency array


    const handleSelect = (category: Category) => {
        if (selectedCategory.find((item: any) => item.label === category.label)) {
            setSelectedCategory(selectedCategory.filter((item: any) => item.label !== category.label));
        } else {
            setSelectedCategory([...selectedCategory, category]);
        }
    };

    const filteredCategories = categories?.filter(
        (category) =>
            category?.label?.toLowerCase()?.includes(search.toLowerCase()) ||
            category?.value?.includes(search)
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
    }, [selectedCategory,])
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    // Prevent background scrolling when dropdown is open
    useEffect(() => {
        if (showDropdown) {
            if (window.screen.width < 768) document.body.style.overflow = "hidden";
        } else {
            if (window.screen.width < 768) document.body.style.overflow = "";
        }
    }, [showDropdown]);

    const handleAddCollection = async () => {
        try {
            const newCollectionResponse = await AddCollectionData({
                data: {
                    label: newCollectionEnglishName,
                    value: newCollectionBanglaName
                }
            });

            if (newCollectionResponse?.data) {
                const newCategory = { label: newCollectionEnglishName, value: newCollectionBanglaName };

                setSelectedCategory((prev: any) => [...prev, newCategory]); // ✅ Add to selected

                // ✅ Merge new category with the existing ones in `categories`
                setCategories((prev) => [...prev, newCategory]);

                toast.success(Language === "BN" ? "ক্যাটেগরি যুক্ত হয়েছে" : "Collection Added Successfully");

                // ✅ Reset input fields & close the "Add New" dropdown
                setNewCollectionEnglishName('');
                setNewCollectionBanglaName('');
                setShowNewCollection(false);
            }
        } catch (error) {
            toast.error(Language === "BN" ? "ক্যাটেগরি যোগ করতে ব্যর্থ" : "Failed to add collection");
        }
    };

    return (
        <div className="w-full mx-auto mt-2">
            <div className={`${selectedCategory.length > 0 && "mb-5"}`}>
                {selectedCategory.length > 0 && <h1 className="flex items-center gap-x-1 mb-1 font-Righteous mt-1">
                    <p>
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "সিলেক্টেড ক্যাটেগরি"}
                        </span>{" "}
                        {Language === "EN" && "Selected Categories"} :
                    </p>
                </h1>}
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
            <div id="dropdown" ref={dropdownRef}> <div className="relative mt-4">
                <h1 style={{ border: `2px solid ${colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl font-Space items-center">

                    <p>
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ক্যাটাগরি সার্চ করুন"}
                        </span>{" "}
                        {Language === "EN" && "Search Category"} :
                    </p>
                </h1>
                <input id="searchCategory"

                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(true);
                    }}
                    style={{ border: `2px solid ${colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000"}`, caretColor: colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000" }}
                    className={`${showDropdown ? "border  rounded-xl  rounded-b-none" : "border rounded-xl"} font-Space   outline-none bg-transparent w-full px-3 py-3`}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                        setShowDropdown(true);
                        setShowNewCollection(false); // ✅ Close "Add New" section
                    }}
                />
                <div className="absolute right-2  flex items-center justify-center top-0  h-full p-1"> <div className=" h-full flex items-center gap-x-1">
                    <IoIosArrowDown onClick={() => {
                        setShowNewCollection(false);
                        setShowDropdown(!showDropdown)
                    }} className={`${!showDropdown ? "rotate-180" : "rotate-0"} 
                     w-auto text-light-primary-color dark:text-dark-primary-color p-0.5 h-[80%] my-auto
                     transform duration-300   `} />
                    <FiPlus onClick={() => {
                        setShowDropdown(false);
                        setShowNewCollection(!showNewCollection)
                    }} className={`${!showNewCollection ? "rotate-180" : "rotate-0"} w-auto dark:text-light-primary-color text-dark-primary-color bg-light-primary-color dark:bg-dark-primary-color rounded-xl p-0.5 h-[70%] my-auto
                     transform duration-300   `} />
                </div></div>
            </div>
                {!showNewCollection && showDropdown && (
                    <div style={{ border: `2px solid ${colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000"}`, caretColor: colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000" }} className={`${showDropdown ? "border  rounded-xl  rounded-t-none" : "border rounded-xl "} font-Space border-light-secondary-color example overflow-y-auto h-full max-h-[200px]`}>
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
                )}</div>
            {showNewCollection && !showDropdown && (
                <div className={` rounded-xl mt-4 font-Space border-light-secondary-color  flex max-md:flex-col items-center  h-full max-h-[200px]`}>
                    <div className="relative w-full"><div

                        className="flex w-full gap-x-2 items-center justify-center"
                    >
                        <h1 style={{ border: `2px solid ${colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">English :</h1> <input
                            onChange={(e) => setNewCollectionEnglishName(e.target.value)}
                            onPaste={(e) => setNewCollectionEnglishName(e.clipboardData.getData('text'))}

                            className={`rounded-xl font-Space border-2 border-light-secondary-color bg-transparent outline-none flex-grow px-3 py-3`}
                        />

                    </div><div
                        className="flex mt-4 w-full gap-x-2 items-center justify-center relative"
                    ><h1 style={{ border: `2px solid ${colors?.length > 0 ? colors[2]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">বাংলা :</h1>
                            <input onChange={(e) => setNewCollectionBanglaName(e.target.value)}
                                onPaste={(e) => setNewCollectionBanglaName(e.clipboardData.getData('text'))}
                                className={`rounded-xl font-BanglaSubHeading border-2 border-light-secondary-color  outline-none bg-transparent flex-grow px-3 py-3`}
                            />

                        </div></div><button onClick={() => handleAddCollection()} className="w-[40%]  h-full dark:bg-dark-primary-color max-md:py-[10px] bg-light-primary-color dark:text-light-primary-color text-dark-primary-color max-md:mt-2 font-Bold  py-[45px] rounded-xl ms-1 ">                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "যোগ করুন"}
                        </span>{" "}
                        <h1 className="font-Bayon uppercase font-bold">{Language === "EN" && "Add"}</h1></button>
                </div>
            )}
        </div>
    );
}
