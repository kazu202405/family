"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type UserProfile = {
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  area: string; // 町域
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: () => void;
  register: (profile: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = useCallback(() => setIsLoggedIn(true), []);

  const register = useCallback((profile: UserProfile) => {
    setUser(profile);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
