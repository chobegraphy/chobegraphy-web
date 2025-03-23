"use client";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";



import axios from "axios";
import { useLazyGetUserDataQuery } from "../Redux/Features/Apis/DataRelated/Apis/GetUserData/ApiSlice";
import { SetImgDetailsId } from "../Redux/Features/StoreImgDetailsId/StoreImgDetailsId";
import app from "../src/Firebase/Firebase.config";

interface AuthProviderDataProps {
  children: ReactNode;
}

interface AuthContextData {
  open: boolean;
  setOpen: (open: boolean) => void;
  EmailPassWordSignUp: (email: string, password: string) => Promise<any>;
  EmailPasswordLogin: (email: string, password: string) => Promise<any>;
  GoogleSignIn: () => Promise<any>;
  GitHubLogin: () => Promise<any>;
  setUser: (user: any) => void;
  user: any;
  logOut: () => Promise<any>;
  signIn: boolean;
  setSignIn: (signIn: boolean) => void;
  passwordReset: (email: string) => Promise<any>;
}

const defaultValue: AuthContextData = {
  open: false,
  setOpen: () => { },
  EmailPassWordSignUp: () => Promise.resolve(),
  EmailPasswordLogin: () => Promise.resolve(),
  GoogleSignIn: () => Promise.resolve(),
  GitHubLogin: () => Promise.resolve(),
  setUser: () => { },
  logOut: () => Promise.resolve(),
  user: null,
  signIn: true,
  setSignIn: () => { },
  passwordReset: () => Promise.resolve(),
};

export const AuthContext = createContext<AuthContextData>(defaultValue);
const auth = getAuth(app);

const AuthProvider = ({ children }: AuthProviderDataProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const dispatch = useDispatch();
  const pathName = usePathname();
  // Fetch user data with RTK Query
  const [fetchUserData, { data: userData, error, isLoading }] = useLazyGetUserDataQuery();
  // Load user from local storage initially
  useEffect(() => {
    const localStorageUser = typeof window !== "undefined" && localStorage.getItem("userData");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
      setLoading(false);
    }
  }, []);

  // Firebase Auth State Change Listener
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);

      if (currentUser) {
        console.log(currentUser);
        try {
          const { email } = currentUser;
          console.log(email)
          if (!email) return;

          // Get JWT token from backend
          const JwtTokenReponse = await axios.post(`https://chobegraphyserver.onrender.com/api/jwt`, { email });
          if (JwtTokenReponse?.data && typeof window !== "undefined" && !localStorage.getItem("userData")) {
            typeof window !== "undefined" && localStorage.setItem("ChobegraphyAccess", JwtTokenReponse?.data);
            const userData = await fetchUserData({ email }).unwrap();
            setUser(userData);
            typeof window !== "undefined" && localStorage.setItem("userData", JSON.stringify(userData));

          }
          // User data is now managed via RTK Query, no direct API call needed
        } catch (error) {
          console?.error("Error fetching JWT token:", error);
          typeof window !== "undefined" && localStorage.removeItem("ChobegraphyAccess");
          typeof window !== "undefined" && localStorage.removeItem("userData");
          setUser(null);
        }
      } else {
        // Clear local storage when logged out
        typeof window !== "undefined" && localStorage.removeItem("ChobegraphyAccess");
        typeof window !== "undefined" && localStorage.removeItem("userData");
        setUser(null);
      }
    });

    return () => unSub();
  }, [fetchUserData]);




  useEffect(() => {
    if (userData) {
      setUser(userData);
      typeof window !== "undefined" && localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  // Handle Redux Store updates for liked pictures
  useEffect(() => {
    if (pathName !== "/ImgDetails") {
      dispatch(SetImgDetailsId(""));
      typeof window !== "undefined" && localStorage.removeItem("ImgDetailsId");
    }
  }, [pathName]);

  // Auth functions
  const EmailPassWordSignUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const EmailPasswordLogin = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const GoogleSignIn = async () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const GitHubLogin = () =>
    signInWithPopup(auth, new GithubAuthProvider());

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("ChobegraphyAccess");
      localStorage.removeItem("userData");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const passwordReset = async (email: string) =>
    sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider
      value={{
        open,
        setOpen,
        EmailPasswordLogin,
        EmailPassWordSignUp,
        GoogleSignIn,
        GitHubLogin,
        setUser,
        logOut,
        user,
        signIn,
        setSignIn,
        passwordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
