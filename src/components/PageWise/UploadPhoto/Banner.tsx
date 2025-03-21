"use client";

import ExifReader from "exifreader";
import { extractColors } from "extract-colors";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../Provider/AuthProvider";




import { useAddUploadedPictureDataMutation } from "../../../../Redux/Features/Apis/DataRelated/Apis/AddUploadPictureData/ApiSlice";
import { useUploadEncodedPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadEncodedPhoto/ApiSlice";
import { useUploadMainPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadMainPhoto/ApiSlice";
import { useUploadThumbnailPictureMutation } from "../../../../Redux/Features/FeRenderServerApiSlice/Apis/UploadThumbnailPhoto/ApiSlice";
import "./Banner.css";
import CategorySelector from "./CategorySelector";
import CopyRightType from "./CopyRightType";
import PhotoDetails from "./PhotoDetails";
import PhotoMetaData from "./PhotoMetaData";
import UploadProgress from "./UploadProgress";

const Banner = ({ exifData, setExifData, setSelectedCategory, selectedCategory, colors, setColors, SelectedCopyrightType, setSelectedCopyrightType }: any) => {

  // user data 
  const { user } = useAuth();
  const Language = useSelector((state: any) => state.Language.value);
  // redux uplaod image
  const [UploadEncodedPicture, { error: UploadEncodedPhotoError }] = useUploadEncodedPictureMutation()
  const [UploadThumbnailPicture, { error: UploadThumbnailPhotoError }] = useUploadThumbnailPictureMutation()
  const [UploadMainPicture, { error: UploadMainPhotoError }] = useUploadMainPictureMutation()
  const [AddUploadedPictureData] = useAddUploadedPictureDataMutation()
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState("");
  const [fileSize, setFileSize] = useState<string | number>(0);
  const [fileName, SetFileName] = useState<string>('');

  const [Base64photo, setBase64photo] = useState<string | null>(null);
  const [encodedPhoto, setEncodedPhoto] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [view] = useState(0);
  const [react] = useState(0);
  const [download] = useState(0);
  const [uploadedTime, setUploadedTime] = useState<string>('');
  const [district, setDistrict] = useState<object>({});
  const [district1, setDistrict1] = useState("");
  const [mainImgFile, setMainImgFile] = useState<any>(null);
  const [description, setDescription] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedPictureId, setUploadedPictureId] = useState('');
  // img urls
  const [encodedImgUrl, setEncodedImgUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [mainImgUrl, setMainImgUrl] = useState('');
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
  const [fileExt, setFileExt] = useState("");
  useEffect(() => {
    let fileExtension = "";
    const baseFileName = "Chobegraphy";
    if (mainImgFile === null) {
      return
    }
    if (mainImgFile?.type === "image/jpeg") {
      setFileExt(".jpeg");
      fileExtension = ".jpeg";
    } else if (mainImgFile?.type === "image/png") {
      fileExtension = ".png";
      setFileExt(".png");
    } else if (mainImgFile?.type === "image/img") {
      fileExtension = ".img";
      setFileExt(".img");
    } else {
      toast.error("Unsupported file type. Please upload a JPEG, PNG, or IMG.");
      return; // Exit if file type is unsupported
    }
    const finalFileName = description ? `${description} (${baseFileName})${fileExtension}` : `${baseFileName}${fileExtension}`;

    SetFileName(finalFileName);
  }, [description, mainImgFile]);

  const oneConnect = async (file: any) => {
    const fileType = file.type;
    if (!fileType.match(/image\/(jpeg|png|img)/)) {
      toast.error(Language === "EN" ? "Only JPEG, PNG, or IMG files are allowed." : "একটি JPEG, PNG, বা IMG ফাইল অপলোড করুন.");
      return;
    }
    setSelectedImg(URL.createObjectURL(file));
    extractExifData(file);
    getDimensions(file);


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
    setDistrict1('');
    setMainImgFile(null);
    setDescription('');
    SetFileName('');
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
    setDistrict({});
    setSelectedCategory([]);
    const districtElement = document.getElementById("district") as HTMLInputElement;
    const descriptionElement = document.getElementById("description") as HTMLInputElement;
    if (districtElement) {
      districtElement.value = "";
      descriptionElement.value = "";
    }
  };


  const onSubmit = async (data: any) => {

    if (description === "") {
      toast.error(Language === "en" ? "Please enter a caption" : "একটি ক্যাপশন লিখুন", {
        id: "description"
      })
      return
    }
    if (Object.keys(district).length === 0) {
      toast.error(Language === "en" ? "Select a district" : " একটি জেলা নির্বাচন করুন"
        , {
          id: "district"
        }
      )
      return;
    }
    if (selectedCategory[0] === null) {
      toast.error(Language === "en" ? "Please select a category" : "একটি ক্যাটাগরি নির্বাচন করুন"
        , {
          id: "category"
        }
      )
      return;
    }
    if (SelectedCopyrightType === "") {
      toast.error(Language === "en" ? "Please select a copyright type" : "একটি কপিরাইট টাইপ নির্বাচন করুন", {
        id: "copyright"
      })
      return
    }
    if (!Base64photo) {
      return;
    }
    try {
      setIsOpen(true);
      setTimeout(() => setIsOpen2(true), 200);
      setUploadProgress(0);

      if (thumbnailUrl === "" && encodedImgUrl === "" && mainImgUrl === "") {
        const uploadEncodedPictureResponse = await UploadEncodedPicture({ formData: { photo: encodedPhoto, filename: fileName } }).unwrap();
        setUploadProgress(25);
        let encodedImgUrl = uploadEncodedPictureResponse?.imageUrl;
        setEncodedImgUrl(encodedImgUrl)
        console.log(uploadEncodedPictureResponse?.imageUrl)
        const uploadThumbnailPictureResponse = await UploadThumbnailPicture({ formData: { photo: thumbnail, filename: fileName } }).unwrap();
        setUploadProgress(50);
        let thumbnailUrl = uploadThumbnailPictureResponse?.imageUrl;
        setThumbnailUrl(thumbnailUrl)
        console.log(encodedImgUrl, thumbnailUrl)
        const formData = new FormData();
        formData.append("photo", mainImgFile);
        formData.append("filename", fileName);
        const uploadMainPictureResponse = await UploadMainPicture({ formData }).unwrap();
        setUploadProgress(75);
        let mainImgUrl = uploadMainPictureResponse?.imageUrl;
        setMainImgUrl(mainImgUrl)
        console.log(encodedImgUrl, thumbnailUrl, mainImgUrl)
        if (encodedImgUrl && thumbnailUrl && mainImgUrl) {
          const PictureData = {
            // Image Details
            name: fileName,
            url: mainImgUrl,
            description: description,
            thumbnail: thumbnailUrl,
            encodedUrl: encodedImgUrl,
            dimensions,
            fileSize,
            colors,

            // Author Information
            author: user,
            district,
            // Metadata & Status
            exifData,
            uploadedTime,
            status: user?.teamMember === true ? "approved" : "pending",
            copyright: SelectedCopyrightType,
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


            setUploadProgress(100);
            if (!user.teamMember) {
              toast.success(Language === "BN" ? "ছবি আপলোড করা হয়েছে অ্যাডমিনের অ্যাপ্রুভড করার জন্য অপেক্ষা করুন" : "Picture Uploaded Wait for Admin Approval")
              setIsOpen(false);
              setTimeout(() => setIsOpen2(false), 100);
              setUploadProgress(0)
            }


          }
        }
      }
      if (thumbnailUrl === "" && encodedImgUrl !== "" && mainImgUrl === "") {
        const uploadEncodedPictureResponse = await UploadEncodedPicture({ formData: { photo: encodedPhoto, filename: fileName } }).unwrap();
        setUploadProgress(25);
        let encodedImgUrl = uploadEncodedPictureResponse?.imageUrl;
        setEncodedImgUrl(encodedImgUrl)
        console.log(uploadEncodedPictureResponse?.imageUrl)
        const uploadThumbnailPictureResponse = await UploadThumbnailPicture({ formData: { photo: thumbnail, filename: fileName } }).unwrap();
        setUploadProgress(50);
        let thumbnailUrl = uploadThumbnailPictureResponse?.imageUrl;
        setThumbnailUrl(thumbnailUrl)
        console.log(encodedImgUrl, thumbnailUrl)
        const formData = new FormData();
        formData.append("photo", mainImgFile);
        formData.append("filename", fileName);
        const uploadMainPictureResponse = await UploadMainPicture({ formData }).unwrap();
        setUploadProgress(75);
        let mainImgUrl = uploadMainPictureResponse?.imageUrl;
        setMainImgUrl(mainImgUrl)
        console.log(encodedImgUrl, thumbnailUrl, mainImgUrl)
        if (encodedImgUrl && thumbnailUrl && mainImgUrl) {
          const PictureData = {
            // Image Details
            name: fileName,
            url: mainImgUrl,
            description: description,
            thumbnail: thumbnailUrl,
            encodedUrl: encodedImgUrl,
            dimensions,
            fileSize,
            colors,

            // Author Information
            author: user,
            district,
            // Metadata & Status
            exifData,
            uploadedTime,
            status: user?.teamMember === true ? "approved" : "pending",
            copyright: SelectedCopyrightType,
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


            setUploadProgress(100);
            if (!user.teamMember) {
              toast.success(Language === "BN" ? "ছবি আপলোড করা হয়েছে অ্যাডমিনের অ্যাপ্রুভড করার জন্য অপেক্ষা করুন" : "Picture Uploaded Wait for Admin Approval")
              setIsOpen(false);
              setTimeout(() => setIsOpen2(false), 100);
              setUploadProgress(0)
            }


          }
        }
      }
      if (thumbnailUrl !== "" && encodedImgUrl !== "" && mainImgUrl === "") {
        const uploadEncodedPictureResponse = await UploadEncodedPicture({ formData: { photo: encodedPhoto, filename: fileName } }).unwrap();
        setUploadProgress(25);
        let encodedImgUrl = uploadEncodedPictureResponse?.imageUrl;
        setEncodedImgUrl(encodedImgUrl)
        console.log(uploadEncodedPictureResponse?.imageUrl)
        const uploadThumbnailPictureResponse = await UploadThumbnailPicture({ formData: { photo: thumbnail, filename: fileName } }).unwrap();
        setUploadProgress(50);
        let thumbnailUrl = uploadThumbnailPictureResponse?.imageUrl;
        setThumbnailUrl(thumbnailUrl)
        console.log(encodedImgUrl, thumbnailUrl)
        const formData = new FormData();
        formData.append("photo", mainImgFile);
        formData.append("filename", fileName);
        const uploadMainPictureResponse = await UploadMainPicture({ formData }).unwrap();
        setUploadProgress(75);
        let mainImgUrl = uploadMainPictureResponse?.imageUrl;
        setMainImgUrl(mainImgUrl)
        console.log(encodedImgUrl, thumbnailUrl, mainImgUrl)
        if (encodedImgUrl && thumbnailUrl && mainImgUrl) {
          const PictureData = {
            // Image Details
            name: fileName,
            url: mainImgUrl,
            description: description,
            thumbnail: thumbnailUrl,
            encodedUrl: encodedImgUrl,
            dimensions,
            fileSize,
            colors,

            // Author Information
            author: user,
            district,
            // Metadata & Status
            exifData,
            uploadedTime,
            status: user?.teamMember === true ? "approved" : "pending",
            copyright: SelectedCopyrightType,
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


            setUploadProgress(100);
            if (!user.teamMember) {
              toast.success(Language === "BN" ? "ছবি আপলোড করা হয়েছে অ্যাডমিনের অ্যাপ্রুভড করার জন্য অপেক্ষা করুন" : "Picture Uploaded Wait for Admin Approval")
              setIsOpen(false);
              setTimeout(() => setIsOpen2(false), 100);
              setUploadProgress(0)
            }


          }
        }
      }
      if (thumbnailUrl !== "" && encodedImgUrl !== "" && mainImgUrl !== "") {
        const uploadEncodedPictureResponse = await UploadEncodedPicture({ formData: { photo: encodedPhoto, filename: fileName } }).unwrap();
        setUploadProgress(25);
        let encodedImgUrl = uploadEncodedPictureResponse?.imageUrl;
        setEncodedImgUrl(encodedImgUrl)
        console.log(uploadEncodedPictureResponse?.imageUrl)
        const uploadThumbnailPictureResponse = await UploadThumbnailPicture({ formData: { photo: thumbnail, filename: fileName } }).unwrap();
        setUploadProgress(50);
        let thumbnailUrl = uploadThumbnailPictureResponse?.imageUrl;
        setThumbnailUrl(thumbnailUrl)
        console.log(encodedImgUrl, thumbnailUrl)
        const formData = new FormData();
        formData.append("photo", mainImgFile);
        formData.append("filename", fileName);
        const uploadMainPictureResponse = await UploadMainPicture({ formData }).unwrap();
        setUploadProgress(75);
        let mainImgUrl = uploadMainPictureResponse?.imageUrl;
        setMainImgUrl(mainImgUrl)
        console.log(encodedImgUrl, thumbnailUrl, mainImgUrl)
        if (encodedImgUrl && thumbnailUrl && mainImgUrl) {
          const PictureData = {
            // Image Details
            name: fileName,
            url: mainImgUrl,
            description: description,
            thumbnail: thumbnailUrl,
            encodedUrl: encodedImgUrl,
            dimensions,
            fileSize,
            colors,

            // Author Information
            author: user,
            district,
            // Metadata & Status
            exifData,
            uploadedTime,
            status: user?.teamMember === true ? "approved" : "pending",
            copyright: SelectedCopyrightType,
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


            setUploadProgress(100);

            if (!user.teamMember) {
              toast.success(Language === "BN" ? "ছবি আপলোড করা হয়েছে অ্যাডমিনের অ্যাপ্রুভড করার জন্য অপেক্ষা করুন" : "Picture Uploaded Wait for Admin Approval")
              setIsOpen(false);
              setTimeout(() => setIsOpen2(false), 100);
              setUploadProgress(0)
            }



          }
        }
      }

    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadStatus("An error occurred while uploading.");
      // setLoading(false);
    }
  };


  return (
    <div className="col-span-6">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full col-span-6">
        <div
          className={`overflow-hidden rounded-2xl relative  ${selectedImg ? "min-h-0" : "min-h-[300px] max-md:min-h-[200px]"}  border-opacity-30 dark:border-opacity-30 ${selectedImg ? `` : "border-light-primary-color border dark:border-dark-primary-color"}    bg-gradient-to-br from-light-primary-color/10 dark:from-dark-primary-color/10 dark:via-black to-dark-primary-color/20 dark:to-light-primary-color/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 flex justify-center items-center`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ border: selectedImg ? `2px solid ${colors[1]?.hex}` : "" }}
        >
          <input

            className="opacity-0 h-full w-full absolute cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImg ? (
            <img src={selectedImg} alt="Selected" className="w-auto  h-auto max-md:max-h-[300px] max-h-[400px] " />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <svg className="w-20  h-20 max-md:w-18 max-md:h-18" viewBox="0 0 73 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.1366 14.7458L36.2288 14.7733L36.2328 14.7688C36.6705 14.8481 37.1047 14.586 37.2332 14.1519C38.4049 10.2152 42.096 7.46504 46.2084 7.46504C46.6953 7.46504 47.0901 7.07016 47.0901 6.5833C47.0901 6.09643 46.6952 5.70156 46.2084 5.70156C41.1542 5.70156 36.9071 9.06665 35.5433 13.6493C35.4042 14.1162 35.6701 14.6067 36.1366 14.7458Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="2" />
                <path d="M56.4523 42.4384H52.062C51.658 42.4384 51.3302 42.1107 51.3302 41.7067C51.3302 41.3027 51.6579 40.9749 52.062 40.9749H56.4523C62.5042 40.9749 67.4283 36.0509 67.4283 29.999C67.4283 23.9471 62.5042 19.023 56.4523 19.023H56.3467C56.1345 19.023 55.9328 18.9311 55.7937 18.7706C55.6547 18.6101 55.592 18.3974 55.6223 18.1873C55.6877 17.7315 55.7206 17.2737 55.7206 16.8279C55.7206 11.5829 51.4529 7.31531 46.208 7.31531C44.1675 7.31531 42.2216 7.95296 40.5804 9.15978C40.2198 9.42478 39.7076 9.30718 39.499 8.91047C34.851 0.0596993 22.7108 -1.12887 16.4168 6.57053C13.7653 9.81417 12.7236 14.0336 13.5583 18.146C13.6503 18.6002 13.3028 19.0236 12.8412 19.0236H12.548C6.49615 19.0236 1.57208 23.9477 1.57208 29.9996C1.57208 36.0514 6.49615 40.9755 12.548 40.9755H16.9384C17.3424 40.9755 17.6701 41.3032 17.6701 41.7072C17.6701 42.1113 17.3424 42.439 16.9384 42.439H12.548C5.68905 42.439 0.108551 36.8585 0.108551 29.9995C0.108551 23.3329 5.3801 17.8742 11.9736 17.5731C11.3543 13.3066 12.5386 9.00295 15.2836 5.64437C22.0223 -2.5996 34.9365 -1.67556 40.3957 7.51707C42.1372 6.42522 44.1301 5.85244 46.2078 5.85244C52.5623 5.85244 57.5977 11.261 57.1571 17.58C63.6899 17.9463 68.8915 23.3763 68.8915 29.999C68.8915 36.8585 63.311 42.4384 56.452 42.4384L56.4523 42.4384Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="2" />
                <path d="M15.9586 41.2935C15.9586 51.4634 24.2322 59.737 34.402 59.737C44.572 59.737 52.8455 51.4633 52.8455 41.2935C52.8455 31.1235 44.572 22.85 34.402 22.85C24.2321 22.85 15.9586 31.1237 15.9586 41.2935ZM17.7224 41.2935C17.7224 32.0966 25.205 24.6138 34.402 24.6138C43.5989 24.6138 51.0817 32.0964 51.0817 41.2935C51.0817 50.4904 43.5989 57.9732 34.402 57.9732C25.2051 57.9732 17.7224 50.4905 17.7224 41.2935Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="2" />
                <path d="M34.0513 48.6577C34.0513 49.0363 34.3584 49.3434 34.737 49.3434C35.1156 49.3434 35.4227 49.0367 35.4227 48.6577V34.7291C35.4227 34.3504 35.1157 34.0434 34.737 34.0434C34.3584 34.0434 34.0513 34.3504 34.0513 34.7291V48.6577Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="1" />
                <path d="M34.7367 35.7002L30.936 39.5008L34.7367 35.7002ZM34.7367 35.7002L38.5374 39.5009C38.6711 39.6347 38.8472 39.7018 39.0223 39.7018L34.7367 35.7002ZM29.9661 39.5009C30.2339 39.7687 30.6683 39.7689 30.9359 39.5009L39.0223 39.7018C39.1971 39.7018 39.3733 39.6352 39.5072 39.5009C39.7751 39.233 39.775 38.799 39.5072 38.5312L35.2215 34.2455C34.9537 33.9777 34.5193 33.9776 34.2517 34.2455C34.2517 34.2456 34.2517 34.2456 34.2517 34.2456L29.9661 38.5312C29.6982 38.799 29.6982 39.2331 29.9661 39.5009Z" className="dark:fill-dark-primary-color dark:stroke-dark-primary-color" strokeWidth="1" />
              </svg>
              <div className="text-center justify-start dark:text-dark-primary-color text-2xl max-md:text-sm font-medium font-Righteous">
                {Language === "EN" && "Choose a file or drag & drop it here"}
                {Language === "BN" && <span className="font-BanglaHeading ">
                  একটি ফাইল বেছে নিন অথবা এখানে ড্রাগ করে আনুন</span>}
              </div>
              <button className="px-3 mt-3 bg-light-primary-color text-dark-primary-color dark:bg-dark-primary-color dark:text-light-primary-color rounded py-1">{Language === "EN" && "Browse File"}
                {Language === "BN" && <span className="font-BanglaHeading ">ফাইল ব্রাউজ করুন</span>}</button>
            </div>
          )}
        </div>



        {/* Picture information */}
        <PhotoDetails setDistrict={setDistrict1} district={district1} setDescription={setDescription} onSubmit={onSubmit} setDistrict1={setDistrict} view={view} download={download} react={react} register={register} uploadedTime={uploadedTime} colors={colors} fileSize={fileSize} dimensions={dimensions} />
        <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

        {/* Picture meta data */}
        <div className="max-lg:block hidden">
          <PhotoMetaData colors={colors} type="button" MetaData={exifData} />
          <div className="my-3 max-lg:block hidden h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />
          <CategorySelector colors={colors} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <CopyRightType colors={colors} SelectedCopyrightType={SelectedCopyrightType} setSelectedCopyrightType={setSelectedCopyrightType} />

        </div>
        <div className="mt-3 max-lg:block hidden h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

      </form>

      {/* upload progress and after wards doing */}
      <UploadProgress isOpen={isOpen} setIsOpen={setIsOpen} isOpen2={isOpen2} setIsOpen2={setIsOpen2} uploadProgress={uploadProgress} setUploadProgress={setUploadProgress} uploadedPictureId={uploadedPictureId} divRef={divRef} fileName={`Chobegraphy${fileExt}`} />

    </div >
  );
};

export default Banner;
