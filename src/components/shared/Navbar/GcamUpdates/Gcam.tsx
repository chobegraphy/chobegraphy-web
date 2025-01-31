import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel/Carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import UpdatesCardCamera from "./UpdatesCard";
const Gcam = () => {
  const CardsCount = [1, 2, 3, 4, 5, 6, 7, 8];
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(CardsCount.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div>
      {/*-> Rahat code */}
      <h1 className="text-6xl max-sm:w-fit relative strokeText font-Bayon">
        Updates :
        <span className="text-light-primary-color absolute right-5  dark:text-dark-primary-color bottom-1 max-sm:block hidden strokeText2 text-[40px]">
          Camera
        </span>
      </h1>
      <section id="updates">
        <div className="justify-between mt-5 flex">
          <h1 className="text-3xl max-sm:hidden flex items-center justify-center gap-x-1 text-center">
            Google Camera &gt;
          </h1>
          <h1 className="text-3xl flex items-center justify-center max-sm:hidden hoverStroke gap-x-1 text-center">
            View All
          </h1>
        </div>
        <div className="grid max-md:grid-cols-1  max-lg:grid-cols-3 max-sm:hidden max-xl:grid-cols-4 gap-2 mt-7 grid-cols-5">
          {CardsCount.map((item, index) => (
            <UpdatesCardCamera key={index} />
          ))}
        </div>
        <div className="px-10 mt-5 hidden max-md:block relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
              }),
            ]}
            setApi={setApi}
          >
            <CarouselContent>
              {CardsCount.map((item, index) => (
                <CarouselItem key={index}>
                  <UpdatesCardCamera key={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground h-[50px] flex   justify-between mt-1 items-center   w-full ">
            <div className="flex items-center gap-px">
              {CardsCount.map((item, index) => (
                <div
                  className={`bg-light-primary-color dark:bg-dark-primary-color ${
                    index === current - 1 ? "w-6 h-6" : "w-3 h-3"
                  }  rounded-full transform duration-500`}
                  key={index}
                ></div>
              ))}
            </div>
            <h1 className="text-xl flex items-center justify-center font-Space hoverStroke gap-x-1 text-center">
              View All &gt;
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gcam;
