import Image from "next/image";
import img from "../../../Assets/Webp/aboutUs.png";
const AboutUs = () => {
  return (
    <div className="relative my-20">
      <h1 className="text-5xl text-light-primary-color dark:text-dark-primary-color text-center mb-10 font-bold tracking-wide">
        About Us
      </h1>
      {/*-> Rahat code */}
      <div className="min-h-[400px] max-md:gap-0 max-lg:gap-10  max-lg:grid-cols-1 grid  grid-cols-2">
        <div className="h-full w-full max-md:w-[85%]  max-md:h-[80%] mx-auto ">
          <Image
            src={img}
            alt="img"
            className=" h-[400px] w-full flex justify-center object-contain"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="font-Space flex flex-col justify-center">
          Welcome to our GCam Config and Updates website, your one-stop
          destination for the latest Google Camera (GCam) updates, configuration
          files, and a community-driven photo gallery.
          <br />
          <br />
          <span className="font-bold"> Our mission </span>is to enhance your
          mobile photography experience by providing the best resources and
          support for GCam enthusiasts. Our Mission Our mission is to
          democratize access to advanced mobile photography by offering
          comprehensive resources for GCam users. We strive to provide the most
          up-to-date information, configuration files, and community support to
          help you capture stunning photos with your Android device.
          <br />
          <br />
          <span className="font-bold">Our Vision </span>
          We envision a world where everyone can take professional-quality
          photos with their smartphones, regardless of their device. By making
          GCam updates and configurations easily accessible, we aim to empower
          users to unlock the full potential of their mobile cameras.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
