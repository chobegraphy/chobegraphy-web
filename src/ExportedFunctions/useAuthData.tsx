import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const useAuthData = () => {
  const authData = useContext(AuthContext);
  return authData;
};

export default useAuthData;
