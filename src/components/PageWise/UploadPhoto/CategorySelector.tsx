import { ImgCategory } from "@/ExportedFunctions/ImgCategory";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./CategorySelector.css";

const CategorySelector = ({ setSelectedCategory, selectedCategory }: any) => {
    const Language = useSelector((state: any) => state.Language.value);

    // Transform options to match react-select format
    const transformedOptions = ImgCategory.map((category) => ({
        label: category.English,
        value: category.Bengali,
    }));

    return (
        <div>
            <h1 className="flex items-center gap-x-1 font-Space mt-1">
                <BiSolidCategoryAlt className="text-xl" />
                <p>
                    <span className="font-BanglaSubHeading">
                        {Language === "BN" && "ক্যাটাগরি "}
                    </span>{" "}
                    {Language === "EN" && "Categories"} :
                </p>
            </h1>

            {/* React Select Multi-Select Component */}
            <Select
                options={transformedOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                isMulti
                placeholder="Select categories..."
                className="mt-2"
            />
        </div>
    );
};

export default CategorySelector;
