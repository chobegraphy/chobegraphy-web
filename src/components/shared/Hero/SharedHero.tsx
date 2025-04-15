import img1 from "../../../Assets/BannerImg/1.webp";
import img2 from "../../../Assets/BannerImg/2.webp";
import img3 from "../../../Assets/BannerImg/3.webp";
import img4 from "../../../Assets/BannerImg/4.webp";
import img5 from "../../../Assets/BannerImg/5.webp";
import img6 from "../../../Assets/BannerImg/6.webp";
import img7 from "../../../Assets/BannerImg/7.webp";
import img8 from "../../../Assets/BannerImg/8.webp";
import img9 from "../../../Assets/BannerImg/9.webp";
const SharedHero = () => {


    return (
        <div className="w-full h-full  flex justify-center max-md:mt-5 max-md:mb-20 max-md:ms-0 ms-5 items-center relative">

            <div className="w-[450px] h-[450px] grid-cols-3 max-md:w-[290px] max-md:h-[290px] rotate-45 scale-90 gap-3 grid grid-rows-3">
                <div

                    className="dark:border-2 border-opacity-25 rounded-3xl overflow-hidden  border-light-secondary-color rounded-br-none w-full h-full"
                >
                    <div className="object-cover object-center  w-full h-full scale-150 -rotate-45"><img src={img1.src} alt="" /></div>
                </div>

                <div

                    className="dark:border-2 border-opacity-25 w-full h-full rounded-3xl rounded-bl-none  border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative top-0 w-[115%] h-[130%] scale-125 -rotate-45"><img src={img2.src} alt="" /></div></div>

                <div

                    className="dark:border-2 border-opacity-25 rounded-full w-full h-full  border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative top-0 w-[115%] h-[130%] scale-125 left-3 -rotate-45"><img src={img3.src} alt="" /></div></div>

                <div

                    className="dark:border-2 border-opacity-25 rounded-3xl  border-light-secondary-color rounded-tr-none w-full overflow-hidden h-full"
                ><div className="object-cover object-center relative -top-5 w-[160%] h-[160%] scale-125 -rotate-45"><img src={img4.src} alt="" /></div></div>

                <div

                    className="dark:border-2 border-opacity-25 rounded-b-full overflow-hidden rounded-tr-full w-full h-full  border-light-secondary-color"
                ><div className="object-cover object-center relative  w-[115%] -top-5 -left-2 h-[115%] scale-125 -rotate-45"><img src={img8.src} alt="" /></div></div>

                <div

                    className="dark:border-2 border-opacity-25 rounded-t-full overflow-hidden rounded-br-full w-full h-full  border-light-secondary-color"
                ><div className="object-cover object-center relative -top-3 -left-3 w-[115%] h-[115%] scale-125 -rotate-45"><img src={img6.src} alt="" /></div></div>

                <div
                    className="dark:border-2 border-opacity-25 rounded-full overflow-hidden w-full h-full  border-light-secondary-color"
                ><div className="object-cover object-center relative w-[115%] h-[115%] scale-125 -rotate-45"><img src={img7.src} alt="" /></div></div>

                <div
                    className="dark:border-2 border-opacity-25 rounded-b-full rounded-tl-full w-full h-full  border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative -top-5 w-[115%] h-[115%] scale-125 -rotate-45"><img src={img5.src} alt="" /></div></div>

                <div

                    className="dark:border-2 border-opacity-25 w-full h-full rounded-b-full rounded-tr-full  border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center -top-3 -left-3 relative   w-[132%] max-lg:scale-150 h-[132%] max-lg:top-0 max-lg:left-0 scale-125 -rotate-45"><img src={img9.src} alt="" /></div></div>
            </div>
        </div>
    );
};

export default SharedHero;