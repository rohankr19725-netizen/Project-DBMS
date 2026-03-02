import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; phone: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check session on app load
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
  };

  const signup = async (data: { name: string; phone: string; email: string; password: string }) => {
    const res = await axios.post(
      `${API_BASE_URL}/signup`,
      data,
      { withCredentials: true }
    );
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
