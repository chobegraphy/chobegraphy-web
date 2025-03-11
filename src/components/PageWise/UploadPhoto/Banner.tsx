"use client";

import ExifReader from "exifreader";
import { extractColors } from "extract-colors";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";



import { useAddUploadedPictureDataMutation } from "../../../../Redux/Features/FeVercelServerApiSlice/Apis/AddUploadPictureData/ApiSlice";

import Link from "next/link";
import { LuFileImage } from "react-icons/lu";
import { PiShareNetworkBold } from "react-icons/pi";
import { SiSparkpost } from "react-icons/si";
import { useUploadEncodedPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadEncodedPhoto/ApiSlice";
import { useUploadMainPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadMainPhoto/ApiSlice";
import { useUploadThumbnailPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadThumbnailPhoto/ApiSlice";
import "./Banner.css";
import CategorySelector from "./CategorySelector";
import PhotoDetails from "./PhotoDetails";
import PhotoMetaData from "./PhotoMetaData";

const Banner = ({ exifData, setExifData, setSelectedCategory, selectedCategory }: any) => {

  // user data 
  const { user } = useAuth();
  const Language = useSelector((state: any) => state.Language.value);
  // redux uplaod image
  const [UploadEncodedPicture] = useUploadEncodedPictureMutation()
  const [UploadThumbnailPicture] = useUploadThumbnailPictureMutation()
  const [UploadMainPicture] = useUploadMainPictureMutation()
  const [AddUploadedPictureData] = useAddUploadedPictureDataMutation()
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState("");
  const [fileSize, setFileSize] = useState<string | number>(0);
  const [fileName, SetFileName] = useState<string>('');
  const [colors, setColors] = useState<Array<{ r: number; g: number; b: number; hex: string; area: number }>>([]);
  const [Base64photo, setBase64photo] = useState<string | null>(null);
  const [encodedPhoto, setEncodedPhoto] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [view] = useState(0);
  const [react] = useState(0);
  const [download] = useState(0);
  const [uploadedTime, setUploadedTime] = useState<string>('');
  const [district, setDistrict] = useState<object>({});
  const [mainImgFile, setMainImgFile] = useState<any>(null);
  const [description, setDescription] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedPictureId, setUploadedPictureId] = useState('');
  // upload loading states
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);


  // Disable scrolling when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen2 ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen2]);
  // get EXIF data from image
  const extractExifData = (file: any) => {
    // Extract EXIF data
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const exif = ExifReader.load(e.target.result);
      const extractedExifData = {
        aperture: exif.ApertureValue?.description || "",
        exposureTime: exif.ExposureTime?.description || "",
        flash: exif.Flash?.description || "",
        iso: exif.ISOSpeedRatings?.description || "",
        model: exif.Model?.description || "",
        software: exif.Software?.description || "",
        datetimeOriginal: exif.DateTimeOriginal?.description || "",
        focalLength: exif.FocalLength?.description || "",
        creatorTool: exif.CreatorTool?.description || "",
        subjectDistance: exif.SubjectDistance?.description || "",

      };

      // Save EXIF data to state
      setExifData(extractedExifData);
    };
    reader.readAsArrayBuffer(file);
  };

  // calculate dimensions of the image
  const getDimensions = (file: any) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          // Set dimensions once the image is loaded
          resolve({ width: img.width, height: img.height });
          setDimensions(`${img.width} x ${img.height}`);
        };
        img.onerror = (error) => reject(error);
        img.src = reader.result as string;
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Read file as a data URL to load the image
    });
  };
  // Convert file to encoded 
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString().split(",")[1]);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };
  // Convert file to thumbnail compressed
  const convertToCompressed = (file: File, maxWidth = 1080, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        if (typeof reader.result === "string") {
          img.src = reader.result;
        }
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Could not get canvas context");

          // Resize image while maintaining aspect ratio
          const scaleFactor = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleFactor;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality).split(",")[1]); // Convert to Base64 (JPEG, 70% quality)
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const convertEncoded = (file: any, maxWidth = 20): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        if (typeof reader.result === 'string') {
          img.src = reader.result;
        }
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Could not get canvas context");

          // Calculate new dimensions
          const scaleFactor = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleFactor;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.7).split(",")[1]); // Convert to Base64 (JPEG, 70% quality)
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const oneConnect = async (file: any) => {
    setSelectedImg(URL.createObjectURL(file));
    extractExifData(file);
    getDimensions(file);
    SetFileName(file.name);
    const fileSizeInBytes = file.size;
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
    setFileSize(fileSizeInMB);
    convertToBase64(file).then((base64) => { // Convert file to base64
      setBase64photo(base64 as string);
      extractColors(`data:image/jpeg;base64,${base64}`).then((col) => {
        console.log(col);
        const formattedColors = col.map(color => ({
          r: color.red,
          g: color.green,
          b: color.blue,
          hex: color.hex,
          area: color.area
        }));
        setColors(formattedColors);
      });
    });

    const encodedPicture = await convertEncoded(file);
    const thumbnail = await convertToCompressed(file);
    setThumbnail(thumbnail);
    setEncodedPhoto(encodedPicture);
    setMainImgFile(file);
    setUploadedTime(new Date().toISOString())
  }
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      oneConnect(file);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      oneConnect(file)
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const resetForm = () => {
    setSelectedImg(null);
    setDimensions("");
    setFileSize(0);
    SetFileName('');
    setColors([]);
    setBase64photo(null);
    setEncodedPhoto(null);
    setThumbnail(null);
    setUploadedTime('');
    setDistrict({});
    setMainImgFile(null);
    setDescription('');
    setExifData({
      aperture: "",
      exposureTime: "",
      flash: "",
      iso: "",
      model: "",
      software: "",
      datetimeOriginal: "",
      focalLength: "",
      creatorTool: "",
      subjectDistance: "",

    });
    setSelectedCategory([]);
  };


  const onSubmit = async (data: any) => {

    if (Object.keys(district).length === 0) {
      toast.error(Language === "en" ? "Select a district" : " একটি জেলা নির্বাচন করুন")
      return;
    }
    if (selectedCategory[0] === null) {
      toast.error(Language === "en" ? "Please select a category" : "একটি ক্যাটাগরি নির্বাচন করুন")
      return;
    }
    console.log("hi")
    if (!Base64photo) {
      return;
    }
    try {
      setIsOpen(true);
      setTimeout(() => setIsOpen2(true), 200);
      setUploadProgress(0);

      const uploadEncodedPictureResponse = await UploadEncodedPicture({ formData: { photo: encodedPhoto, filename: fileName } }).unwrap();
      setUploadProgress(25);
      let encodedImgUrl = uploadEncodedPictureResponse?.imageUrl;
      console.log(uploadEncodedPictureResponse?.imageUrl)
      const uploadThumbnailPictureResponse = await UploadThumbnailPicture({ formData: { photo: thumbnail, filename: fileName } }).unwrap();
      setUploadProgress(50);
      let thumbnailUrl = uploadThumbnailPictureResponse?.imageUrl;
      console.log(encodedImgUrl, thumbnailUrl)
      const formData = new FormData();
      formData.append("photo", mainImgFile);
      formData.append("filename", fileName);
      const uploadMainPictureResponse = await UploadMainPicture({ formData }).unwrap();
      setUploadProgress(75);
      let mainImgUrl = uploadMainPictureResponse?.imageUrl;
      console.log(encodedImgUrl, thumbnailUrl, mainImgUrl)
      if (encodedImgUrl && thumbnailUrl && mainImgUrl) {
        const PictureData = {
          // Image Details
          name: fileName,
          url: mainImgUrl,
          description: data?.description,
          thumbnail: thumbnailUrl,
          encodedUrl: encodedImgUrl,
          dimensions,
          fileSize,
          colors,

          // Author Information
          authorId: user,
          district,
          // Metadata & Status
          exifData,
          uploadedTime,
          status: "approved",
          copyright: "",
          collections: selectedCategory,

          // Engagement Data
          view,
          download,
          react,
        };

        const AddUploadedPictureDataResponse = await AddUploadedPictureData({ PictureData }).unwrap();
        if (AddUploadedPictureDataResponse) {
          resetForm();
          setUploadedPictureId(AddUploadedPictureDataResponse?.data?._id);
          reset({ "description": "" })
          toast.success(Language === "en" ? "Upload successful!" : "আপলোড সফল হয়েছে!");
          setUploadProgress(100);


        }
      }


    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadStatus("An error occurred while uploading.");
      // setLoading(false);
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text:
            Language === "EN"
              ? "Check out this amazing image!"
              : "এই চমৎকার ছবিটি দেখুন!",
          url: `https://chobegraphy.vercel.app/ImgDetails/${uploadedPictureId}`,
        });
        console.log("Share was successful.");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast.error("Your browser doesn't support sharing.");
    }
  };

  return (
    <div className="col-span-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full col-span-6">
        <div
          className={`overflow-hidden rounded-2xl relative  ${selectedImg ? "min-h-0" : "min-h-[300px] max-md:min-h-[200px]"}  border-opacity-30 dark:border-opacity-30 ${selectedImg ? `` : "border-light-primary-color border dark:border-dark-primary-color"}    bg-gradient-to-br from-light-primary-color/10 dark:from-dark-primary-color/10 dark:via-black to-dark-primary-color/20 dark:to-light-primary-color/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 flex justify-center items-center`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ border: selectedImg ? `2px solid ${colors[2]?.hex}` : "" }}
        >
          <input

            className="opacity-0 h-full w-full absolute cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImg ? (
            <img src={selectedImg} alt="Selected" className="w-full rounded-2xl h-full max-h-[400px] object-cover" />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <svg className="w-20  h-20 max-md:w-18 max-md:h-18" viewBox="0 0 73 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.1366 14.7458L36.2288 14.7733L36.2328 14.7688C36.6705 14.8481 37.1047 14.586 37.2332 14.1519C38.4049 10.2152 42.096 7.46504 46.2084 7.46504C46.6953 7.46504 47.0901 7.07016 47.0901 6.5833C47.0901 6.09643 46.6952 5.70156 46.2084 5.70156C41.1542 5.70156 36.9071 9.06665 35.5433 13.6493C35.4042 14.1162 35.6701 14.6067 36.1366 14.7458Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="2" />
                <path d="M56.4523 42.4384H52.062C51.658 42.4384 51.3302 42.1107 51.3302 41.7067C51.3302 41.3027 51.6579 40.9749 52.062 40.9749H56.4523C62.5042 40.9749 67.4283 36.0509 67.4283 29.999C67.4283 23.9471 62.5042 19.023 56.4523 19.023H56.3467C56.1345 19.023 55.9328 18.9311 55.7937 18.7706C55.6547 18.6101 55.592 18.3974 55.6223 18.1873C55.6877 17.7315 55.7206 17.2737 55.7206 16.8279C55.7206 11.5829 51.4529 7.31531 46.208 7.31531C44.1675 7.31531 42.2216 7.95296 40.5804 9.15978C40.2198 9.42478 39.7076 9.30718 39.499 8.91047C34.851 0.0596993 22.7108 -1.12887 16.4168 6.57053C13.7653 9.81417 12.7236 14.0336 13.5583 18.146C13.6503 18.6002 13.3028 19.0236 12.8412 19.0236H12.548C6.49615 19.0236 1.57208 23.9477 1.57208 29.9996C1.57208 36.0514 6.49615 40.9755 12.548 40.9755H16.9384C17.3424 40.9755 17.6701 41.3032 17.6701 41.7072C17.6701 42.1113 17.3424 42.439 16.9384 42.439H12.548C5.68905 42.439 0.108551 36.8585 0.108551 29.9995C0.108551 23.3329 5.3801 17.8742 11.9736 17.5731C11.3543 13.3066 12.5386 9.00295 15.2836 5.64437C22.0223 -2.5996 34.9365 -1.67556 40.3957 7.51707C42.1372 6.42522 44.1301 5.85244 46.2078 5.85244C52.5623 5.85244 57.5977 11.261 57.1571 17.58C63.6899 17.9463 68.8915 23.3763 68.8915 29.999C68.8915 36.8585 63.311 42.4384 56.452 42.4384L56.4523 42.4384Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="2" />
                <path d="M15.9586 41.2935C15.9586 51.4634 24.2322 59.737 34.402 59.737C44.572 59.737 52.8455 51.4633 52.8455 41.2935C52.8455 31.1235 44.572 22.85 34.402 22.85C24.2321 22.85 15.9586 31.1237 15.9586 41.2935ZM17.7224 41.2935C17.7224 32.0966 25.205 24.6138 34.402 24.6138C43.5989 24.6138 51.0817 32.0964 51.0817 41.2935C51.0817 50.4904 43.5989 57.9732 34.402 57.9732C25.2051 57.9732 17.7224 50.4905 17.7224 41.2935Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="2" />
                <path d="M34.0513 48.6577C34.0513 49.0363 34.3584 49.3434 34.737 49.3434C35.1156 49.3434 35.4227 49.0367 35.4227 48.6577V34.7291C35.4227 34.3504 35.1157 34.0434 34.737 34.0434C34.3584 34.0434 34.0513 34.3504 34.0513 34.7291V48.6577Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="1" />
                <path d="M34.7367 35.7002L30.936 39.5008L34.7367 35.7002ZM34.7367 35.7002L38.5374 39.5009C38.6711 39.6347 38.8472 39.7018 39.0223 39.7018L34.7367 35.7002ZM29.9661 39.5009C30.2339 39.7687 30.6683 39.7689 30.9359 39.5009L39.0223 39.7018C39.1971 39.7018 39.3733 39.6352 39.5072 39.5009C39.7751 39.233 39.775 38.799 39.5072 38.5312L35.2215 34.2455C34.9537 33.9777 34.5193 33.9776 34.2517 34.2455C34.2517 34.2456 34.2517 34.2456 34.2517 34.2456L29.9661 38.5312C29.6982 38.799 29.6982 39.2331 29.9661 39.5009Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="1" />
              </svg>
              <div className="text-center justify-start dark:text-dark-primary-color text-2xl max-md:text-sm font-medium font-Righteous">Choose a file or drag & drop it here</div>
            </div>
          )}
        </div>

        {errors.image && <p className="text-red-500">Image is required</p>}

        {/* Picture information */}
        <PhotoDetails setDescription={setDescription} onSubmit={onSubmit} district={district} setDistrict1={setDistrict} view={view} download={download} react={react} register={register} uploadedTime={uploadedTime} colors={colors} fileSize={fileSize} dimensions={dimensions} />
        <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

        {/* Picture meta data */}
        <div className="max-lg:block hidden">
          <PhotoMetaData type="button" MetaData={exifData} />
          <div className="my-3 max-lg:block hidden h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />
          <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        </div>
        <div className="mt-3 max-lg:block hidden h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

      </form>

      <div
        className={`${isOpen2 ? "h-[100dvh] w-screen opacity-100 " : "opacity-0"
          } fixed z-50 right-0 flex justify-center items-center overflow-hidden top-0 left-0 bg-black/90`}
      >
        <div
          ref={divRef}
          className={`${isOpen ? "bottom-2" : "-bottom-[120%]"
            } absolute transform duration-500 dark:bg-dark-primary-color border bg-black left-0 right-0 max-md:w-[95%] w-3/4 rounded-2xl mx-auto p-4 border-[#575757] lg:bottom-8 lg:scale-125 text-dark-primary-color dark:text-light-primary-color md:max-w-[320px] ${uploadProgress === 100 ? "h-[185px]" : "h-[200px]"}`}
        >
          {
            uploadProgress === 100 && <div><p className={`${Language === "BN" && "font-BanglaHeading"} text-lg text-center mb-3`}>
              {Language === "BN" && "আপলোড সফল হয়েছে"}
              {Language === "EN" && <span className="font-Righteous text-xl">Uploading Success</span>}
            </p>

              <div className="grid grid-cols-3 gap-2 mt-2 w-full h-[100px]">

                <div onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsOpen2(false), 200);
                  setUploadProgress(0)
                  handleShare()
                }
                } className="w-full h-full flex flex-col cursor-pointer  justify-center items-center rounded-xl bg-gradient-to-br dark:from-light-primary-color/10 from-dark-primary-color/10 via-black dark:to-dark-primary-color/20 to-light-primary-color/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5">
                  <PiShareNetworkBold className="text-4xl" />
                  <span className={`${Language === "BN" && "mt-1"}  text-center`}>
                    <p className={`${Language === "BN" && "font-BanglaHeading"} text-[10px] text-center`}>
                      {Language === "BN" && "লিঙ্ক শেয়ার করুন"}
                    </p>
                    {Language === "EN" && <span className="font-Space font-bold text-[10px]">Share Link</span>}
                  </span>
                </div>
                <Link href={`/ImgDetails/${uploadedPictureId}`} onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsOpen2(false), 200);
                  setUploadProgress(0)
                }
                } className="w-full h-full flex flex-col cursor-pointer  justify-center items-center rounded-xl bg-gradient-to-br dark:from-light-primary-color/10 from-dark-primary-color/10 via-black dark:to-dark-primary-color/20 to-light-primary-color/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5">
                  <SiSparkpost className="text-4xl" />
                  <span className={`${Language === "BN" && "mt-1.5"} text-center`}>
                    <p className={`${Language === "BN" && "font-BanglaHeading"} text-[10px] text-center`}>
                      {Language === "BN" && "পোস্ট হিসেবে দেখুন"}
                    </p>
                    {Language === "EN" && <span className="font-Space  font-bold text-[10px]">View As Post</span>}
                  </span>
                </Link>
                <div onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsOpen2(false), 200);
                  setUploadProgress(0)

                }
                } className="w-full h-full flex flex-col cursor-pointer  justify-center items-center rounded-xl bg-gradient-to-br dark:from-light-primary-color/10 from-dark-primary-color/10 via-black dark:to-dark-primary-color/20 to-light-primary-color/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5"><svg className="w-10 h-10" viewBox="0 0 73 60" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.1366 14.7458L36.2288 14.7733L36.2328 14.7688C36.6705 14.8481 37.1047 14.586 37.2332 14.1519C38.4049 10.2152 42.096 7.46504 46.2084 7.46504C46.6953 7.46504 47.0901 7.07016 47.0901 6.5833C47.0901 6.09643 46.6952 5.70156 46.2084 5.70156C41.1542 5.70156 36.9071 9.06665 35.5433 13.6493C35.4042 14.1162 35.6701 14.6067 36.1366 14.7458Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
                    <path d="M56.4523 42.4384H52.062C51.658 42.4384 51.3302 42.1107 51.3302 41.7067C51.3302 41.3027 51.6579 40.9749 52.062 40.9749H56.4523C62.5042 40.9749 67.4283 36.0509 67.4283 29.999C67.4283 23.9471 62.5042 19.023 56.4523 19.023H56.3467C56.1345 19.023 55.9328 18.9311 55.7937 18.7706C55.6547 18.6101 55.592 18.3974 55.6223 18.1873C55.6877 17.7315 55.7206 17.2737 55.7206 16.8279C55.7206 11.5829 51.4529 7.31531 46.208 7.31531C44.1675 7.31531 42.2216 7.95296 40.5804 9.15978C40.2198 9.42478 39.7076 9.30718 39.499 8.91047C34.851 0.0596993 22.7108 -1.12887 16.4168 6.57053C13.7653 9.81417 12.7236 14.0336 13.5583 18.146C13.6503 18.6002 13.3028 19.0236 12.8412 19.0236H12.548C6.49615 19.0236 1.57208 23.9477 1.57208 29.9996C1.57208 36.0514 6.49615 40.9755 12.548 40.9755H16.9384C17.3424 40.9755 17.6701 41.3032 17.6701 41.7072C17.6701 42.1113 17.3424 42.439 16.9384 42.439H12.548C5.68905 42.439 0.108551 36.8585 0.108551 29.9995C0.108551 23.3329 5.3801 17.8742 11.9736 17.5731C11.3543 13.3066 12.5386 9.00295 15.2836 5.64437C22.0223 -2.5996 34.9365 -1.67556 40.3957 7.51707C42.1372 6.42522 44.1301 5.85244 46.2078 5.85244C52.5623 5.85244 57.5977 11.261 57.1571 17.58C63.6899 17.9463 68.8915 23.3763 68.8915 29.999C68.8915 36.8585 63.311 42.4384 56.452 42.4384L56.4523 42.4384Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
                    <path d="M15.9586 41.2935C15.9586 51.4634 24.2322 59.737 34.402 59.737C44.572 59.737 52.8455 51.4633 52.8455 41.2935C52.8455 31.1235 44.572 22.85 34.402 22.85C24.2321 22.85 15.9586 31.1237 15.9586 41.2935ZM17.7224 41.2935C17.7224 32.0966 25.205 24.6138 34.402 24.6138C43.5989 24.6138 51.0817 32.0964 51.0817 41.2935C51.0817 50.4904 43.5989 57.9732 34.402 57.9732C25.2051 57.9732 17.7224 50.4905 17.7224 41.2935Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="2" />
                    <path d="M34.0513 48.6577C34.0513 49.0363 34.3584 49.3434 34.737 49.3434C35.1156 49.3434 35.4227 49.0367 35.4227 48.6577V34.7291C35.4227 34.3504 35.1157 34.0434 34.737 34.0434C34.3584 34.0434 34.0513 34.3504 34.0513 34.7291V48.6577Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="1" />
                    <path d="M34.7367 35.7002L30.936 39.5008L34.7367 35.7002ZM34.7367 35.7002L38.5374 39.5009C38.6711 39.6347 38.8472 39.7018 39.0223 39.7018L34.7367 35.7002ZM29.9661 39.5009C30.2339 39.7687 30.6683 39.7689 30.9359 39.5009L39.0223 39.7018C39.1971 39.7018 39.3733 39.6352 39.5072 39.5009C39.7751 39.233 39.775 38.799 39.5072 38.5312L35.2215 34.2455C34.9537 33.9777 34.5193 33.9776 34.2517 34.2455C34.2517 34.2456 34.2517 34.2456 34.2517 34.2456L29.9661 38.5312C29.6982 38.799 29.6982 39.2331 29.9661 39.5009Z" className="dark:fill-light-primary-color fill-dark-primary-color dark:stroke-light-primary-color stroke-dark-primary-color" strokeWidth="1" />
                  </svg>
                  <span className={`${Language === "BN" ? "mt-1 " : "-mt-1"} text-center`}>
                    <p className={`${Language === "BN" && "font-BanglaHeading"} text-[10px] text-center px-2`}>
                      {Language === "BN" && "আরেকটি আপলোড করুন"}
                    </p>
                    {Language === "EN" && <span className="font-Space  font-bold text-[10px]">Upload Another </span>}
                  </span>
                </div>
              </div>
            </div>
          }
          {
            uploadProgress < 100 && <div className="text-center"><p className={`${Language === "BN" && "font-BanglaHeading"} text-lg text-center mb-3`}>
              {Language === "BN" && "আপলোড করা হচ্ছে"}
            </p>
              {Language === "EN" && <span className="font-Righteous text-xl">Uploading Picture</span>}
              <div className="flex justify-center w-full"><LuFileImage className="text-center text-4xl mb-2" /></div>
              <h1 className="text-center mb-2">{fileName || "Loading..."}</h1>
              <div className="relative h-[40px]"><div
                className="h-full bg-white dark:bg-light-primary-color  rounded-xl z-10 duration-300 transform relative ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              ><span className="absolute top-0 bottom-0 right-1 flex items-center justify-center font-bold text-black dark:text-dark-primary-color">
                  {uploadProgress}%
                </span></div>

                <div className="bg-black dark:bg-light-primary-color/5 rounded-xl absolute top-0 left-0 right-0 bottom-0 h-full"></div>
              </div></div>
          }

        </div>
      </div>
    </div >
  );
};

export default Banner;
