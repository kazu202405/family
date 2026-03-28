"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Building2, Users, User } from "lucide-react";

const tabs = [
  { href: "/chat", icon: MessageSquare, label: "相談" },
  { href: "/consultants", icon: Building2, label: "相談先" },
  { href: "/community", icon: Users, label: "コミュニティ" },
  { href: "/mypage", icon: User, label: "マイページ" },
] as const;

/** アプリページでのみ表示するパス（chatは入力バーと干渉するため除外） */
const appPaths = ["/consultants", "/community", "/mypage", "/result"];

export default function BottomNav() {
  const pathname = usePathname();

  // アプリページ以外では非表示
  const isAppPage = appPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!isAppPage) return null;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? "text-primary" : "text-muted"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <tab.icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span
                className={`text-[10px] leading-none ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
