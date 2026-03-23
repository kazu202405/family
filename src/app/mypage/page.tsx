"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import AppHeader from "@/components/AppHeader";

// モック用の相談履歴データ
const mockHistory = [
  {
    id: 1,
    date: "2026年3月20日",
    theme: "親の見守り",
    summary: "離れて暮らす母の物忘れが増えている件。地域包括支援センターへの相談を推奨。",
    urgency: "中",
  },
  {
    id: 2,
    date: "2026年3月15日",
    theme: "実家・空き家",
    summary: "実家の管理について。自治体の空き家相談窓口と不動産会社への相談を推奨。",
    urgency: "低",
  },
  {
    id: 3,
    date: "2026年3月10日",
    theme: "家族の話し合い",
    summary: "兄弟間での介護負担の偏り。役割分担の見える化と家族会議の開催を推奨。",
    urgency: "中",
  },
];

const urgencyBadge = {
  低: "bg-primary-light text-primary",
  中: "bg-accent-light text-accent",
  高: "bg-danger-light text-danger",
};

export default function MyPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <AppHeader title="マイページ" subtitle="履歴・設定" />

      <div className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* ユーザー情報 */}
          <section className="bg-card border border-border rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <p className="font-bold">ゲストユーザー</p>
                <p className="text-xs text-muted">無料プラン</p>
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
              href="/stories"
              className="bg-card border border-border rounded-2xl p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-2xl">📖</span>
              <p className="text-sm font-medium mt-2">体験談</p>
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
                ※有料プランで保存可能
              </span>
            </div>

            <div className="space-y-3">
              {mockHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl p-4 hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted">{item.date}</span>
                    <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                      {item.theme}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        urgencyBadge[item.urgency as keyof typeof urgencyBadge]
                      }`}
                    >
                      緊急度：{item.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
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
