import Link from "next/link";

const plans = [
  {
    name: "無料プラン",
    price: "¥0",
    priceNote: "ずっと無料",
    highlight: false,
    features: [
      { text: "初回相談整理", included: true },
      { text: "月3回まで相談", included: true },
      { text: "基本的な相談先案内", included: true },
      { text: "緊急時の外部窓口案内", included: true },
      { text: "一部体験つぶやきの閲覧", included: true },
      { text: "相談履歴の保存", included: false },
      { text: "深掘り整理", included: false },
      { text: "継続相談", included: false },
      { text: "コミュニティ投稿", included: false },
      { text: "テンプレート・まとめ", included: false },
    ],
  },
  {
    name: "スタンダードプラン",
    price: "¥980",
    priceNote: "/ 月（税込）",
    highlight: true,
    features: [
      { text: "初回相談整理", included: true },
      { text: "無制限の相談", included: true },
      { text: "詳細な相談先案内", included: true },
      { text: "緊急時の外部窓口案内", included: true },
      { text: "すべての体験つぶやきの閲覧", included: true },
      { text: "相談履歴の保存", included: true },
      { text: "深掘り整理", included: true },
      { text: "継続相談", included: true },
      { text: "コミュニティ投稿", included: true },
      { text: "テンプレート・まとめ", included: true },
    ],
  },
];

const faqs = [
  {
    q: "無料プランだけでも使えますか？",
    a: "はい。月3回まで無料で相談整理をご利用いただけます。まずは無料プランでお試しください。",
  },
  {
    q: "有料プランはいつでも解約できますか？",
    a: "はい。いつでも解約可能で、解約月の末日まで利用できます。解約手続きはマイページから行えます。",
  },
  {
    q: "支払い方法は？",
    a: "クレジットカード決済を予定しています（サービス開始時に詳細をお知らせします）。",
  },
  {
    q: "相談内容は保存されますか？",
    a: "無料プランでは保存されません。有料プランでは相談履歴が自動保存され、いつでも振り返ることができます。",
  },
];

export default function PricingPage() {
  return (
    <div className="px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">料金プラン</h1>
          <p className="text-sm text-muted">
            まずは無料で。必要に応じて有料プランをご検討ください。
          </p>
        </div>

        {/* プランカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.highlight
                  ? "bg-card border-2 border-primary shadow-lg"
                  : "bg-card border border-border"
              }`}
            >
              {plan.highlight && (
                <p className="text-xs bg-primary text-white inline-block px-3 py-1 rounded-full mb-3">
                  おすすめ
                </p>
              )}
              <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className={`text-3xl font-bold ${
                    plan.highlight ? "text-primary" : ""
                  }`}
                >
                  {plan.price}
                </span>
                <span className="text-sm text-muted">{plan.priceNote}</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <span className="text-primary">✓</span>
                    ) : (
                      <span className="text-border">—</span>
                    )}
                    <span className={f.included ? "" : "text-muted"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full text-sm font-medium transition-opacity ${
                  plan.highlight
                    ? "bg-primary text-white hover:opacity-90"
                    : "border border-border hover:bg-background"
                }`}
              >
                {plan.highlight ? "準備中" : "無料で始める"}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4 text-center">よくある質問</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden group"
              >
                <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-background transition-colors list-none">
                  <span className="text-primary font-bold">Q</span>
                  <p className="text-sm font-medium flex-1">{faq.q}</p>
                  <span className="text-muted text-sm group-open:rotate-90 transition-transform">
                    ▶
                  </span>
                </summary>
                <div className="px-4 pb-4 border-t border-border pt-3">
                  <p className="text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary-light rounded-2xl p-6 text-center">
          <p className="font-bold mb-2">まずは無料で試してみませんか？</p>
          <p className="text-sm text-muted mb-4">
            登録不要で、今すぐ相談整理を体験できます
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
  );
}
