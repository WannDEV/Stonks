import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

import api from "../../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("unassigned");
  const [selectedGame, setSelectedGame] = useState("");
  const [loadingSelectedGame, setLoadingSelectedGame] = useState(true);

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

  const updateSelectedGameToFirstGame = async () => {
    setLoadingSelectedGame(true);
    if (selectedGame == "" && isAuthenticated) {
      await api
        .get("game/get_first_game")
        .then((response) => {
          if (response.statusCode == 200 || response.status == 200) {
            if (response.data) {
              setSelectedGame(response.data.currentGame);
            }
          }
          setLoadingSelectedGame(false);
        })
        .catch((err) => setLoadingSelectedGame(false));
    }
  };

  useEffect(() => {
    updateSelectedGameToFirstGame();
  }, [isAuthenticated, selectedGame]);

  const login = async (user) => {
    if (user["role"] != "unassigned") setRole(user["role"]);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      Cookies.remove("accessToken");
      setUser(null);
      setIsAuthenticated(false);
      setRole("unassigned");
      setSelectedGame("");
      await api({
        method: "POST",
        url: "oauth/google/logout",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setBalance = (balance) => {
    // setUser({ ...user, amount: balance });
  };

  const changeSelectedGame = (gameId) => {
    setSelectedGame(gameId);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        role,
        login,
        logout,
        setBalance,
        selectedGame,
        changeSelectedGame,
        updateSelectedGameToFirstGame,
        loadingSelectedGame,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
