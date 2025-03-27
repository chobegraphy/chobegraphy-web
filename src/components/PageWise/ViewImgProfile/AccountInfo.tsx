import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import { ZillaData } from "@/ExportedFunctions/ZillaData";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook, FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { useSelector } from "react-redux";
import { useGetPictureDataByEmailForProfileQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureDataByEmailForProfile/ApiSlice";
import { useGetSingleUserDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetSingleUser/ApiSlice";

const AccountInfo = ({ setBannerPicture }: any) => {
    const Language = useSelector((state: any) => state.Language.value);
    const params = useSearchParams();

    const authorEmail = params.get("AuthorMail");
    const { data: SingleUserData } = useGetSingleUserDataQuery({ email: authorEmail })
    const { theme } = useTheme()
    const { data: PictureDataByEmailForProfile } = useGetPictureDataByEmailForProfileQuery({ email: authorEmail })
    const [Edit, setEdit] = useState(false)
    const [authorData, setAuthorData] = useState<any>(null)
    interface ProfileData {
        totalUploaded: number;
        totalApproved: number;
        totalDownloads: number;
        totalViews: number;
    }
    const [PictureDataByEmailForProfile1, setPictureDataByEmailForProfile] = useState<ProfileData | null>(null)
    const [profileName, setProfileName] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const zillaDatas = (ZillaData);
    const [filteredZilla, setFilteredZilla] = useState(zillaDatas);

    const [showDropdown, setShowDropdown] = useState(false);
    const [district, setDistrict] = useState("");
    const [presentAddress, setPresentAddress] = useState<string>("")
    const [gmail, setGmail] = useState<string>("")
    const [facebook, setFacebook] = useState<string>("")
    const [whatsapp, setWhatsapp] = useState<string>("")
    const [telegram, setTelegram] = useState<string>("")
    const [AboutMe, setAboutMe] = useState<string>("")
    const [TeamRole, setTeamRole] = useState<string>("")
    const handleDistrictChange = (e: any) => {

        const value = e.target.value;
        setDistrict(value);
        const matchedZillas = zillaDatas.filter(
            (z: any) =>
                z.name.toLowerCase().includes(value.toLowerCase()) ||
                z.bn_name.includes(value)
        );
        setFilteredZilla(matchedZillas);
        setShowDropdown(matchedZillas.length > 1 || (matchedZillas.length === 1 && matchedZillas[0].name.toLowerCase() !== value.toLowerCase()));

    };

    const handleSelectDistrict = (selectedDistrict: any) => {
        setDistrict(selectedDistrict);

        setShowDropdown(false);
    };
    useEffect(() => {
        console.log(whatsapp)
        if (PictureDataByEmailForProfile) {
            setPictureDataByEmailForProfile(PictureDataByEmailForProfile)
            setBannerPicture(PictureDataByEmailForProfile?.data[0])
        }
        if (authorEmail) {

            setAuthorData(SingleUserData)
        }
    }, [PictureDataByEmailForProfile, authorEmail, SingleUserData])


    return (
        <div className="w-full">
            <section><div className="flex mt-4 items-center justify-between w-full">
                <div className="flex items-center gap-2 xl:text-lg">
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" && "অ্যাকাউন্ট তথ্য"}
                    </p>
                    <p>{Language === "EN" && "Account Info"} :</p></div>
            </div>

            </section>
            {/* current profile data */}
            <section><h1 className="flex items-center gap-x-1 font-Space">

                <p className="">
                    {" "}
                    <span className="font-BanglaHeading">
                        {Language === "BN" && "নাম"}{" "}
                    </span>{" "}
                    {Language === "EN" && "Name"} :<br /> {authorData?.name}
                </p>
            </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className="">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "ইমেইল"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Email"} :<br /> {authorData?.email}
                    </p>
                </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "ফোন"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Phone"} :<br /> {authorData?.phone ? Language === "BN" ? convertToBanglaNum(authorData?.phone) : authorData?.phone : Language === "BN" ? "তথ্য প্রদান করা হয়নি" : "Not Provided"}
                    </p>
                </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "জেলা"}{" "} : <br />
                        </span>{" "}
                        {authorData?.district ? Language === "BN" ? authorData?.district.bn_name : authorData?.district?.name : Language === "BN" ? "তথ্য প্রদান করা হয়নি" : "Not Provided"}
                    </p>
                </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "বর্তমান ঠিকানা"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Present Address"} :<br /> {authorData?.presentAddress ? authorData?.presentAddress : Language === "BN" ? "তথ্য প্রদান করা হয়নি" : "Not Provided"}
                    </p>
                </h1></section>


            {/* how much picture uploaded or downloaded info */}

            <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className="flex items-center gap-x-1 font-Space w-full">

                    <p className="flex items-center justify-between w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "মোট ছবি আপলোড"}{" "}{Language === "EN" && "Total Picture Upload"} :
                        </span>{" "}

                    </p>
                    <div className="flex items-center" > <span className="font-BanglaSubHeading flex items-center text-nowrap">
                        {Language === "BN" && convertToBanglaNum(PictureDataByEmailForProfile1?.totalUploaded + " " + "টি") || PictureDataByEmailForProfile1?.totalUploaded + " " + "Pictures"}
                    </span></div>
                </h1>
                <h1 className="flex items-center gap-x-1 font-Space w-full">

                    <p className="flex items-center justify-between w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "মোট ছবি অ্যাপ্রুভড"}{" "}{Language === "EN" && "Total Approved"} :
                        </span>{" "}

                    </p>
                    <div className="flex items-center" > <span className="font-BanglaSubHeading flex items-center text-nowrap">
                        {Language === "BN" && convertToBanglaNum(PictureDataByEmailForProfile1?.totalApproved + " " + "টি") || PictureDataByEmailForProfile1?.totalApproved + " " + "Pictures"}
                    </span></div>
                </h1>
                <h1 className="flex items-center gap-x-1 font-Space w-full">

                    <p className="flex items-center justify-between w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "মোট ছবি ডাউনলোড"}{" "}{Language === "EN" && "Total Downloaded"} :
                        </span>{" "}

                    </p>
                    <div className="flex items-center" > <span className="font-BanglaSubHeading flex items-center text-nowrap">
                        {Language === "BN" && convertToBanglaNum(PictureDataByEmailForProfile1?.totalDownloads + " " + "টি") || PictureDataByEmailForProfile1?.totalDownloads + " " + "Pictures"}
                    </span></div>
                </h1>
                <h1 className="flex items-center gap-x-1 font-Space w-full">

                    <p className="flex items-center justify-between w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "মোট ছবি ভিউ"}{" "}{Language === "EN" && "Total Viewed"} :
                        </span>{" "}

                    </p>
                    <div className="flex items-center" > <span className="font-BanglaSubHeading flex items-center text-nowrap">
                        {Language === "BN" && convertToBanglaNum(PictureDataByEmailForProfile1?.totalViews + " " + "টি") || PictureDataByEmailForProfile1?.totalViews + " " + "Pictures"}
                    </span></div>
                </h1>

            </section>
            {/* current social media link */}
            {authorData?.gmail && authorData?.facebook && authorData?.whatsapp && authorData?.telegram && <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className="flex items-center gap-x-1 font-Space">

                    <div className="">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "সোশ্যাল মিডিয়া লিঙ্ক"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Social Media Link"} :<br />
                        <div className="flex items-center text-2xl gap-x-3 my-1.5">
                            <Link href={`mailto:${authorData?.gmail}`} target="_blank" rel="noopener noreferrer"><SiGmail /></Link>
                            <Link href={`${authorData?.facebook}`} target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
                            <Link href={`https://wa.me/${authorData?.whatsapp}`} target="_blank" rel="noopener noreferrer"> <RiWhatsappFill /></Link>
                            <Link href={`${authorData?.telegram}`} target="_blank" rel="noopener noreferrer"> <FaTelegramPlane /></Link>


                        </div>

                    </div>
                </h1></section>}


            <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className=" gap-x-1 font-Space w-full">

                    <p className=" w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "আমার সম্পর্কে"}{" "}{Language === "EN" && "About Me"} :
                        </span>{" "}

                    </p>

                    <div className="flex items-center mt-2" > <span className="font-BanglaSubHeading flex items-center ">
                        {authorData?.aboutMe}
                    </span></div>
                </h1></section>
            <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className=" gap-x-1 font-Space w-full">

                    <p className=" w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "ছবিগ্রাফি টিম রোল"}{" "}{Language === "EN" && "Chobegraphy Team Role"} :
                        </span>{" "}

                    </p>

                    <div className="flex items-center mt-2" > <span className="font-BanglaSubHeading flex items-center ">
                        {authorData?.teamRole}
                    </span></div>
                </h1></section>


        </div>
    );
};

export default AccountInfo;