"use client";

import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/components/AuthContext";
import { MapPin, ExternalLink } from "lucide-react";

const categories = [
  {
    name: "地域包括支援センター",
    icon: "🏛️",
    description:
      "高齢者の暮らし全般について相談できる、地域の総合窓口です。介護・福祉・健康・権利擁護など幅広くサポートしてくれます。",
    when: "親の暮らしが心配になったとき、まず最初に相談する場所。介護の入口として最適です。",
    howToFind: "お住まいの市区町村の窓口や、「地域包括支援センター ○○市」で検索",
    tags: ["見守り", "介護", "認知症", "権利擁護"],
  },
  {
    name: "ケアマネジャー",
    icon: "👩‍⚕️",
    description:
      "介護保険サービスの計画（ケアプラン）を作成し、サービス事業者との調整をしてくれる専門職です。",
    when: "介護認定を受けた後、具体的なサービス利用を始めるとき。認定前でも地域包括経由で相談可能。",
    howToFind: "地域包括支援センターに相談すると紹介してもらえます",
    tags: ["介護", "ケアプラン", "サービス調整"],
  },
  {
    name: "医療ソーシャルワーカー",
    icon: "🏥",
    description:
      "病院内にいる相談員で、退院後の生活設計や福祉制度の利用、転院先の調整などをサポートします。",
    when: "入院中や退院が近い親の今後について相談したいとき。",
    howToFind: "入院先の病院の「相談室」「地域連携室」に問い合わせ",
    tags: ["入院", "退院", "福祉制度"],
  },
  {
    name: "老人ホーム・高齢者住宅相談",
    icon: "🏠",
    description:
      "特別養護老人ホーム、有料老人ホーム、サービス付き高齢者向け住宅など、施設入居について相談できます。",
    when: "自宅での生活が難しくなってきたとき、施設を検討し始めたとき。",
    howToFind: "地域包括支援センター、または各施設の相談窓口に問い合わせ",
    tags: ["施設入居", "住み替え", "介護施設"],
  },
  {
    name: "不動産会社",
    icon: "🏡",
    description:
      "実家の売却、賃貸、管理、空き家対策など、不動産に関する相談ができます。",
    when: "実家を空き家にしたくない、売却や管理を考え始めたとき。",
    howToFind: "地元の不動産会社や、空き家バンク、自治体の空き家相談窓口",
    tags: ["実家", "空き家", "売却", "管理"],
  },
  {
    name: "税理士",
    icon: "📊",
    description:
      "相続税の計算、申告手続き、生前贈与の相談、節税対策などをサポートします。",
    when: "相続税がかかるかもしれない、贈与について考え始めたとき。",
    howToFind: "税理士会の無料相談会、または「相続 税理士 ○○市」で検索",
    tags: ["相続", "税金", "贈与"],
  },
  {
    name: "司法書士",
    icon: "📝",
    description:
      "不動産の名義変更（相続登記）、遺言書の作成、成年後見制度の申し立てなどをサポートします。",
    when: "不動産の名義を変えたい、遺言書を作りたい、後見制度を使いたいとき。",
    howToFind: "司法書士会の無料相談会、または「相続 司法書士 ○○市」で検索",
    tags: ["相続", "登記", "遺言", "後見"],
  },
  {
    name: "弁護士",
    icon: "⚖️",
    description:
      "相続トラブル、遺産分割の紛争、成年後見の申立て、家族間の法的問題について相談できます。",
    when: "家族間で相続の話がまとまらない、法的な判断が必要なとき。",
    howToFind: "弁護士会の法律相談窓口（初回30分無料の場合あり）、法テラス",
    tags: ["相続", "紛争", "法律"],
  },
];

export default function ConsultantsPage() {
  const { isLoggedIn, user } = useAuth();

  // ユーザーの地域に基づく検索URLを生成
  const areaLabel = user ? `${user.prefecture}${user.city}` : null;
  const areaSearchLinks = user
    ? [
        {
          label: "地域包括支援センター",
          url: `https://www.google.com/search?q=${encodeURIComponent(`地域包括支援センター ${user.city}`)}`,
        },
        {
          label: "市区町村の高齢者福祉窓口",
          url: `https://www.google.com/search?q=${encodeURIComponent(`${user.city} 高齢者 福祉 相談窓口`)}`,
        },
        {
          label: "空き家相談窓口",
          url: `https://www.google.com/search?q=${encodeURIComponent(`${user.city} 空き家 相談`)}`,
        },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {isLoggedIn && (
        <AppHeader title="相談先一覧" subtitle={areaLabel ? `${areaLabel}エリア` : "窓口カテゴリ"} hideBack />
      )}

      <div className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* エリアカード（登録ユーザーのみ） */}
          {user && (
            <section className="mb-8 bg-gradient-to-br from-primary-light to-card border border-primary/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-primary" />
                <h2 className="font-bold text-primary">
                  {areaLabel}の相談窓口
                </h2>
              </div>
              <p className="text-xs text-muted mb-4">
                {user.name}さんのお住まいの地域で利用できる窓口です
              </p>
              <div className="space-y-2">
                {areaSearchLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-card rounded-xl px-4 py-3 text-sm font-medium hover:border-primary border border-border transition-colors group"
                  >
                    <span className="group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <ExternalLink size={14} className="text-muted group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-muted mt-3">
                ※ Google検索結果へのリンクです。実際の窓口情報は各自治体にご確認ください
              </p>
            </section>
          )}

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">相談先カテゴリ一覧</h1>
            <p className="text-sm text-muted">
              お悩みに応じて、どの種類の窓口に相談すればよいかをご案内します。
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {categories.map((cat) => (
              <details
                key={cat.name}
                className="bg-card border border-border rounded-2xl overflow-hidden group"
              >
                <summary className="flex items-center gap-4 p-5 cursor-pointer hover:bg-background transition-colors list-none">
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="flex-1">
                    <h2 className="font-bold">{cat.name}</h2>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-muted text-sm group-open:rotate-90 transition-transform">
                    ▶
                  </span>
                </summary>
                <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-muted mb-1">概要</p>
                    <p className="text-sm leading-relaxed">{cat.description}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted mb-1">
                      こんなときに相談
                    </p>
                    <p className="text-sm leading-relaxed">{cat.when}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted mb-1">
                      見つけ方
                    </p>
                    <p className="text-sm leading-relaxed">{cat.howToFind}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="bg-primary-light rounded-2xl p-6 text-center">
            <p className="font-bold mb-2">
              どこに相談すればいいかわからない場合は
            </p>
            <p className="text-sm text-muted mb-4">
              AIが状況を整理して、適切な相談先をご案内します
            </p>
            <Link
              href="/chat"
              className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              相談をはじめる
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
