// AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const login = (accessToken, user) => {
    setToken(accessToken);
    setIsLoggedIn(true);
    setUsername(user);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
