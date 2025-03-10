"use client";

import ExifReader from "exifreader";
import { extractColors } from "extract-colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";
import { useUploadEncodedPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadEncodedPhoto/ApiSlice";
import { useUploadMainPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadMainPhoto/ApiSlice";
import { useUploadThumbnailPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadThumbnailPhoto/ApiSlice";
import { useAddUploadedPictureDataMutation } from "../../../../Redux/Features/FeVercelServerApiSlice/Apis/AddUploadPictureData/ApiSlice";
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
    setExifData({});
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

      const uploadEncodedPictureResponse = await UploadEncodedPicture({ formData: { photo: encodedPhoto, filename: fileName } }).unwrap();
      let encodedImgUrl = uploadEncodedPictureResponse?.imageUrl;
      console.log(uploadEncodedPictureResponse?.imageUrl)
      const uploadThumbnailPictureResponse = await UploadThumbnailPicture({ formData: { photo: thumbnail, filename: fileName } }).unwrap();
      let thumbnailUrl = uploadThumbnailPictureResponse?.imageUrl;
      console.log(encodedImgUrl, thumbnailUrl)
      const formData = new FormData();
      formData.append("photo", mainImgFile);
      formData.append("filename", fileName);
      const uploadMainPictureResponse = await UploadMainPicture({ formData }).unwrap();
      let mainImgUrl = uploadMainPictureResponse?.imageUrl;
      console.log(encodedImgUrl, thumbnailUrl, mainImgUrl)
      if (encodedImgUrl && thumbnailUrl && mainImgUrl) {
        const PictureData = {
          // Image Details
          name: fileName,
          url: mainImgUrl,
          description,
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
          toast.success(Language === "en" ? "Upload successful!" : "আপলোড সফল হয়েছে!");
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadStatus("An error occurred while uploading.");
      // setLoading(false);
    }
  };
  console.log(district)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full col-span-6">
      <div
        className="outline-dashed overflow-hidden rounded-2xl relative min-h-[300px] max-md:min-h-[200px] flex justify-center items-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input

          className="opacity-0 h-full w-full absolute cursor-pointer"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {selectedImg ? (
          <img src={selectedImg} alt="Selected" className="w-auto  h-auto max-h-[400px] " />
        ) : (
          <p className="text-gray-500">Drag & drop or click to upload an image</p>
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
  );
};

export default Banner;
