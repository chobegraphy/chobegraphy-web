import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const UploadInfo = ({ colors }: any) => {
    const Language = useSelector((state: any) => state.Language.value);
    const { theme } = useTheme()
    return (
        <div>
            <p style={{ border: `2px solid ${colors?.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="mt-2 mb-2  rounded-xl w-fit px-2 font-Space">
                <span className="font-BanglaHeading">
                    {Language === "BN" && "নোট"}
                </span>{" "}
                {Language === "EN" && "Note"} :
            </p>
            <p className="mt-2 mb-2  rounded-xl w-fit px-2 font-Space text-justify">
                <span className="font-BanglaSubHeading">
                    {Language === "BN" && "একবার ছবি আপলোড হয়ে গেলে, এডমিন কর্তৃক পর্যালোচনা না করা পর্যন্ত এটি পেন্ডিং অবস্থায় থাকবে। অ্যাপ্রুভড করার পরেই এটি সর্বজনীনভাবে উপলব্ধ করা হবে। এটি নিশ্চিত করে যে সমস্ত ছবি আমাদের মান এবং বিষয়বস্তুর মান পূরণ করে।"}
                </span>{" "}
                {Language === "EN" && "Once a picture is uploaded, it will remain in a pending state until reviewed by an admin. Only after approval will it be made publicly available. This ensures that all images meet our quality and content standards"}
            </p>
            <p style={{ border: `2px solid ${colors?.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className="mt-2 mb-2  rounded-xl w-fit px-2 font-Space">
                <span className="font-BanglaHeading">
                    {Language === "BN" && "ছবি আপলোড নির্দেশিকা"}
                </span>{" "}
                {Language === "EN" && "Picture Upload Guidelines"} :
            </p>
            <div className="font-Space px-2"><li> <span className="font-BanglaSubHeading">
                {Language === "BN" && "আপলোড করা সমস্ত ছবি উচ্চমানের, পরিষ্কার এবং অস্পষ্টতা বা পিক্সেলেশন মুক্ত হওয়া উচিত।"}
            </span>{" "}
                {Language === "EN" && "Ensure all uploaded images are of high quality, clear, and free from blurriness or pixelation."}</li>
                <li><span className="font-BanglaSubHeading">
                    {Language === "BN" && "ছবিতে ওয়াটারমার্ক, লোগো বা কোনো লেখা সংযুক্ত করবেন না"}
                </span>{" "}
                    {Language === "EN" && "Do not include watermarks, logos, or any text overlays on the images."}</li>
                <li><span className="font-BanglaSubHeading">
                    {Language === "BN" && "শুধুমাত্র উপযুক্ত সামগ্রী আপলোড করুন যা সকল দর্শকের জন্য যা নিরাপদ । অশ্লীল, সহিংস বা আপত্তিকর ছবি সম্পূর্ণ নিষিদ্ধ।"}
                </span>{" "}
                    {Language === "EN" && "Only upload appropriate content that is safe for all audiences—explicit, violent, or offensive images are strictly prohibited."}</li>
                <li><span className="font-BanglaSubHeading">
                    {Language === "BN" && "সঠিক ক্যাটাগরি নির্বাচন করুন যাতে ব্যবহারকারীরা সহজেই ছবি খুঁজে পেতে পারেন"}
                </span>{" "}
                    {Language === "EN" && "Select the correct category to help users find images easily."}</li>

                <li><span className="font-BanglaSubHeading">
                    {Language === "BN" && "শুধুমাত্র আপনার নিজের তোলা ছবি বা যেগুলোর প্রকাশের অনুমতি রয়েছে সেগুলিই আপলোড করুন।"}
                </span>{" "}
                    {Language === "EN" && "Upload only original images or those you have permission to share publicly."}</li>

            </div>

        </div>
    );
};

export default UploadInfo;