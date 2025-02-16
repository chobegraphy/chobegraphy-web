"use client";

import axios from "axios";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { BaseApiUrl } from "@/ExportedFunctions/BaseApiUrl";
import app from "../src/Firebase/Firebase.config";

interface AuthProviderDataProps {
  children: ReactNode;
}

interface LanguageState {
  language: string;
}

interface AuthContextData {
  OverAllLanguage: LanguageState;
  setOverAllLanguage: (language: LanguageState) => void;
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
}

const defaultValue: AuthContextData = {
  OverAllLanguage: { language: "English" },
  setOverAllLanguage: () => {},
  open: false,
  setOpen: () => {},
  EmailPassWordSignUp: () => Promise.resolve(),
  EmailPasswordLogin: () => Promise.resolve(),
  GoogleSignIn: () => Promise.resolve(),
  GitHubLogin: () => Promise.resolve(),
  setUser: () => {},
  logOut: () => Promise.resolve(),
  user: null,
  signIn: true,
  setSignIn: () => {},
};

export const AuthContext = createContext<AuthContextData>(defaultValue);
const auth = getAuth(app);

const AuthProvider = ({ children }: AuthProviderDataProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [OverAllLanguage, setOverAllLanguage] = useState<LanguageState>({
    language: "English",
  });
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);

  // Sign up with email and password (no backend post)
  const EmailPassWordSignUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const EmailPasswordLogin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google (no backend post)
  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // GitHub login (no backend post)
  const GitHubLogin = () => {
    return signInWithPopup(auth, new GithubAuthProvider());
  };

  // Logout
  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage?.removeItem("ChobegraphyAccess");
      localStorage?.removeItem("userData");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch User Data from Backend
  const fetchUserByEmail = async (email: string) => {
    const token = localStorage.getItem("ChobegraphyAccess");
    if (!token) return;

    try {
      const response = await axios.get(
        `${BaseApiUrl}/get-user?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const localStorageUser = localStorage?.getItem("userData");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
      setLoading(false);
    } else {
      const unSub = onAuthStateChanged(auth, async (currentUser) => {
        setLoading(false);
        if (currentUser) {
          try {
            const { email } = currentUser;
            if (!email) return;
            console.log("Email:", email);
            // Get JWT token from backend
            const { data: token } = await axios.post(
              `${BaseApiUrl}/jwt`,
              { email },
              {
                headers: { "Content-Type": "application/json" },
              }
            );

            localStorage.setItem("ChobegraphyAccess", token);

            // Fetch user data from backend
            await fetchUserByEmail(email);
          } catch (error) {
            console.error("Error fetching JWT token:", error);
          }
        } else {
          localStorage.removeItem("ChobegraphyAccess");
          localStorage.removeItem("userData");
          setUser(null);
        }
      });

      return () => unSub();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        OverAllLanguage,
        setOverAllLanguage,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
