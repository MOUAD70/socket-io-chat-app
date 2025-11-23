import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [registerInfos, setRegisterInfos] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateRegisterInfos = useCallback((infos) => {
    setRegisterInfos(infos);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfos,
        updateRegisterInfos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
