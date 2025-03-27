import ImgCardHero from "@/components/PageWise/Home/ImgCardHero";
import { useGetPictureDataQuery } from "../../../../Redux/Features/Apis/DataRelated/Apis/GetPictureData/ApiSlice";

const SharedHero = () => {
    const { data, error, isLoading } = useGetPictureDataQuery({
        filter: "popular",
        page: 1,
        limit: 9,
    })


    return (
        <div className="w-full h-full  flex justify-center max-md:mt-5 max-md:mb-20 max-md:ms-0 ms-5 items-center relative">

            <div className="w-[450px] h-[450px] grid-cols-3 max-md:w-[290px] max-md:h-[290px] rotate-45 scale-90 gap-3 grid grid-rows-3">
                <div

                    className="bg-red-100 rounded-3xl overflow-hidden border-2 border-light-secondary-color rounded-br-none w-full h-full"
                >
                    <div className="object-cover object-center w-full h-full scale-150 -rotate-45"><ImgCardHero imgData={data?.data[0]} i={0} /></div>
                </div>

                <div

                    className="bg-red-200 w-full h-full rounded-3xl rounded-bl-none border-2 border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[1]} i={0} /></div></div>

                <div

                    className="bg-red-300 rounded-full w-full h-full border-2 border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[2]} i={0} /></div></div>

                <div

                    className="bg-red-400 rounded-3xl border-2 border-light-secondary-color rounded-tr-none w-full overflow-hidden h-full"
                ><div className="object-cover object-center relative top-5 w-[160%] h-[160%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[3]} i={0} /></div></div>

                <div

                    className="bg-red-600 rounded-b-full overflow-hidden rounded-tr-full w-full h-full border-2 border-light-secondary-color"
                ><div className="object-cover object-center relative  w-[160%] h-[160%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[4]} i={0} /></div></div>

                <div

                    className="bg-red-700 rounded-t-full overflow-hidden rounded-br-full w-full h-full border-2 border-light-secondary-color"
                ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[5]} i={0} /></div></div>

                <div
                    className="bg-red-800 rounded-full overflow-hidden w-full h-full border-2 border-light-secondary-color"
                ><div className="object-cover object-center relative w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[6]} i={0} /></div></div>

                <div
                    className="bg-red-900 rounded-b-full rounded-tl-full w-full h-full border-2 border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative top-5 w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[7]} i={0} /></div></div>

                <div

                    className="bg-pink-800 w-full h-full rounded-b-full rounded-tr-full border-2 border-light-secondary-color overflow-hidden"
                ><div className="object-cover object-center relative   w-[130%] h-[130%] scale-150 -rotate-45"><ImgCardHero imgData={data?.data[8]} i={0} /></div></div>
            </div>
        </div>
    );
};

export default SharedHero;