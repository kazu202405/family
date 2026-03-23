"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  MessageCircle,
  Zap,
  Footprints,
  Building2,
  BookOpen,
  Bookmark,
  RefreshCw,
  Home,
  Landmark,
  HeartHandshake,
  Hospital,
  Calculator,
  FileSignature,
  Scale,
  House,
  Phone,
} from "lucide-react";

type ResultData = {
  summary: string;
  mainConcern: string;
  urgency: "低" | "中" | "高";
  nextSteps: string[];
  consultants: string[];
};

const defaultResult: ResultData = {
  summary:
    "離れて暮らす親御さんの生活に変化が見られ、見守りや今後について不安を感じている状況です。",
  mainConcern: "親御さんの日常生活の変化に対して、今どう動けばいいかわからないこと",
  urgency: "中",
  nextSteps: [
    "親御さんの最近の生活状況を具体的に書き出して整理する",
    "ご家族で「今心配なこと」を共有する場を設ける",
    "お住まいの地域の地域包括支援センターに電話で相談する",
  ],
  consultants: ["地域包括支援センター", "ケアマネジャー", "医療ソーシャルワーカー"],
};

function parseResultText(text: string): ResultData {
  const result = { ...defaultResult };
  try {
    const summaryMatch = text.match(/【状況整理】(.+?)(?=【|$)/s);
    if (summaryMatch) result.summary = summaryMatch[1].trim();

    const concernMatch = text.match(/【いちばんの不安】(.+?)(?=【|$)/s);
    if (concernMatch) result.mainConcern = concernMatch[1].trim();

    const urgencyMatch = text.match(/【緊急度】\s*(低|中|高)/);
    if (urgencyMatch) result.urgency = urgencyMatch[1] as "低" | "中" | "高";

    const stepsMatch = text.match(/【次の一歩】(.+?)(?=【|$)/s);
    if (stepsMatch) {
      const steps = stepsMatch[1]
        .split(/\n/)
        .map((s) => s.replace(/^[\s・\-\d.]+/, "").trim())
        .filter((s) => s.length > 0);
      if (steps.length > 0) result.nextSteps = steps;
    }

    const consultMatch = text.match(/【相談先】(.+?)(?=---|$)/s);
    if (consultMatch) {
      const consults = consultMatch[1]
        .split(/[、,\/\n]/)
        .map((s) => s.replace(/^[\s・\-]+/, "").trim())
        .filter((s) => s.length > 0);
      if (consults.length > 0) result.consultants = consults;
    }
  } catch {
    // パース失敗時はデフォルトを返す
  }
  return result;
}

const consultantInfo: Record<
  string,
  { icon: typeof Landmark; description: string }
> = {
  地域包括支援センター: {
    icon: Landmark,
    description:
      "高齢者の暮らし全般の相談窓口。介護・福祉・健康のことをまとめて相談できます。",
  },
  ケアマネジャー: {
    icon: HeartHandshake,
    description:
      "介護サービスの計画を立ててくれる専門職。介護認定後に担当がつきます。",
  },
  医療ソーシャルワーカー: {
    icon: Hospital,
    description:
      "病院内で、退院後の生活や福祉制度の利用について相談できます。",
  },
  税理士: {
    icon: Calculator,
    description: "相続税の計算や申告、節税対策について相談できます。",
  },
  司法書士: {
    icon: FileSignature,
    description:
      "不動産の名義変更や遺言書の作成、成年後見制度について相談できます。",
  },
  弁護士: {
    icon: Scale,
    description: "相続トラブルや法的な問題について相談できます。",
  },
  不動産会社: {
    icon: House,
    description: "実家の売却、管理、活用について相談できます。",
  },
};

const urgencyConfig = {
  低: {
    bg: "bg-primary-light",
    border: "border-primary/20",
    text: "text-primary",
    label: "低",
    sublabel: "すぐの対応は不要です",
  },
  中: {
    bg: "bg-accent-light",
    border: "border-accent/20",
    text: "text-accent",
    label: "中",
    sublabel: "早めの準備をおすすめします",
  },
  高: {
    bg: "bg-danger-light",
    border: "border-danger/20",
    text: "text-danger",
    label: "高",
    sublabel: "早急な対応が望ましいです",
  },
};

export default function ResultPage() {
  const [resultData, setResultData] = useState<ResultData>(defaultResult);

  useEffect(() => {
    const stored = sessionStorage.getItem("resultText");
    if (stored) {
      setResultData(parseResultText(stored));
    }
  }, []);

  const urgency = urgencyConfig[resultData.urgency];

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* 結果コンテンツ */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* タイトル */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/chat"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-lg font-bold">相談の整理結果</h1>
          </div>

          <div className="space-y-4">
            {/* 緊急度バー */}
            <section
              className={`${urgency.bg} border ${urgency.border} rounded-xl p-4 flex items-center gap-4`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${urgency.text} bg-white/60 flex items-center justify-center`}
              >
                <Zap size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted font-medium">緊急度</p>
                  <span
                    className={`text-sm font-bold ${urgency.text} px-2 py-0.5 rounded-md bg-white/60`}
                  >
                    {urgency.label}
                  </span>
                </div>
                <p className="text-sm mt-0.5">{urgency.sublabel}</p>
              </div>
            </section>

            {/* 状況整理 */}
            <section className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <ClipboardList size={15} />
                </div>
                <h2 className="text-sm font-bold">今の状況整理</h2>
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {resultData.summary}
              </p>
            </section>

            {/* いちばん気になっていること */}
            <section className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-accent-light text-accent flex items-center justify-center">
                  <MessageCircle size={15} />
                </div>
                <h2 className="text-sm font-bold">いちばん気になっていること</h2>
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {resultData.mainConcern}
              </p>
            </section>

            {/* 次の一歩 */}
            <section className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Footprints size={15} />
                </div>
                <h2 className="text-sm font-bold">次の一歩</h2>
              </div>
              <ol className="space-y-3">
                {resultData.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/85">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* 相談先の種類 */}
            <section className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Building2 size={15} />
                </div>
                <h2 className="text-sm font-bold">相談先の種類</h2>
              </div>
              <div className="space-y-2">
                {resultData.consultants.map((name) => {
                  const defaultInfo = {
                    icon: Phone,
                    description: `${name}に相談できます。`,
                  };
                  const info = consultantInfo[name] || defaultInfo;
                  const Icon = info.icon;
                  return (
                    <div
                      key={name}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-card-hover transition-all cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-background text-muted group-hover:text-primary group-hover:bg-primary-light flex items-center justify-center shrink-0 transition-colors">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-0.5">{name}</p>
                        <p className="text-xs text-muted leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 体験つぶやき導線 */}
            <Link
              href="/community"
              className="block bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    同じ悩みを持つ家族の声を見る
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    体験つぶやきやQ&Aで参考にできます
                  </p>
                </div>
                <span className="text-muted text-sm">→</span>
              </div>
            </Link>

            {/* 保存導線 */}
            <div className="bg-accent-light border border-accent/15 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/60 text-accent flex items-center justify-center">
                  <Bookmark size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">この結果を保存する</p>
                  <p className="text-xs text-muted mt-0.5">
                    有料プランで履歴保存・深掘り整理が可能です
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="text-xs text-accent font-medium bg-white rounded-full px-3 py-1.5 hover:bg-white/80 transition-colors"
                >
                  詳細
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フッターアクション */}
      <div className="border-t border-border bg-card shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
          <Link
            href="/chat"
            className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium hover:bg-background transition-colors"
          >
            <RefreshCw size={14} />
            もう一度相談
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Home size={14} />
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
