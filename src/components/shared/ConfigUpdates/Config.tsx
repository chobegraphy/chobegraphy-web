import ImageGallery from "./Gallery";

const Config = () => {
  return (
    <>
      {/*-> Rahat code */}
      <section className="mt-10" id="config">
        <h1 className="text-6xl hidden max-sm:block mt-10 max-sm:w-fit relative strokeText font-Bayon">
          Updates :
          <span className="text-light-primary-color absolute right-5 bottom-1 dark:text-dark-primary-color max-sm:block strokeText2 hidden text-[40px]">
            Config
          </span>
        </h1>
        <div className="justify-between max-sm:hidden mt-10 flex">
          <h1 className="text-3xl flex items-center justify-center gap-x-1 text-center">
            Config &gt;
          </h1>
          <h1 className="text-3xl flex items-center justify-center hoverStroke gap-x-1 text-center">
            View All
          </h1>
        </div>
      </section>
      <ImageGallery />
      <h1 className="text-xl max-sm:flex items-center justify-center font-Space my-5 hidden hoverStroke gap-x-1 text-center">
        View All &gt;
      </h1>
    </>
  );
};

export default Config;
