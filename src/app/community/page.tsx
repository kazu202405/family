"use client";

import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/components/AuthContext";
import { MessageSquare, Heart, Clock } from "lucide-react";

// コミュニティ投稿のモックデータ
const communityPosts = [
  {
    id: 1,
    author: "Aさん",
    age: "50代",
    theme: "見守り",
    timeAgo: "2時間前",
    title: "遠方の母に見守りカメラを導入した話",
    body: "最初は嫌がっていた母ですが、「孫の顔が見たい」と言ってテレビ電話機能付きにしたら喜んで使ってくれるようになりました。見守り＝監視じゃないよ、という伝え方が大事でした。",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: "Bさん",
    age: "40代",
    theme: "介護",
    timeAgo: "5時間前",
    title: "ケアマネさんとの初回面談で聞いておけばよかったこと",
    body: "初回面談でぼんやりした相談をしてしまい、後から聞き直すことが多かったです。事前に「今困っていること」「将来不安なこと」「経済的な見通し」を整理しておくと、ケアプランの質が全然違います。",
    likes: 24,
    comments: 7,
  },
  {
    id: 3,
    author: "Cさん",
    age: "60代",
    theme: "空き家",
    timeAgo: "1日前",
    title: "実家を売るか貸すか、1年迷った末の結論",
    body: "結局、管理費がかさむので売却しました。不動産会社3社に相見積もりを取ったのが正解。価格差が200万円ありました。自治体の空き家相談窓口で紹介してもらった業者が一番よかったです。",
    likes: 31,
    comments: 5,
  },
  {
    id: 4,
    author: "Dさん",
    age: "50代",
    theme: "家族会議",
    timeAgo: "2日前",
    title: "LINEグループで始めた兄弟間の情報共有",
    body: "直接話すと感情的になるので、まずLINEグループを作って「今週の母の様子」を週1で共有するルールにしました。事実ベースで共有するだけで、協力体制が自然にできてきました。",
    likes: 18,
    comments: 4,
  },
  {
    id: 5,
    author: "Eさん",
    age: "40代",
    theme: "相続",
    timeAgo: "3日前",
    title: "税理士の無料相談会に行ってわかったこと",
    body: "相続税がかかるかどうか、自分のケースを具体的に計算してもらえました。結果「今は何もしなくていい」とわかり、漠然とした不安がなくなりました。無料相談会、おすすめです。",
    likes: 15,
    comments: 2,
  },
];

const themes = ["すべて", "見守り", "介護", "空き家", "家族会議", "相続", "施設"];

export default function StoriesPage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {isLoggedIn && <AppHeader title="みんなの体験談" subtitle="コミュニティ" />}

      <div className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">みんなの体験談</h1>
            <p className="text-sm text-muted">
              同じ立場のご家族の知恵と経験を共有する場です
            </p>
          </div>

          {/* テーマフィルター */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 scrollbar-none">
            {themes.map((theme, i) => (
              <button
                key={theme}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

          {/* 投稿一覧 */}
          <div className="space-y-4 mb-8">
            {communityPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors"
              >
                {/* ヘッダー */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-xs font-bold text-primary">
                    {post.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{post.author}（{post.age}）</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full">
                        {post.theme}
                      </span>
                      <span className="text-[10px] text-muted flex items-center gap-0.5">
                        <Clock size={10} />
                        {post.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 本文 */}
                <h3 className="font-bold text-sm mb-2">{post.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-3">
                  {post.body}
                </p>

                {/* アクション */}
                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                  <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
                    <Heart size={14} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
                    <MessageSquare size={14} />
                    {post.comments}件のコメント
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* 投稿CTA */}
          <div className="bg-primary-light rounded-2xl p-6 text-center mb-8">
            <p className="font-bold mb-2">あなたの経験も共有しませんか？</p>
            <p className="text-sm text-muted mb-4">
              有料プランで投稿・コメントが可能になります
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-full text-sm hover:bg-primary-hover transition-all"
            >
              プランを見る
            </Link>
          </div>

          {/* よくある質問 */}
          <section>
            <h2 className="text-lg font-bold mb-4">よくある質問</h2>
            <div className="space-y-3">
              {[
                {
                  q: "親に介護の話を切り出すタイミングがわかりません",
                  a: "体調の変化や通院のタイミングなど、自然な流れで「最近どう？」から始めるのがおすすめです。",
                  tag: "介護",
                },
                {
                  q: "地域包括支援センターに相談するのにお金はかかりますか？",
                  a: "無料です。本人でなくても、ご家族からの相談も受け付けています。",
                  tag: "相談先",
                },
                {
                  q: "兄弟で介護の負担が偏っています",
                  a: "まずは現状の負担を「見える化」することが大切です。何を誰がやっているかを書き出し、家族で共有するところから始めてみてください。",
                  tag: "家族会議",
                },
              ].map((qa, i) => (
                <details
                  key={i}
                  className="bg-card border border-border rounded-2xl overflow-hidden group"
                >
                  <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-background transition-colors list-none">
                    <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded-full shrink-0">
                      {qa.tag}
                    </span>
                    <p className="text-sm font-medium flex-1">{qa.q}</p>
                    <span className="text-muted text-sm group-open:rotate-90 transition-transform">
                      ▶
                    </span>
                  </summary>
                  <div className="px-4 pb-4 border-t border-border pt-3">
                    <p className="text-sm text-muted leading-relaxed">{qa.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
