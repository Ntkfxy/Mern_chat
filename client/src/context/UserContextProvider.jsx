import { useState, useEffect } from "react";
import { UserContext } from "./UserContext.jsx";
import TokenService from "../service/token.service.js";

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUser);

  const logIn = (user) => setUserInfo(user);

  const logout = () => {
    setUserInfo(null);
    TokenService.removeUser();
  };

  function getUser() {
    const saveUser = TokenService.getUser() || null;
    return saveUser;
  }

  useEffect(() => {
    TokenService.setUser(userInfo);
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, logIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};