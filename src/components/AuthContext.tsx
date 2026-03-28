"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type UserProfile = {
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  area: string; // 町域
  // 新規フィールド
  ageGroup?: string;        // "40代" | "50代" | "60代" | "70代以上"
  introduction?: string;    // ひとこと自己紹介（自由記述、100文字程度）
  themes?: string[];        // 気になるテーマ（複数選択）: "見守り", "介護", "施設", "不動産", "相続", "お金"
  role?: string;            // 自分の立場: "離れて暮らす子ども", "同居家族", "近くに住む子ども", "きょうだい", "その他"
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
