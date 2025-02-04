"use client";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import LoadingAnimation from "@/components/ui/loadingAnimation/loadingAnimation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../../Redux/Store";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <div>
        {loading && <LoadingAnimation />}
        {!loading && (
          <>
            {pathName !== "/SignUp" && pathName !== "/SignIn" && <Navbar />}
            {children}
            <Footer />
            {/* {pathName !== "/SignUp" && pathName !== "/SignIn" && <Footer />} */}
          </>
        )}
      </div>
    </Provider>
  );
};

export default HomeLayout;
