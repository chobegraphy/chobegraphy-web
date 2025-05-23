"use client";
import CheckTeamMember from "@/components/shared/CheckTeamMember/CheckTeamMember";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import LoadingAnimation from "@/components/ui/loadingAnimation/loadingAnimation";
import { Analytics } from "@vercel/analytics/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AuthProvider from "../../../Provider/AuthProvider";
import { store } from "../../../Redux/Store";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
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
          <motion.div style={{ y }} className="min-h-screen">
            {pathName !== "/SignUp" && pathName !== "/SignIn" && <Navbar />}
            <Analytics />
            <CheckTeamMember />
            {children}
            <Toaster
              toastOptions={{
                className: "ToastClass",
              }}
              position="bottom-center"
              reverseOrder={false}
            />
            {pathName !== "/SignUp" && pathName !== "/SignIn" && <Footer />}
          </motion.div>
        )}
      </AuthProvider>
    </Provider>
  );
};

export default HomeLayout;
