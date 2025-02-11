import Banner from "@/components/PageWise/ImgDetails/Banner";
import RelatedImages from "@/components/PageWise/ImgDetails/RelatedImages";

const ImdDetailsPage = () => {
  return (
    <div className="grid lg:grid-cols-10 sm:px-10 px-5 py-5 max-lg:grid-cols-1 gap-5 h-full">
      <Banner />
      {/* suggestion */}
      <div className="col-span-4 w-full max-lg:col-span-6 ">
        <RelatedImages />
      </div>
    </div>
  );
};

export default ImdDetailsPage;
