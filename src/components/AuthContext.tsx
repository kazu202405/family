"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type UserProfile = {
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  area: string; // 町域
};

type AuthContextType = {
  isLoggedIn: boolean;
  isReady: boolean;
  user: UserProfile | null;
  login: () => void;
  register: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isReady: false,
  user: null,
  login: () => {},
  register: () => {},
  updateProfile: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 初回マウント時にsessionStorageから復元
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setIsLoggedIn(parsed.isLoggedIn || false);
        setUser(parsed.user || null);
      } catch {
        // パース失敗時は無視
      }
    }
    setIsReady(true);
  }, []);

  // 状態変更時にsessionStorageに保存
  useEffect(() => {
    if (!isReady) return;
    sessionStorage.setItem("auth", JSON.stringify({ isLoggedIn, user }));
  }, [isLoggedIn, user, isReady]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const register = useCallback((profile: UserProfile) => {
    setUser(profile);
    setIsLoggedIn(true);
  }, []);

  const updateProfile = useCallback((profile: UserProfile) => {
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("chatHistory");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, user, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
