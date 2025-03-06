"use client";
import Banner from "@/components/PageWise/UploadPhoto/Banner";
import PrivateRoute from "@/ExportedFunctions/PrivateRoute";

const UploadPhotoPage = () => {
    return (
        <PrivateRoute>        <div className="grid grid-cols-10 max-lg:grid-cols-1 sm:px-10 px-5 py-5  dark:bg-gradient-to-br from-black to-light-primary-color gap-5 h-full">
            <Banner />
        </div></PrivateRoute>
    );
};

export default UploadPhotoPage;