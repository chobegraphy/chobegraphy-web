import Banner from "@/components/PageWise/ImgDetails/Banner";

const ImdDetailsPage = () => {
  return (
    <div className="grid grid-cols-10 sm:px-10 px-5 py-5 gap-x-5 h-full">
      <Banner />
      {/* suggestion */}
      <div className="col-span-4 bg-red-400">
        <h1>More </h1>
      </div>
    </div>
  );
};

export default ImdDetailsPage;
