import { useSelector } from "react-redux";

const Title = () => {
  const Language = useSelector((state: any) => state.Language.value);
  return (
    <>
      <h1
        id="title"
        className="font-Righteous text-4xl max-xl:text-3xl text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
          {Language === "BN" && "পেন্ডিং আপলোড করা ছবি"}
        </p>
        <p>{Language === "EN" && "My Uploads"}</p>
      </h1>
      <h1
        id="title2"
        className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-5/6 text-center text-light-primary-color dark:text-dark-primary-color"
      >
        <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
          {Language === "BN" &&
            "আপলোড করা ছবি ⏳ যদি 'Pending' থাকে,তাহলে রিভিও করে ছবির 'Status' আপডেট করুন ✅📸"}
        </p>
        <p>
          {Language === "EN" &&
            "Uploaded photos ⏳ If 'Pending', wait; if 'Rejected', try again; and if 'Approved', visible to everyone! ✅📸"}
        </p>
      </h1>
    </>
  );
};

export default Title;
