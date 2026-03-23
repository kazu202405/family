"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import AppHeader from "@/components/AppHeader";
import { MessageSquare, Clock } from "lucide-react";

type HistoryItem = {
  id: number;
  date: string;
  category: string;
  categoryLabel: string;
  summary: string;
  userName: string;
};

// カテゴリ別のカラー（8カテゴリ）
const categoryColors: Record<string, string> = {
  mimamori: "bg-blue-50 text-blue-600",
  iryou: "bg-teal-50 text-teal-600",
  kaigo: "bg-primary-light text-primary",
  shisetsu: "bg-purple-50 text-purple-600",
  akiya: "bg-amber-50 text-amber-600",
  souzoku: "bg-orange-50 text-orange-600",
  okane: "bg-emerald-50 text-emerald-600",
  sougi: "bg-slate-100 text-slate-600",
};

export default function MyPage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // sessionStorageから履歴を読み込む
  useEffect(() => {
    const stored = sessionStorage.getItem("chatHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {isLoggedIn && <AppHeader title="マイページ" subtitle="履歴・設定" />}

      <div className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* ユーザー情報 */}
          <section className="bg-card border border-border rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <p className="font-bold">{user?.name || "ゲストユーザー"}</p>
                <p className="text-xs text-muted">
                  {user ? `${user.prefecture}${user.city} · 無料プラン` : "無料プラン"}
                </p>
              </div>
              <span className="text-xs bg-primary-light text-primary px-3 py-1 rounded-full">
                無料
              </span>
            </div>
          </section>

          {/* メニュー */}
          <section className="grid grid-cols-2 gap-3 mb-8">
            <Link
              href="/chat"
              className="bg-card border border-border rounded-2xl p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-2xl">💬</span>
              <p className="text-sm font-medium mt-2">新しい相談</p>
            </Link>
            <Link
              href="/consultants"
              className="bg-card border border-border rounded-2xl p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-2xl">🏢</span>
              <p className="text-sm font-medium mt-2">相談先一覧</p>
            </Link>
            <Link
              href="/community"
              className="bg-card border border-border rounded-2xl p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-2xl">📖</span>
              <p className="text-sm font-medium mt-2">コミュニティ</p>
            </Link>
            <Link
              href="/pricing"
              className="bg-card border border-border rounded-2xl p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-2xl">💰</span>
              <p className="text-sm font-medium mt-2">プラン変更</p>
            </Link>
          </section>

          {/* 相談履歴 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>📋</span> 相談履歴
              </h2>
              <span className="text-xs text-muted">
                {history.length > 0
                  ? `${history.length}件`
                  : "※有料プランで保存可能"}
              </span>
            </div>

            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-2xl p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock size={11} />
                        {item.date}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          categoryColors[item.category] || "bg-primary-light text-primary"
                        }`}
                      >
                        {item.categoryLabel}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <MessageSquare size={24} className="text-muted mx-auto mb-3" />
                <p className="text-sm text-muted mb-1">相談履歴はまだありません</p>
                <p className="text-xs text-muted">
                  相談を完了すると、ここにカテゴリ別で表示されます
                </p>
              </div>
            )}
          </section>

          {/* 有料プラン誘導 */}
          <section className="bg-accent-light rounded-2xl p-6 text-center mb-8">
            <p className="font-bold mb-2">有料プランにアップグレード</p>
            <p className="text-sm text-muted mb-4">
              履歴保存・深掘り整理・継続相談・コミュニティ投稿が使えるようになります
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              プランを見る
            </Link>
          </section>

          {/* 設定 */}
          <section>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>⚙️</span> 設定
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between px-5 py-4 text-sm hover:bg-background transition-colors border-b border-border">
                <span>通知設定</span>
                <span className="text-muted">準備中</span>
              </button>
              <button className="w-full flex items-center justify-between px-5 py-4 text-sm hover:bg-background transition-colors border-b border-border">
                <span>メールアドレス変更</span>
                <span className="text-muted">準備中</span>
              </button>
              <button className="w-full flex items-center justify-between px-5 py-4 text-sm hover:bg-background transition-colors border-b border-border">
                <span>パスワード変更</span>
                <span className="text-muted">準備中</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-5 py-4 text-sm text-danger hover:bg-danger-light transition-colors"
              >
                <span>ログアウト</span>
                <span>→</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
