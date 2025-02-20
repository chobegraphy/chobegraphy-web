"use client";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import LoadingAnimation from "@/components/ui/loadingAnimation/loadingAnimation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AuthProvider from "../../../Provider/AuthProvider";
import { store } from "../../../Redux/Store";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  useEffect(() => {
    if (pathName !== "/ImgDetails") {
      typeof window !== "undefined" && localStorage.removeItem(`viewed`);
    }
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [pathName]);
  return (
    <Provider store={store}>
      <AuthProvider>
        {loading && <LoadingAnimation />}
        {!loading && (
          <>
            {pathName !== "/SignUp" && pathName !== "/SignIn" && <Navbar />}
            {children}

            {pathName !== "/SignUp" && pathName !== "/SignIn" && <Footer />}
          </>
        )}
      </AuthProvider>
    </Provider>
  );
};

export default HomeLayout;
