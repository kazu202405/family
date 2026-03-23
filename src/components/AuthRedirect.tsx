"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

// ログイン済みユーザーを /chat にリダイレクトする
export default function AuthRedirect() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/chat");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return null;
}
