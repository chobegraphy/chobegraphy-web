"use client";
import Navbar from "@/components/shared/Navbar/Navbar";
import LoadingAnimation from "@/components/ui/loadingAnimation/loadingAnimation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading && <LoadingAnimation />}
      {!loading && (
        <>
          {pathName !== "/SignUp" && pathName !== "/SignIn" && <Navbar />}

          {children}
          {/* {pathName !== "/SignUp" && pathName !== "/SignIn" && <Footer />} */}
        </>
      )}
    </div>
  );
};

export default HomeLayout;
