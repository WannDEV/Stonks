import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

import api from "../../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("unassigned");

  useEffect(() => {
    async function loadUserFromCookies() {
      const accessToken = Cookies.get("accessToken");
      if (!!accessToken && user == null) {
        console.log("useEffect");
        const { data: user } = await api.get("oauth/users/me");
        console.log(user);
        if (user) {
          setRole(user["role"]);
          setUser(user);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setRole("unassigned");
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (user) => {
    if (user["role"] != "unassigned") setRole(user["role"]);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    try {
      Cookies.remove("accessToken");
      setUser(null);
      setIsAuthenticated(false);
      setRole("unassigned");
      api({
        method: "POST",
        url: "oauth/google/logout",
      });
      Router.push("/logged-out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
