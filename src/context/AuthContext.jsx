import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      fetchUser();
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }, [token]);

  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await axios.get("https://nt-devconnector.onrender.com/api/auth");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};
