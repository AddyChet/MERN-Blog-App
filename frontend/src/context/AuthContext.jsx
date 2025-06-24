import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosInstance.get("/users/me");
        const user = res.data?.data;
        setUser(user);
      } catch (error) {
        // console.log("error in fetching user");
        // console.error(
        //   "Failed to fetch user:",
        //   error.response?.data || error.message
        // );
        setUser(null); // Clear user if request fails
      }
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  const signup = async (userData) => {
    setIsSigningIn(true);
    try {
      await axiosInstance.post("/users/signup", userData);

      toast.success("Signed Up Succesfully");
      navigate("/login");
    } catch (error) {
      error.response.data.error.map((e) => toast.error(e));
    }
    setIsSigningIn(false);
  };

  const login = async (userData) => {
    setIsLoggingIn(true);
    try {
      await axiosInstance.post("/users/login", userData);

      const res = await axiosInstance.get("/users/me");

      const user = res.data?.data;
      setUser(user);

      toast.success("Logged in Succesfully");

      navigate("/");
    } catch (error) {
      if (error.response.data.error) {
        error.response.data.error.map((e) => toast.error(e));
      } else {
        toast.error(error.response.data.message);
      }
    }
    setIsLoggingIn(false);
  };

  const logout = async () => {
    try {
      await axiosInstance.get("/users/logout");
      setUser(null);
      toast.success("Logged out Succesfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signup,
        isSigningIn,
        isLoggingIn,
        login,
        loading,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
