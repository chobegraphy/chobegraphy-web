import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import { ZillaData } from "@/ExportedFunctions/ZillaData";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useGetPictureDataByEmailForProfileQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureDataByEmailForProfile/ApiSlice";
import { useUpdateUserDataMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/UpdateUserData/ApiSlice";

const AccountInfo = ({ setBannerPicture }: any) => {
    const Language = useSelector((state: any) => state.Language.value);
    const { user, setUser } = useAuth()
    const { theme } = useTheme()
    const { data: PictureDataByEmailForProfile } = useGetPictureDataByEmailForProfileQuery({ email: user?.email })
    const [UpdateUserData] = useUpdateUserDataMutation()
    const [Edit, setEdit] = useState(false)
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
    const [district1, setDistrict1] = useState<any>(null);
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
        if (user) {
            setProfileName(user?.name)
            setPhoneNumber(user?.phone)
            setDistrict1(user?.district)
            setDistrict(user?.district?.name)
            setPresentAddress(user?.presentAddress)
            setGmail(user?.gmail)
            setFacebook(user?.facebook)
            setWhatsapp(user?.whatsapp)
            setTelegram(user?.telegram)
            setAboutMe(user?.aboutMe)
            setTeamRole(user?.TeamRole)
        }
    }, [PictureDataByEmailForProfile, user, Edit])

    const handleUpdate = async () => {
        console.log(whatsapp)
        const updateResponse = await UpdateUserData({
            _id: user?._id, newData: {
                email: user?.email,
                picture: user?.picture,
                teamMember: user?.teamMember,
                name: profileName,
                phone: phoneNumber,
                district: district1,
                presentAddress: presentAddress,
                gmail: gmail,
                facebook: facebook,
                whatsapp: whatsapp,
                telegram: telegram,
                aboutMe: AboutMe,
                teamRole: TeamRole
            }
        }).unwrap()
        console.log(updateResponse);
        setUser(updateResponse?.updatedData)
        typeof window !== "undefined" && localStorage.setItem("userData", JSON.stringify(updateResponse?.updatedData))
        setEdit(false)
        toast.success(Language === "BN" ? "আপডেট সফল হয়েছে" : "Updated Successfully", { id: "updateSuccess" })
    }

    return (
        <div className="w-full">
            <section><div className="flex mt-4 items-center justify-between w-full">
                <div className="flex items-center gap-2 xl:text-lg">
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" && "অ্যাকাউন্ট তথ্য"}
                    </p>
                    <p>{Language === "EN" && "Account Info"} :</p></div>
                <div >
                    {!Edit && <button onClick={() => setEdit(!Edit)}
                        className={
                            " py-3 transform duration-300 dark:bg-dark-primary-color dark:hover:text-light-primary-color bg-light-primary-color  dark:text-light-primary-color  rounded-2xl px-6 mx-auto xl:text-lg  flex items-center font-Righteous gap-x-2 text-dark-primary-color justify-center "
                        }
                    >
                        <span>
                            <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                                {Language === "BN" ? "এডিট করুন" : "Edit"}
                            </p>
                        </span>

                    </button>}
                </div></div>

            </section>
            {/* current profile data */}
            {!Edit && <section><h1 className="flex  items-center gap-x-1 font-Space">

                <p className="">
                    {" "}
                    <span className="font-BanglaHeading">
                        {Language === "BN" && "নাম"}{" "}
                    </span>{" "}
                    {Language === "EN" && "Name"} :<br /> {user?.name}
                </p>
            </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className="">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "ইমেইল"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Email"} :<br /> {user?.email}
                    </p>
                </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "ফোন"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Phone"} :<br /> {user?.phone ? Language === "BN" ? convertToBanglaNum(user?.phone) : user?.phone : Language === "BN" ? "তথ্য প্রদান করা হয়নি" : "Not Provided"}
                    </p>
                </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "জেলা"}{" "} : <br />
                        </span>{" "}
                        {user?.district ? Language === "BN" ? user?.district.bn_name : user?.district?.name : Language === "BN" ? "তথ্য প্রদান করা হয়নি" : "Not Provided"}
                    </p>
                </h1>
                <h1 className="flex mt-2 items-center gap-x-1 font-Space">

                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "বর্তমান ঠিকানা"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Present Address"} :<br /> {user?.presentAddress ? user?.presentAddress : Language === "BN" ? "তথ্য প্রদান করা হয়নি" : "Not Provided"}
                    </p>
                </h1></section>}

            {/* edit profile data */}
            {Edit && <section>
                <div className="font-Space relative mt-2 max-md:text-base ">
                    <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "নাম (সর্বোচ্চ ২৭ অক্ষর)"}
                        </span>{" "}
                        {Language === "EN" && "Name (max. 27 characters)"} :{" "}
                    </p>
                    <input defaultValue={profileName} type="text" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                        switch (true) {
                            case e.target.value.length <= 27:
                                setProfileName(e.target.value);
                                break;
                            case e.target.value.length > 27:
                                toast.error(Language === "BN" ? "সর্বোচ্চ ২৭ অক্ষর পর্যন্ত লিখতে পারবেন" : "You can write up to 27 characters", { id: "maxCharForName" });
                                break;
                        }

                    }
                    } onPaste={(e) => setProfileName(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
                </div>
                <div className="font-Space relative mt-5 max-md:text-base ">
                    <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "ফোন (সর্বোচ্চ ১১ অক্ষর)"}
                        </span>{" "}
                        {Language === "EN" && "Phone (max. 11 characters)"} :{" "}
                    </p>
                    <input defaultValue={phoneNumber} type="text" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                        switch (true) {
                            case e.target.value.length <= 14:
                                setPhoneNumber(e.target.value);
                                break;
                            case e.target.value.length > 14:
                                toast.error(Language === "BN" ? "সর্বোচ্চ ১৪ অক্ষর পর্যন্ত লিখতে পারবেন" : "You can write up to 14 characters", { id: "maxCharForPhone" });
                                break;
                        }

                    }
                    } onPaste={(e) => setPhoneNumber(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
                </div>
                <h1
                    onBlur={() => {

                        setShowDropdown(false);
                    }}
                    className="flex mt-6 relative flex-col items-start gap-x-1 transform  duration-300 font-Space">
                    <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "জেলা সিলেক্ট করুন"}
                        </span>{" "}
                        {Language === "EN" && "Select District"} :{" "}
                    </p> <input style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} id="district" value={district !== "" ? district : ""}
                        onChange={handleDistrictChange}
                        onFocus={() => {
                            if (!zillaDatas.some((z: any) => z.name.toLowerCase() === district.toLowerCase())) {
                                setShowDropdown(true);
                            }
                        }}

                        className={`${showDropdown && filteredZilla.length > 0 ? "border rounded-xl   rounded-b-none" : "border rounded-xl "} border dark:border-light-secondary-color border-light-secondary-color  outline-none  bg-transparent w-full px-3 py-3 pt-4`} />
                    <ul style={{ borderTop: "none", border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className={`${showDropdown && filteredZilla.length > 0 ? "border  rounded-xl  rounded-t-none border-t-0 h-full opacity-100 z-10" : " rounded-xl h-0 opacity-0 -z-20"}  border   rounded-xl transform duration-300 max-h-52 w-full border-light-secondary-color  overflow-y-scroll example`}>
                        {filteredZilla.map((zilla: any) => (
                            <li
                                key={zilla.id}
                                onClick={() => {
                                    setDistrict1(zilla);
                                    handleSelectDistrict(zilla.name)
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-light-primary-color dark:hover:bg-dark-primary-color
                    hover:text-dark-primary-color dark:hover:text-light-primary-color"
                            >
                                {zilla.name} / <span className="font-BanglaSubHeading">{zilla.bn_name}</span>
                            </li>
                        ))}
                    </ul>
                    <ul>{filteredZilla.length === 0 && (
                        <li className="px-3 py-2 cursor-pointer">

                            No district found
                        </li>)}</ul>
                </h1>
                <div className="font-Space relative mt-4 max-md:text-base ">
                    <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                        <span className="font-BanglaSubHeading">
                            {Language === "BN" && "বর্তমান ঠিকানা"}
                        </span>{" "}
                        {Language === "EN" && "Present Address"} :{" "}
                    </p>
                    <input value={presentAddress} type="text" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                        setPresentAddress(e.target.value);
                    }
                    } onPaste={(e) => setPresentAddress(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
                </div>
            </section>}

            {/* how much picture uploaded or downloaded info */}

            {!Edit && <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
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

            </section>}
            {/* current social media link */}
            {!Edit && user?.gmail && user?.facebook && user?.whatsapp && user?.telegram && <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className="flex items-center gap-x-1 font-Space">

                    <div className="">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "সোশ্যাল মিডিয়া লিঙ্ক"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Social Media Link"} :<br />
                        <div className="flex items-center text-2xl gap-x-3 my-1.5">
                            <Link href={`mailto:${user?.gmail}`} target="_blank" rel="noopener noreferrer"><SiGmail /></Link>
                            <Link href={`${user?.facebook}`} target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
                            <Link href={`https://wa.me/${user?.whatsapp}`} target="_blank" rel="noopener noreferrer"> <RiWhatsappFill /></Link>
                            <Link href={`${user?.telegram}`} target="_blank" rel="noopener noreferrer"> <FaTelegramPlane /></Link>


                        </div>

                    </div>
                </h1></section>}
            {Edit && <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className="flex items-center gap-x-1 font-Space">

                    <div className="w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "সোশ্যাল মিডিয়া লিঙ্ক"}{" "}
                        </span>{" "}
                        {Language === "EN" && "Social Media Link"} :<br />
                        <div className="  w-full gap-x-3 my-4">
                            <div className="font-Space relative mt-2 max-md:text-base w-full">
                                <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                                    <span className="font-BanglaSubHeading">
                                        {Language === "BN" && "জিমেইল"}
                                    </span>{" "}
                                    {Language === "EN" && "gmail"} :{" "}
                                </p>
                                <input value={gmail} type="text" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                                    setGmail(e.target.value);

                                }
                                } onPaste={(e) => setGmail(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
                            </div>
                            <div className="font-Space relative mt-5 max-md:text-base w-full">
                                <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                                    <span className="font-BanglaSubHeading">
                                        {Language === "BN" && "ফেসবুক লিঙ্ক"}
                                    </span>{" "}
                                    {Language === "EN" && "Facebook Link"} :{" "}
                                </p>
                                <input value={facebook} type="text" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                                    setFacebook(e.target.value);

                                }
                                } onPaste={(e) => setFacebook(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
                            </div>
                            <div className="font-Space relative mt-5 max-md:text-base w-full">
                                <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                                    <span className="font-BanglaSubHeading">
                                        {Language === "BN" && "ওয়াট্সএপ নাম্বার"}
                                    </span>{" "}
                                    {Language === "EN" && "WhatsApp Number"} :{" "}
                                </p>
                                <input
                                    defaultValue={whatsapp}
                                    type="text"
                                    style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }}
                                    onChange={(e) => {
                                        switch (true) {
                                            case e.target.value.length <= 14:
                                                setWhatsapp(e.target.value);
                                                break;

                                            case e.target.value.length > 14:
                                                toast.error(Language === "BN" ? "সর্বোচ্চ ১৪ অক্ষর পর্যন্ত লিখতে পারবেন" : "You can write up to 14 characters", { id: "maxCharForName" });
                                                break;
                                        }
                                    }}
                                    onPaste={(e) => setWhatsapp(e.clipboardData.getData('text'))}
                                    className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `}
                                />
                            </div>
                            <div className="font-Space relative mt-5 max-md:text-base w-full">
                                <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                                    <span className="font-BanglaSubHeading">
                                        {Language === "BN" && "টেলিগ্রাম লিঙ্ক"}
                                    </span>{" "}
                                    {Language === "EN" && "Telegram Link"} :{" "}
                                </p>
                                <input value={telegram} type="text" style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                                    setTelegram(e.target.value);

                                }
                                } onPaste={(e) => setTelegram(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
                            </div>
                        </div>
                    </div>
                </h1></section>}

            {!Edit && <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className=" gap-x-1 font-Space w-full">

                    <p className=" w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "আমার সম্পর্কে"}{" "}{Language === "EN" && "About Me"} :
                        </span>{" "}

                    </p>

                    <div className="flex items-center mt-2" > <span className="font-BanglaSubHeading flex items-center ">
                        {AboutMe}
                    </span></div>
                </h1></section>}
            {!Edit && <section><div className="w-[100%] my-3 h-[1px] bg-light-secondary-color"></div>
                <h1 className=" gap-x-1 font-Space w-full">

                    <p className=" w-full">
                        {" "}
                        <span className="font-BanglaHeading">
                            {Language === "BN" && "ছবিগ্রাফি টিম রোল"}{" "}{Language === "EN" && "Chobegraphy Team Role"} :
                        </span>{" "}

                    </p>

                    <div className="flex items-center mt-2" > <span className="font-BanglaSubHeading flex items-center ">
                        {user?.teamRole}
                    </span></div>
                </h1></section>}
            {Edit && <div className="font-Space relative mt-4 max-md:text-base ">
                <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                    <span className="font-BanglaSubHeading">
                        {Language === "BN" && "আমার সম্পর্কে"}
                    </span>{" "}
                    {Language === "EN" && "About Me"} :{" "}
                </p>
                <textarea value={AboutMe} style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                    setAboutMe(e.target.value);
                }
                } onPaste={(e) => setAboutMe(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
            </div>}
            {Edit && user?.teamMember === true && <div className="font-Space relative mt-4 max-md:text-base ">
                <p style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} className="flex absolute scale-90 -top-5 left-3 bg-dark-primary-color dark:bg-light-primary-color mt-2 mb-1 gap-x-0.5 px-2 rounded-xl items-center">
                    <span className="font-BanglaSubHeading">
                        {Language === "BN" && "টীম রোল"}
                    </span>{" "}
                    {Language === "EN" && "Team Role"} :{" "}
                </p>
                <textarea defaultValue={user?.teamRole} style={{ border: `2px solid ${theme === "dark" ? "#575757" : "#000"}` }} onChange={(e) => {
                    setTeamRole(e.target.value);
                }
                } onPaste={(e) => setTeamRole(e.clipboardData.getData('text'))} className={`p-5 rounded-xl  w-full outline-none bg-transparent border  border-light-secondary-color `} />
            </div>}
            {Edit && <div className="flex gap-x-2 justify-end w-fit ms-auto"> <button onClick={() => setEdit(!Edit)}
                className={
                    " py-3 transform duration-300 dark:bg-dark-primary-color dark:hover:text-light-primary-color bg-light-primary-color  dark:text-light-primary-color  rounded-2xl px-6 mx-auto xl:text-lg  flex items-center font-Righteous gap-x-2 text-dark-primary-color justify-center "
                }
            >
                <span>
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" ? "কেন্সেল করুন" : "Cancel"}
                    </p>
                </span>

            </button> <button onClick={() => handleUpdate()}
                className={
                    " py-3 transform duration-300 dark:bg-dark-primary-color dark:hover:text-light-primary-color bg-light-primary-color  dark:text-light-primary-color  rounded-2xl px-6 mx-auto xl:text-lg  flex items-center font-Righteous gap-x-2 text-dark-primary-color justify-center "
                }
            >
                    <span>
                        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                            {Language === "BN" ? "আপডেট করুন" : "Update"}
                        </p>
                    </span>

                </button></div>}
        </div>
    );
};

export default AccountInfo;