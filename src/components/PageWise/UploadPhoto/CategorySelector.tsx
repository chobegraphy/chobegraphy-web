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
                className="mt-2 font-Space font-semibold"
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: "white", // Ensures a fixed light background
                        color: "black",
                        border: "none", // Removes the default border
                        boxShadow: "none", // Disables focus outline
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "white",
                        color: "black",
                    }),
                    option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused ? "#f0f0f0" : "white",
                        color: "black",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#e0e0e0",
                        color: "black",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "black",
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: "black",
                        ":hover": {
                            backgroundColor: "red",
                            color: "white",
                        },
                    }),
                }}
            />


        </div>
    );
};

export default CategorySelector;
