import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({
        username: decodedToken.username,
        role: decodedToken.role,
        userId: decodedToken.user_id,
        email: decodedToken.unique_name,
      });
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
