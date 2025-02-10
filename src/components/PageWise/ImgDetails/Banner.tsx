import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full col-span-7">
      <Image
        width={0}
        height={0}
        src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
        alt=""
        className="w-full h- max-h-[80%] rounded-2xl border-2 bg-red-500 border-dark-primary-color/10 dark:border-light-primary-color/10 shadow-lg object-cover md:h-[500px] lg:h-[700px]"
      />
    </div>
  );
};

export default Banner;
