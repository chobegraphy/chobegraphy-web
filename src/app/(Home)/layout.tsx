"use client";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import AuthProvider from "../../../Provider/AuthProvider";
import { store } from "../../../Redux/Store";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  // const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* {loading && <LoadingAnimation />}
        {!loading && (
          <>
          </>
        )} */}
        {pathName !== "/SignUp" && pathName !== "/SignIn" && <Navbar />}
        {children}

        {pathName !== "/SignUp" && pathName !== "/SignIn" && <Footer />}
      </AuthProvider>
    </Provider>
  );
};

export default HomeLayout;
