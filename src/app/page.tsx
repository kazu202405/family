"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

const features = [
  {
    icon: "🤝",
    title: "話を整理する",
    description: "あなたの状況をAIが丁寧に聞き取り、今の悩みを整理します。",
  },
  {
    icon: "🔍",
    title: "緊急度を見る",
    description: "今すぐ動くべきか、少し考えてよいか、状況を判断します。",
  },
  {
    icon: "👣",
    title: "次の一歩を出す",
    description: "具体的に何をすればいいか、1〜3つのアクションを提案します。",
  },
  {
    icon: "🏢",
    title: "相談先を案内する",
    description: "地域包括支援センター、ケアマネなど、適切な窓口の種類をお伝えします。",
  },
];

const themes = [
  "親の見守り不安",
  "介護の入口",
  "施設入居の悩み",
  "実家・空き家",
  "家族との話し合い",
  "相続の入口不安",
];

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // ログイン後は /chat がホーム
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/chat");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return (
    <div className="flex flex-col">
      {/* ヒーロー */}
      <section className="bg-primary-light py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-medium mb-3 text-sm">
            ひとりで抱えない家族相談
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-4 leading-relaxed">
            親のこと、家族のこと、
            <br />
            まず話を整理してみませんか？
          </h1>
          <p className="text-muted leading-relaxed mb-8">
            高齢の親を心配するあなたへ。
            <br />
            AIが状況を整理し、次の一歩と相談先を一緒に見つけます。
          </p>
          <Link
            href="/chat"
            className="inline-block bg-primary text-white font-medium px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-md"
          >
            無料で相談をはじめる
          </Link>
          <p className="text-xs text-muted mt-3">
            ※ 医療診断・法律判断・介護認定の判断は行いません
          </p>
        </div>
      </section>

      {/* 対象者 */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">
            こんなお悩みありませんか？
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {themes.map((theme) => (
              <span
                key={theme}
                className="bg-accent-light text-accent px-4 py-2 rounded-full text-sm font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* できること */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">
            かぞくの窓口ができること
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* やらないこと */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">
            このサービスがやらないこと
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            医療診断 / 法律判断 / 介護認定判断 / 断定的な専門助言 /
            危険案件の抱え込み
          </p>
          <p className="text-xs text-muted mt-2">
            緊急の場合は、適切な外部窓口をご案内します。
          </p>
        </div>
      </section>

      {/* 料金概要 */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">料金</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <p className="text-sm text-muted mb-1">無料プラン</p>
              <p className="text-2xl font-bold text-primary">¥0</p>
              <ul className="text-xs text-muted mt-3 space-y-1 text-left">
                <li>・初回相談整理</li>
                <li>・月数回まで</li>
                <li>・基本案内</li>
              </ul>
            </div>
            <div className="bg-accent-light border border-accent/20 rounded-2xl p-5 text-center">
              <p className="text-sm text-accent mb-1">有料プラン</p>
              <p className="text-2xl font-bold text-accent">準備中</p>
              <ul className="text-xs text-muted mt-3 space-y-1 text-left">
                <li>・履歴保存</li>
                <li>・深掘り整理</li>
                <li>・コミュニティ</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link
              href="/pricing"
              className="text-sm text-primary hover:underline"
            >
              料金の詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-primary-light">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg font-bold mb-2">
            まずは気軽に、話を整理してみませんか？
          </p>
          <p className="text-sm text-muted mb-6">無料・登録不要で始められます</p>
          <Link
            href="/chat"
            className="inline-block bg-primary text-white font-medium px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-md"
          >
            相談をはじめる
          </Link>
        </div>
      </section>
    </div>
  );
}
