import { useSelector } from "react-redux";

const Team = () => {
    const Language = useSelector((state: any) => state.Language.value);

    return (
        <div className="mt-10 px-32 relative">
            <section>
                <h1
                    id="title"
                    className="font-Righteous text-4xl max-xl:text-3xl text-center text-light-primary-color dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaHeading"}`}>
                        {Language === "BN" && "আমাদের বিশ্বস্ত টিম মেম্বাররা"}
                    </p>
                    <p>{Language === "EN" && "Meet Our Dedicated Team Members"}</p>
                </h1>
                <h1
                    id="title2"
                    className="font-Space mt-1 text-xl mx-auto max-lg:text-base w-5/6 text-center text-light-primary-color dark:text-dark-primary-color"
                >
                    <p className={`${Language === "BN" && "font-BanglaSubHeading"}`}>
                        {Language === "BN" &&
                            "যারা পরিশ্রম ও প্রতিশ্রুতির সাথে আমাদের পথচলায় সঙ্গী"}
                    </p>
                    <p>
                        {Language === "EN" &&
                            "The Dedicated Minds Behind Our Journey"}
                    </p>
                </h1>
            </section>
            <section className="columns-5 h-[400px] gap-4 mt-20">
                <div className="w-full rounded-2xl relative -top-10 h-[300px] bg-red-400"></div>
                <div className="w-full rounded-2xl relative top-5 h-[300px]   bg-red-400"></div>
                <div className="w-full  rounded-2xl relative -top-10 h-[300px] bg-red-400"></div>
                <div className="w-full rounded-2xl relative top-5  h-[300px]  bg-red-400"></div>
                <div className="w-full rounded-2xl relative -top-10 h-[300px] bg-red-400"></div>
            </section>
        </div>
    );
};

export default Team;