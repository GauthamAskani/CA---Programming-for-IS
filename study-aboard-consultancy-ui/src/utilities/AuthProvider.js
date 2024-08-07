import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("user");
  console.log("user->", user);
  const [auth, setAuth] = useState({
    token: localStorage.getItem("authToken") || null,
    user: !!user ? JSON.parse(user) : null,
    isAuthenticated: !!localStorage.getItem("authToken"),
  });

  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
