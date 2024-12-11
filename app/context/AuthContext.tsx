"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = Cookies.get("token");
    return !!token;
  });

  const [user, setUser] = useState<{ id: string; email: string } | null>(() => {

    const token = Cookies.get("token");
    
    if (token) {

      try {
        const decoded: any = jwtDecode(token);
        return { id: decoded.id, email: decoded.email };

      } catch {
        return null;
      
      }

    }

    return null;
  
  });

  const login = (token: string) => {

    Cookies.set("token", token, { expires: 1, path: "/"});
    setIsAuthenticated(true);
    
    try {
      const decoded: any = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email });

    } catch {
      setUser(null);
    
    }

  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
