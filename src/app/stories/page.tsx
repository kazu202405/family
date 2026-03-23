"use client";

import Link from "next/link";
import AppHeader from "@/components/AppHeader";

const stories = [
  {
    id: 1,
    theme: "親の見守り",
    tag: "見守り",
    title: "離れて暮らす母の物忘れが増えて、最初に何をしたか",
    summary:
      "週1回の電話で違和感を覚え、地域包括支援センターに相談。見守りサービスの存在を知り、まず週1回の訪問を依頼しました。",
    age: "50代女性",
  },
  {
    id: 2,
    theme: "介護の入口",
    tag: "介護",
    title: "父が転倒して入院。退院後の生活をどう組み立てたか",
    summary:
      "病院のソーシャルワーカーに相談したことで、介護認定の申請からケアマネ紹介まで一気に進みました。自分だけで悩んでいた時間がもったいなかったです。",
    age: "40代男性",
  },
  {
    id: 3,
    theme: "施設入居",
    tag: "施設",
    title: "母の施設入居を決断するまでの葛藤と、決めてよかったこと",
    summary:
      "罪悪感がありましたが、ケアマネさんに「ご本人の安全が最優先」と言われて決断。今では母も穏やかに過ごしています。",
    age: "50代女性",
  },
  {
    id: 4,
    theme: "実家・空き家",
    tag: "空き家",
    title: "実家が空き家に。売却か管理か、迷った末にとった行動",
    summary:
      "まず自治体の空き家相談窓口に行きました。選択肢を整理してもらい、最終的に地元の不動産会社と管理契約を結びました。",
    age: "60代男性",
  },
  {
    id: 5,
    theme: "家族の話し合い",
    tag: "家族会議",
    title: "兄弟で親の介護を話し合えなかった。きっかけは「紙に書いたこと」",
    summary:
      "口で言うと感情的になるので、心配なことと希望を紙に書き出して共有。それだけで「ちゃんと話そう」という雰囲気になりました。",
    age: "40代女性",
  },
  {
    id: 6,
    theme: "相続の不安",
    tag: "相続",
    title: "相続のことが気になりだしたけど、何から手をつければいいかわからなかった",
    summary:
      "まず無料の税理士相談会に行きました。「今の段階でやっておくこと」が明確になり、漠然とした不安が減りました。",
    age: "50代男性",
  },
];

const qaItems = [
  {
    question: "親に介護の話を切り出すタイミングがわかりません",
    answer:
      "体調の変化や通院のタイミングなど、自然な流れで「最近どう？」から始めるのがおすすめです。いきなり「介護」という言葉を出さなくても大丈夫です。",
    tag: "介護",
  },
  {
    question: "地域包括支援センターに相談するのにお金はかかりますか？",
    answer:
      "無料です。お住まいの地域の地域包括支援センターに電話や来所で相談できます。本人でなくても、ご家族からの相談も受け付けています。",
    tag: "相談先",
  },
  {
    question: "兄弟で介護の負担が偏っています。どうしたらいいですか？",
    answer:
      "まずは現状の負担を「見える化」することが大切です。何を誰がやっているかを書き出し、家族で共有するところから始めてみてください。",
    tag: "家族会議",
  },
];

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <AppHeader title="体験談・Q&A" subtitle="ご家族の声" />

      <div className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">体験談・Q&A</h1>
            <p className="text-sm text-muted">
              同じ悩みを持つご家族がどう動いたか、参考にしてみてください。
            </p>
          </div>

          {/* 体験談 */}
          <section className="mb-12">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>📖</span> 体験談
            </h2>
            <div className="space-y-4">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                      {story.tag}
                    </span>
                    <span className="text-xs text-muted">{story.age}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">{story.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {story.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Q&A */}
          <section className="mb-12">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>❓</span> よくある質問
            </h2>
            <div className="space-y-3">
              {qaItems.map((qa, i) => (
                <details
                  key={i}
                  className="bg-card border border-border rounded-2xl overflow-hidden group"
                >
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-background transition-colors list-none">
                    <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded-full shrink-0">
                      {qa.tag}
                    </span>
                    <p className="text-sm font-medium flex-1">{qa.question}</p>
                    <span className="text-muted text-sm group-open:rotate-90 transition-transform">
                      ▶
                    </span>
                  </summary>
                  <div className="px-4 pb-4 border-t border-border pt-3">
                    <p className="text-sm text-muted leading-relaxed">
                      {qa.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* コミュニティ導線 */}
          <section className="bg-primary-light rounded-2xl p-6 text-center mb-8">
            <p className="font-bold mb-2">限定コミュニティ（準備中）</p>
            <p className="text-sm text-muted mb-1">
              有料会員限定で、テーマ別の投稿コミュニティを準備しています。
            </p>
            <p className="text-xs text-muted">
              同じ立場のご家族と、安全な場所で情報交換ができます。
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-muted mb-4">
              あなたの状況も整理してみませんか？
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
