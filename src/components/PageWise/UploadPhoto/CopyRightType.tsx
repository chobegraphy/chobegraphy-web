import { useSelector } from "react-redux";

const CopyRightType = ({ SelectedCopyrightType, setSelectedCopyrightType }: any) => {
    const Language = useSelector((state: any) => state.Language.value);

    return (
        <div>
            <p className="mt-3">
                <span className="font-BanglaHeading">
                    {Language === "BN" && "কপিরাইট টাইপ"}
                </span>{" "}
                {Language === "EN" && "Copyright type"}

                <div onClick={() => setSelectedCopyrightType("CC-0")} className="flex justify-between items-center cursor-pointer  w-[70px]">
                    <div className="text-lg">CC-0</div>
                    <div className="w-4 h-4 -mt-0.5 rounded-xl border-2"><div className={`${SelectedCopyrightType === "CC-0" ? "dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"} rounded-xl border-none transform duration-300`}></div></div>
                </div>
                <div onClick={() => setSelectedCopyrightType("CC-BY")} className="flex  items-center cursor-pointer justify-between w-[70px]">
                    <div className="text-lg">CC-BY</div>
                    <div className="w-4 h-4 -mt-0.5 rounded-xl border-2"><div className={`${SelectedCopyrightType === "CC-BY" ? "dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"} rounded-xl border-none transform duration-300`}></div></div>
                </div>

            </p>
        </div>
    );
};

export default CopyRightType;