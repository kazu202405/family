"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    router.push("/chat");
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* ヘッダー */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <span className="text-lg font-bold text-foreground">
            かぞくの窓口
          </span>
        </div>
      </header>

      {/* ログインフォーム */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h1 className="text-xl font-bold text-center mb-6">ログイン</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">
                  パスワード
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full mt-6 bg-primary text-white font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              ログイン
            </button>

            <p className="text-xs text-muted text-center mt-4">
              ※ モック版のため入力不要でログインできます
            </p>

            <div className="text-center mt-4">
              <Link
                href="/register"
                className="text-xs text-primary hover:underline font-medium"
              >
                はじめての方は新規登録 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
