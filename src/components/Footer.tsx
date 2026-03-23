"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  // ログイン後のページ、チャット、ログイン画面ではフッターを表示しない
  const appPages = ["/chat", "/login", "/register", "/consultants", "/community", "/mypage", "/result", "/emergency"];
  if (appPages.includes(pathname)) return null;

  return (
    <footer className="border-t border-border bg-card py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm font-bold mb-2">サービス</p>
            <ul className="space-y-1">
              <li>
                <Link href="/chat" className="text-xs text-muted hover:text-foreground transition-colors">
                  相談する
                </Link>
              </li>
              <li>
                <Link href="/consultants" className="text-xs text-muted hover:text-foreground transition-colors">
                  相談先一覧
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-xs text-muted hover:text-foreground transition-colors">
                  コミュニティ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold mb-2">ご利用案内</p>
            <ul className="space-y-1">
              <li>
                <Link href="/pricing" className="text-xs text-muted hover:text-foreground transition-colors">
                  料金プラン
                </Link>
              </li>
              <li>
                <span className="text-xs text-muted">利用規約（準備中）</span>
              </li>
              <li>
                <span className="text-xs text-muted">プライバシーポリシー（準備中）</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold mb-2">サポート</p>
            <ul className="space-y-1">
              <li>
                <span className="text-xs text-muted">お問い合わせ（準備中）</span>
              </li>
              <li>
                <span className="text-xs text-muted">よくある質問（準備中）</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold mb-2">運営</p>
            <ul className="space-y-1">
              <li>
                <span className="text-xs text-muted">運営会社（準備中）</span>
              </li>
              <li>
                <span className="text-xs text-muted">運営ポリシー（準備中）</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-4 text-center">
          <p className="text-xs text-muted">© 2026 かぞくの窓口</p>
          <p className="text-xs text-muted mt-1">
            本サービスは医療・法律・介護の専門的判断を行うものではありません。
          </p>
        </div>
      </div>
    </footer>
  );
}
