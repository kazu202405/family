"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Menu,
  X,
  Home,
  MessageSquare,
  Building2,
  BookOpen,
  User,
  HandHeart,
} from "lucide-react";

const menuItems = [
  { href: "/chat", icon: MessageSquare, label: "相談する" },
  { href: "/consultants", icon: Building2, label: "相談先一覧" },
  { href: "/stories", icon: BookOpen, label: "体験談" },
  { href: "/mypage", icon: User, label: "マイページ" },
];

type Props = {
  title: string;
  subtitle?: string;
  /** 戻るボタンの遷移先。デフォルトは /chat */
  backHref?: string;
  /** 戻るボタンを非表示にする（chatホーム用） */
  hideBack?: boolean;
};

export default function AppHeader({
  title,
  subtitle,
  backHref = "/chat",
  hideBack = false,
}: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // ドロワーが開いたらbodyスクロールをロック
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="border-b border-border bg-card/80 backdrop-blur-xl shrink-0 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!hideBack && (
              <button
                onClick={() => router.push(backHref)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-background transition-colors"
                aria-label="戻る"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center shadow-sm">
                <HandHeart size={18} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">{title}</p>
                {subtitle && (
                  <p className="text-[11px] text-muted">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-background transition-colors"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* 右からスライドするドロワー */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px] animate-[fadeIn_200ms_ease-out]"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-[280px] bg-card shadow-[-8px_0_30px_rgba(0,0,0,0.08)] animate-[slideInRight_280ms_cubic-bezier(0.32,0.72,0,1)] flex flex-col">
            <div className="flex items-center justify-between px-5 h-14 border-b border-border/50">
              <span className="text-[13px] font-semibold text-muted">
                メニュー
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-background/60 transition-colors"
                aria-label="メニューを閉じる"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-foreground hover:bg-background/60 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-background text-muted flex items-center justify-center">
                    <item.icon size={17} />
                  </div>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
