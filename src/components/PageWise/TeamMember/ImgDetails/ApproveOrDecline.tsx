import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { SiTicktick } from "react-icons/si";
import { TiCancel } from "react-icons/ti";
import { useSelector } from "react-redux";
import { usePictureApproveMutation } from "../../../../../Redux/Features/Apis/DataRelated/Apis/TeamApprovePicture/ApiSlice";
import { usePictureRejectMutation } from "../../../../../Redux/Features/Apis/DataRelated/Apis/TeamRejectPicture/ApiSlice";

const ApproveOrDecline = () => {
    const Language = useSelector((state: any) => state.Language.value);
    const { theme } = useTheme()
    const router = useRouter()
    const params = useSearchParams();
    const id = params.get("id");
    const [
        pictureApprove,
        {

            isLoading: PictureApproveLoading,

        },
    ] = usePictureApproveMutation();
    const [
        pictureReject,
        {

            isLoading: PictureRejectLoading,

        },
    ] = usePictureRejectMutation();
    const [
        pictureDeclineReason, setPictureDeclineReason
    ] = useState("")
    const [CustomCancelReason, setCustomCancelReason] = useState("")

    useEffect(() => {
        if (pictureDeclineReason !== "") {
            setCustomCancelReason(pictureDeclineReason)
        }

    }, [pictureDeclineReason])
    return (
        <div className="col-span-4 max-lg:col-span-6 w-full">
            <div className="col-span-4 w-full max-lg:col-span-6 ">
                <button id="ApprovePictureButton" onClick={async () => {
                    const response = await pictureApprove({ id: id }).unwrap();
                    if (response?.message === "Picture status updated to approved") {
                        router.replace("/TeamMember/Pending?status=Pending&CurrentPage=1")
                    }
                }} className="flex items-center dark:bg-dark-primary-color    w-full bg-light-primary-color text-dark-primary-color rounded-xl mt-2 justify-center gap-x-2 z-50 dark:text-light-primary-color cursor-pointer  h-14 "
                >
                    {
                        PictureApproveLoading && <ImSpinner className="text-3xl animate-spin " />
                    }
                    {
                        !PictureApproveLoading && <><SiTicktick className="text-2xl" />
                            <span className="">
                                <p className={`${Language === "BN" && "font-BanglaHeading"} text-lg`}>
                                    {Language === "BN" && "ছবি অ্যাপ্রুভড করুন"}
                                </p>
                                {Language === "EN" && <span className="font-Righteous text-xl">Approve Picture</span>}
                            </span></>}

                </button>
            </div>


            <section className="w-full">

                <div className={`flex justify-between items-center w-full py-1.5 cursor-pointer`}><p className="mt-5 mb-2  w-fit px-2 font-Space">
                    <span className="font-BanglaHeading">
                        {Language === "BN" && "ছবি রিজেক্ট করার কারণ"}
                    </span>{" "}
                    {Language === "EN" && "Picture Reject Reason"} :
                </p></div>

                <div className="font-Space relative mt-2 max-md:text-base ">
                    <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "কারণ লিখুন"}
                        </span>{" "}
                        {Language === "EN" && "Write the reason"} :{" "}
                    </p>
                    <textarea value={CustomCancelReason} id="CustomCancelReason" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}`, caretColor: theme === "dark" ? "#575757" : "#000" }} onChange={(e) =>
                        setCustomCancelReason(e.target.value)
                    } onPaste={(e) => setCustomCancelReason(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `}></textarea>
                </div>
                {/*  */}
                <div className={` transform text-justify duration-300 font-Space px-2`}>
                    {/*  */}
                    <div onClick={() => setPictureDeclineReason("ছবি উচ্চমানের নয়")} className="flex items-center gap-x-2 my-3 cursor-pointer"><div className="w-4 h-4 -mt-0.5  rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`
                     ${pictureDeclineReason === "ছবি উচ্চমানের নয়" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"}
                    rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>  <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ছবি উচ্চমানের নয়"}
                        </span>{" "}
                        {Language === "EN" && "The picture is not high quality."}</div>
                    {/*  */}
                    <div onClick={() => setPictureDeclineReason("ছবি পরিষ্কার নয়")} className="flex items-center gap-x-2 my-3 cursor-pointer"><div className="w-4 h-4 -mt-0.5  rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`
                     ${pictureDeclineReason === "ছবি পরিষ্কার নয়" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"}
                    rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>  <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ছবি পরিষ্কার নয়"}
                        </span>{" "}
                        {Language === "EN" && "The picture is not clear."}</div>
                    {/*  */}
                    <div onClick={() => setPictureDeclineReason("ছবি অস্পষ্ট")} className="flex items-center gap-x-2 my-3 cursor-pointer"><div className="w-4 h-4 -mt-0.5  rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`
                     ${pictureDeclineReason === "ছবি অস্পষ্ট" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"}
                    rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>  <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ছবি অস্পষ্ট"}
                        </span>{" "}
                        {Language === "EN" && "The picture is blurry."}</div>
                    {/*  */}
                    <div onClick={() => setPictureDeclineReason("ছবি ওয়াটারমার্ক,লোগো বা লেখা সংযুক্ত")} className="flex items-center gap-x-2 my-3 cursor-pointer"><div className="w-4 h-4 -mt-0.5  rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`
                     ${pictureDeclineReason === "ছবি ওয়াটারমার্ক,লোগো বা লেখা সংযুক্ত" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"}
                    rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>  <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ছবি ওয়াটারমার্ক,লোগো বা লেখা সংযুক্ত"}
                        </span>{" "}
                        {Language === "EN" && "The picture contains watermarks, logos, or any text overlays."}</div>
                    {/*  */}
                    <div onClick={() => setPictureDeclineReason("ছবি সকল দর্শকের জন্য যা নিরাপদ নয় । অশ্লীল, সহিংস বা আপত্তিকর ছবি সম্পূর্ণ নিষিদ্ধ।")} className="flex items-center gap-x-2 my-3 cursor-pointer"><div className="w-4 h-4 -mt-0.5  rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`
                     ${pictureDeclineReason === "ছবি সকল দর্শকের জন্য যা নিরাপদ নয় । অশ্লীল, সহিংস বা আপত্তিকর ছবি সম্পূর্ণ নিষিদ্ধ।" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"}
                    rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>  <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ছবি সকল দর্শকের জন্য যা নিরাপদ নয় । অশ্লীল, সহিংস বা আপত্তিকর ছবি সম্পূর্ণ নিষিদ্ধ।"}
                        </span>{" "}
                        {Language === "EN" && "The picture contains content that are not safe for all viewers. Pornographic, violent, or offensive images are completely prohibited."}</div>
                    {/*  */}
                    <div onClick={() => setPictureDeclineReason("সঠিক ক্যাটাগরি নির্বাচন করা হয়নি")} className="flex items-center gap-x-2 my-3 cursor-pointer"><div className="w-4 h-4 -mt-0.5  rounded-xl border-2 border-light-secondary-color dark:border-dark-primary-color"><div className={`
                     ${pictureDeclineReason === "সঠিক ক্যাটাগরি নির্বাচন করা হয়নি" ? "bg-light-primary-color dark:bg-dark-primary-color w-full h-full" : " w-0 h-0 bg-transparent"}
                    rounded-xl border-none transform duration-300 flex  m-auto justify-center items-center`}></div></div>  <span className="font-BanglaSubHeading">
                            {Language === "BN" && "সঠিক ক্যাটাগরি নির্বাচন করা হয়নি।"}
                        </span>{" "}
                        {Language === "EN" && "The correct category was not selected."}</div>



                </div>  <button id="RejectPictureButton" onClick={async () => {
                    const response = await pictureReject({ id: id, reason: CustomCancelReason }).unwrap();
                    if (response?.message === "Picture status updated to rejected") {
                        router.replace("/TeamMember/Pending?status=Pending&CurrentPage=1")
                    }
                }} className="flex items-center dark:bg-dark-primary-color    w-full bg-light-primary-color text-dark-primary-color rounded-xl mt-2 justify-center gap-x-2 z-50 dark:text-light-primary-color cursor-pointer  h-14 "
                >
                    {
                        PictureApproveLoading && <ImSpinner className="text-3xl animate-spin " />
                    }
                    {
                        !PictureApproveLoading && <><TiCancel className="text-2xl" />
                            <span className="">
                                <p className={`${Language === "BN" && "font-BanglaHeading"} text-lg`}>
                                    {Language === "BN" && "ছবি রিজেক্ট করুন"}
                                </p>
                                {Language === "EN" && <span className="font-Righteous text-xl">Reject Picture</span>}
                            </span></>}

                </button></section>
        </div>
    );
};

export default ApproveOrDecline;