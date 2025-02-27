"use client";

import axios from "axios";
import ExifReader from "exifreader";
import { extractColors } from "extract-colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Banner.css";
import PhotoDetails from "./PhotoDetails";
import PhotoMetaData from "./PhotoMetaData";
const Banner = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [exifData, setExifData] = useState({
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
  const [dimensions, setDimensions] = useState("");
  const [fileSize, setFileSize] = useState<string | number>(0);
  const [colors, setColors] = useState<Array<{ r: number; g: number; b: number; hex: string; area: number }>>([]);
  const [Base64photo, setBase64photo] = useState<string | null>(null);
  const [encodedPhoto, setEncodedPhoto] = useState<string | null>(null);
  const [view] = useState(0);
  const [react] = useState(0);
  const [download] = useState(0);
  const [uploadedTime, setUploadedTime] = useState<string>('');
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
  // Convert file to Base64 
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

  const convertToBase64Thumbnail = (file: any, maxWidth = 20): Promise<string> => {
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

    const thumbnailBase64 = await convertToBase64Thumbnail(file);

    setEncodedPhoto(thumbnailBase64);
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


  const onSubmit = async (data: any) => {
    if (!Base64photo) {
      return;
    }
    try {
      const uploadResponse = await axios.post(
        "https://chobegraphy-server.vercel.app/api/upload",
        {
          Base64photo,
          filename: "image.jpg",
        }
      );
      const formData1 = new FormData();
      if (encodedPhoto) {
        formData1.append("image", encodedPhoto);
      }
      const imgbbResponse1 = await axios.post(
        "https://api.imgbb.com/1/upload?key=eada499cd6dc5e09c832c88531a41acb",
        formData1
      );
      const imgbbData1 = imgbbResponse1.data.data;
      if (imgbbData1.display_url) {
        const formData = new FormData();
        formData.append("image", Base64photo);
        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload?key=eada499cd6dc5e09c832c88531a41acb",
          formData
        );
        const imgbbData = imgbbResponse.data.data;
        const thumbnail = imgbbData.medium.url;
        console.log(uploadResponse.data.imageUrl);
        const uploadedUrl = uploadResponse.data.imageUrl;

        const metadata = {
          name: "Name",
          author: "author", // Replace with actual author
          url: uploadedUrl,
          dimensions,
          collections: "",
          copyright: "",
          downloadable: false,
          thumbnail,
          encodedUrl: imgbbData1.display_url,
          exifData,
          fileSize,
          colors,
        };

        // Send metadata to a secondary API
        const metadataResponse = await axios.post(
          "https://chobegraphy-server.vercel.app/api/add-data",
          metadata
        );
        console.log(metadataResponse.data);
        if (metadataResponse.data.message) {
          // setUploadStatus("Success! File uploaded ");

        } else {
          // setUploadStatus("File upload failed.");
        }
        // setLoading(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadStatus("An error occurred while uploading.");
      // setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full col-span-6">
      <div
        className="outline-dashed overflow-hidden rounded-2xl relative min-h-[300px] max-md:min-h-[200px] flex justify-center items-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          {...register("image", { required: true })}
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
      <PhotoDetails uploadedTime={uploadedTime} colors={colors} fileSize={fileSize} dimensions={dimensions} />
      <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />

      {/* Picture meta data */}
      <PhotoMetaData type="button" MetaData={exifData} />
      <div className="mt-3 h-[1px] w-full bg-light-secondary-color rounded-full opacity-50" />
    </form>
  );
};

export default Banner;
