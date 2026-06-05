import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { getProfile } from "../api/authApi";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {

  const [user,setUser] =
    useState(null);

  const [loading,setLoading] =
    useState(true);

  const login = (
    token,
    role
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "role",
      role
    );

    loadProfile();
  };

  const logout = () => {

    localStorage.clear();

    setUser(null);
  };

  const loadProfile =
    async () => {

      try {

        const res =
          await getProfile();

        setUser(
          res.data
        );

      } catch {

        logout();

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      loadProfile();

    } else {

      setLoading(false);
    }

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>

  );
};

export const useAuth =
  () => useContext(AuthContext);