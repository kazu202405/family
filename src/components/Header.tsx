"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Building2,
  BookOpen,
  User,
  Menu,
  X,
  LogIn,
  Home,
  HandHeart,
  ArrowRight,
  CircleDollarSign,
} from "lucide-react";

const publicNav = [
  { href: "/pricing", label: "料金プラン", icon: CircleDollarSign },
];


export default function Header() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロール検知 — ヘッダーの影を動的に
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // シートが開いたらbodyスクロールをロック
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sheetOpen]);

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  // AppHeaderを使うページでは共通ヘッダーを出さない（ルートで判定）
  const appPages = ["/chat", "/consultants", "/community", "/mypage", "/result", "/emergency"];
  const hiddenPages = ["/login", "/register"];
  if (appPages.includes(pathname) || hiddenPages.includes(pathname)) return null;

  const navItems = publicNav;

  return (
    <>
      {/* ─── ヘッダー ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            : "bg-card/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center justify-between">
            {/* ロゴ */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <HandHeart size={15} strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-bold text-foreground tracking-tight">
                  かぞくの窓口
                </span>
                <span className="hidden sm:block text-[10px] text-muted tracking-wide mt-0.5">
                  ひとりで抱えない家族相談
                </span>
              </div>
            </Link>

            {/* ── PCナビ：シンプルなテキストリンク + 下線 ── */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-[13px] rounded-lg transition-colors ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted hover:text-foreground hover:bg-background/60"
                    }`}
                  >
                    {item.label}
                    {/* アクティブ下線 */}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}

              {/* メインCTA */}
              <Link
                href="/login"
                className="ml-2 px-3 py-2 rounded-xl text-[13px] font-medium text-muted hover:text-foreground hover:bg-background/60 transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-primary text-white pl-4 pr-3.5 py-2 rounded-xl text-[13px] font-medium hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.98]"
              >
                新規登録
                <ArrowRight size={13} />
              </Link>
            </nav>

            {/* ── モバイル：ハンバーガー ── */}
            <button
              onClick={() => setSheetOpen(!sheetOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-foreground hover:bg-background/60 transition-colors"
              aria-label={sheetOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {sheetOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── モバイルドロワー（右からスライド） ─── */}
      {sheetOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* オーバーレイ */}
          <div
            className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px] animate-[fadeIn_200ms_ease-out]"
            onClick={closeSheet}
          />
          {/* ドロワー本体 */}
          <div className="absolute top-0 right-0 bottom-0 w-[280px] bg-card shadow-[-8px_0_30px_rgba(0,0,0,0.08)] animate-[slideInRight_280ms_cubic-bezier(0.32,0.72,0,1)] flex flex-col">
            {/* 閉じるボタン */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-border/50">
              <span className="text-[13px] font-semibold text-muted">メニュー</span>
              <button
                onClick={closeSheet}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-background/60 transition-colors"
                aria-label="メニューを閉じる"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {/* ホームリンク */}
              <Link
                href="/"
                onClick={closeSheet}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  pathname === "/"
                    ? "bg-primary-light"
                    : "hover:bg-background/60"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    pathname === "/"
                      ? "bg-primary text-white shadow-sm"
                      : "bg-background text-muted"
                  }`}
                >
                  <Home size={17} />
                </div>
                <span
                  className={`text-[14px] ${
                    pathname === "/"
                      ? "font-semibold text-primary"
                      : "font-medium text-foreground"
                  }`}
                >
                  ホーム
                </span>
              </Link>

              {/* ナビアイテム */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSheet}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                      isActive ? "bg-primary-light" : "hover:bg-background/60"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "bg-background text-muted"
                      }`}
                    >
                      {Icon && <Icon size={17} />}
                    </div>
                    <span
                      className={`text-[14px] ${
                        isActive
                          ? "font-semibold text-primary"
                          : "font-medium text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ドロワー内CTA — 下部に固定 */}
            <div className="px-4 pb-6 pt-3 border-t border-border/40 safe-area-bottom">
              <Link
                href="/register"
                onClick={closeSheet}
                className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-[14px] font-medium hover:bg-primary-hover transition-all active:scale-[0.98] shadow-sm"
              >
                <LogIn size={15} />
                無料で相談をはじめる
              </Link>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
