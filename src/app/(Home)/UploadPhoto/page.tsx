"use client";
import PhotoMetaData from "@/components/PageWise/ImgDetails/PhotoMetaData";
import Banner from "@/components/PageWise/UploadPhoto/Banner";
import CategorySelector from "@/components/PageWise/UploadPhoto/CategorySelector";
import PrivateRoute from "@/ExportedFunctions/PrivateRoute";
import { useState } from "react";

const UploadPhotoPage = () => {
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
    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    return (
        <PrivateRoute>        <div className="grid grid-cols-10 max-lg:grid-cols-1 sm:px-10 px-5 py-5  dark:bg-gradient-to-br from-black to-light-primary-color gap-5 h-full">
            <Banner selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} exifData={exifData} setExifData={setExifData} />
            <div className="max-lg:hidden col-span-4">
                {
                    exifData && <PhotoMetaData type="button" MetaData={exifData} />
                }
                <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
        </div></PrivateRoute>
    );
};

export default UploadPhotoPage;