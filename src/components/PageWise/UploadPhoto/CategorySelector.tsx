
import { ImgCategory } from "@/ExportedFunctions/ImgCategory";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MultiSelect } from "react-multi-select-component";
import { useSelector } from "react-redux";
import "./CategorySelector.css";
const CategorySelector = ({ setSelectedCategory, selectedCategory }: any) => {

    const Language = useSelector((state: any) => state.Language.value);
    const transformedOptions = ImgCategory.map(category => ({
        label: category.English,
        value: category.Bengali
    }));
    return (
        <div>
            <h1 className="flex items-center gap-x-1 font-Space mt-1">
                <BiSolidCategoryAlt className="text-xl" />
                <p className="">
                    {" "}
                    <span className="font-BanglaSubHeading">
                        {Language === "BN" && "ক্যাটাগরি "}
                    </span>{" "}
                    {Language === "EN" && "Categories"} :{" "}

                </p>
            </h1>
            <MultiSelect
                options={transformedOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                labelledBy="Select"
                hasSelectAll={false} />
        </div>
    );
};

export default CategorySelector;