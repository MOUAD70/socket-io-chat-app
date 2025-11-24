import { createContext, useState } from "react";
import { loginUser, registerUser } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (loginInfo) => {
    try {
      const data = await loginUser(loginInfo);
      setUser(data);
      return data;
    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      throw err;
    }
  };

  const handleRegister = async (registerInfo) => {
    try {
      const data = await registerUser(registerInfo);
      setUser(data);
      return data;
    } catch (err) {
      console.log("Sign up Error: ", err.response?.data || err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};
