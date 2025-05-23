import { convertToBanglaNum } from "@/ExportedFunctions/ConvertToBanglaNum";
import { useTheme } from "next-themes";
import { CgEditExposure } from "react-icons/cg";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { LuAperture } from "react-icons/lu";
import { MdIso, MdOutlineSubject } from "react-icons/md";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { SiBmcsoftware, SiProtools } from "react-icons/si";
import { TbCamera, TbFocusCentered } from "react-icons/tb";
import { useSelector } from "react-redux";
const PhotoMetaData = ({ MetaData, colors }: any) => {
  const { theme } = useTheme()
  const formatDateTime = (dateString: string) => {
    // Extract year, month, day, hour, minute, second
    const parts = dateString.match(
      /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
    );

    if (!parts) return "Invalid Date"; // Ensure the format is correct

    const [, year, month, day, hour, minute, second] = parts.map(Number);

    // Create a valid Date object
    const date = new Date(year, month - 1, day, hour, minute, second);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // hour12: true,
    });
  };

  // redux writing
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <div className="w-full col-span-4">
      <section>
        <h1 style={{ border: `2px solid ${colors?.length > 0 ? colors[1]?.hex : theme === "dark" ? "#575757" : "#000"}` }} className=" rounded-2xl  text-light-primary-color font-Space px-2 dark:text-dark-primary-color w-fit mt-3">
          <span className="font-BanglaHeading">
            {Language === "BN" && "ছবির মেটাডেটা"}
          </span>
          {Language === "EN" && "Picture Metadata"}
        </h1>
      </section>

      <section className="lg:px-2 text-light-primary-color dark:text-dark-primary-color mt-1">
        {MetaData?.software !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <SiBmcsoftware className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ব্যবহৃত সফটওয়্যার :"}
                </span>
                {Language === "EN" && "Software Used:"} {MetaData?.software}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.creatorTool !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <SiProtools className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ব্যবহৃত টুল :"}
                </span>
                {Language === "EN" && "Tool Used :"} {MetaData?.creatorTool}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.flash !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <RiLightbulbFlashLine className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ফ্ল্যাশ :"}
                </span>
                {Language === "EN" && "Flash :"} {MetaData?.flash}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.aperture !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <LuAperture className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "অ্যাপারচার :"}
                </span>
                <span className="font-BanglaSubHeading">{" "}
                  {Language === "BN" && convertToBanglaNum(MetaData?.aperture)}
                </span>
                {Language === "EN" && "Aperture :"} {Language === "EN" && MetaData?.aperture}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.exposureTime !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <CgEditExposure className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "এক্সপোযার :"}
                </span>
                <span className="font-BanglaSubHeading">{" "}
                  {Language === "BN" && convertToBanglaNum(MetaData?.exposureTime)}
                </span>
                {Language === "EN" && "Aperture :"} {Language === "EN" && MetaData?.exposureTime}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.focalLength !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <TbFocusCentered className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ফোকাস :"}
                </span>
                {Language === "EN" && "Focus :"}
                <span className="font-BanglaSubHeading">{" "}
                  {Language === "BN" && convertToBanglaNum(MetaData?.focalLength)}
                </span>
                {Language === "EN" && "Aperture :"} {Language === "EN" && MetaData?.focalLength}

              </p>
            </h1>
          </div>
        )}
        {MetaData?.iso !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <MdIso className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "আইএসও :"}
                </span>
                {Language === "EN" && "ISO :"}
                <span className="font-BanglaSubHeading">{" "}
                  {Language === "BN" && convertToBanglaNum(MetaData?.iso)}
                </span>
                {Language === "EN" && "Aperture :"} {Language === "EN" && MetaData?.iso}

              </p>
            </h1>
          </div>
        )}
        {MetaData?.subjectDistance !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <MdOutlineSubject className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "সাবজেক্ট দূরত্ব :"}
                </span>
                {Language === "EN" && "Subject Distance :"}{" "}

                <span className="font-BanglaSubHeading">{" "}
                  {Language === "BN" && convertToBanglaNum(MetaData?.subjectDistance)}
                </span>
                {Language === "EN" && "Aperture :"} {Language === "EN" && MetaData?.subjectDistance}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.model !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <TbCamera className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "মডেল :"}
                </span>
                {Language === "EN" && "Model :"} {MetaData?.model}
              </p>
            </h1>
          </div>
        )}
        {MetaData?.datetimeOriginal !== "" && (
          <div className="flex flex-col gap-y-1">
            <h1 className="flex items-center gap-x-1 font-Space">
              <HiOutlineCalendarDateRange className="text-xl" />

              <p>
                <span className="font-BanglaSubHeading">
                  {Language === "BN" && "ক্যাপচারের তারিখ :"}
                </span>
                {Language === "EN" && "Capture Date :"}{" "}
                <span className="font-BanglaSubHeading">{" "}
                  {Language === "BN" && convertToBanglaNum(formatDateTime(MetaData?.datetimeOriginal))}
                </span>
                {Language === "EN" && "Aperture :"} {Language === "EN" && formatDateTime(MetaData?.datetimeOriginal)}

              </p>
            </h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default PhotoMetaData;
