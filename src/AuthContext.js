// AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [id, setUserID] = useState(null);

  const login = (accessToken, user) => {
    console.log(user);
    setToken(accessToken);
    setIsLoggedIn(true);
    setUsername(user.username);
    setUserID(user.id);
    console.log(user.id);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUsername("");
    setUserID(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, username, id, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
