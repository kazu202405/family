"use client";

import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/components/AuthContext";
import {
  MessageSquare,
  Heart,
  Clock,
  MapPin,
  Users,
  Calendar,
  BookOpen,
  Mail,
} from "lucide-react";
import { useState, useMemo } from "react";

// ── 近くの人（プレビュー用に3名のみ使用）──
const nearbyPeople = [
  {
    id: 1,
    name: "Aさん",
    age: "50代",
    prefecture: "大阪府",
    city: "大阪市北区",
    role: "離れて暮らす子ども",
    themes: ["見守り", "介護"],
    message: "同世代の方とお茶でもしながら気軽にお話しできたら嬉しいです",
    lastActive: "30分前",
    online: true,
  },
  {
    id: 2,
    name: "Bさん",
    age: "40代",
    prefecture: "大阪府",
    city: "豊中市",
    role: "近くに住む子ども",
    themes: ["介護", "お金"],
    message: "散歩仲間を探しています。千里中央あたりでよく歩いてます",
    lastActive: "1時間前",
    online: true,
  },
  {
    id: 3,
    name: "Cさん",
    age: "60代",
    prefecture: "大阪府",
    city: "吹田市",
    role: "同居家族",
    themes: ["見守り", "不動産"],
    message: "ひとりで考えていても仕方ないので、誰かと話したくて登録しました",
    lastActive: "3時間前",
    online: false,
  },
];

// ── 交流会（プレビュー用に2件のみ使用）──
const meetups = [
  {
    id: 1,
    title: "おしゃべりカフェ会",
    theme: null,
    area: "大阪市北区",
    date: "4月5日（土）14:00〜16:00",
    venue: "梅田駅近くのカフェ",
    members: 4,
    capacity: 8,
    description: "テーマなし。同世代で気軽におしゃべりしませんか。お茶代だけでOK",
  },
  {
    id: 2,
    title: "介護のはじめかた座談会",
    theme: "介護",
    area: "大阪市北区",
    date: "4月12日（土）14:00〜16:00",
    venue: "北区民センター 第2会議室",
    members: 8,
    capacity: 15,
    description: "介護保険の申請から在宅サービスの活用まで、経験者と一緒に話しましょう",
  },
];

// ── 体験つぶやき ──
const stories = [
  {
    id: 1,
    author: "Aさん",
    age: "50代",
    theme: "見守り",
    title: "遠方の母に見守りカメラを導入した話",
    body: "最初は嫌がっていた母ですが、テレビ電話機能付きにしたら喜んで使ってくれるようになりました。",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: "Bさん",
    age: "40代",
    theme: "介護",
    title: "ケアマネさんとの初回面談で聞いておけばよかったこと",
    body: "事前に「今困っていること」「将来不安なこと」「経済的な見通し」を整理しておくと、ケアプランの質が全然違います。",
    likes: 24,
    comments: 7,
  },
  {
    id: 3,
    author: "Cさん",
    age: "60代",
    theme: "不動産",
    title: "実家を売るか貸すか、1年迷った末の結論",
    body: "不動産会社3社に相見積もりを取ったのが正解。価格差が200万円ありました。",
    likes: 31,
    comments: 5,
  },
];

const themeFilters = ["すべて", "見守り", "医療", "介護", "施設", "不動産", "相続", "お金", "葬儀"];

const themeColors: Record<string, string> = {
  見守り: "bg-blue-50 text-blue-600",
  医療: "bg-rose-50 text-rose-600",
  介護: "bg-primary-light text-primary",
  施設: "bg-purple-50 text-purple-600",
  不動産: "bg-amber-50 text-amber-600",
  相続: "bg-orange-50 text-orange-600",
  お金: "bg-emerald-50 text-emerald-600",
  葬儀: "bg-slate-100 text-slate-600",
};

type TabId = "stories" | "connect";

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("stories");
  const [activeTheme, setActiveTheme] = useState("すべて");

  const userArea = user ? `${user.prefecture}${user.city}` : null;

  // 体験つぶやきフィルター
  const filteredStories = useMemo(() => {
    if (activeTheme === "すべて") return stories;
    return stories.filter((s) => s.theme === activeTheme);
  }, [activeTheme]);

  const tabs: { id: TabId; label: string; icon: typeof Users }[] = [
    { id: "stories", label: "体験つぶやき", icon: BookOpen },
    { id: "connect", label: "つながる", icon: Users },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <AppHeader title="コミュニティ" subtitle="仲間と繋がる" hideBack />

      <div className="flex-1 px-4 py-6 pb-20 md:pb-8">
        <div className="max-w-3xl mx-auto">
          {/* ユーザーのエリア */}
          {userArea && (
            <div className="flex items-center gap-2 mb-4 px-1">
              <MapPin size={14} className="text-primary" />
              <span className="text-sm text-primary font-medium">{userArea}</span>
            </div>
          )}

          {/* メインタブ */}
          <div className="flex bg-card border border-border rounded-xl p-1 mb-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveTheme("すべて");
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ═══ タブ：体験つぶやき ═══ */}
          {activeTab === "stories" && (
            <>
              {/* テーマフィルター */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 scrollbar-none">
                {themeFilters.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setActiveTheme(theme)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeTheme === theme
                        ? "bg-primary text-white"
                        : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredStories.length === 0 ? (
                  <div className="bg-card border border-border rounded-2xl p-8 text-center">
                    <BookOpen size={24} className="text-muted mx-auto mb-3" />
                    <p className="text-sm text-muted">このテーマのつぶやきはまだありません</p>
                  </div>
                ) : (
                  filteredStories.map((story) => (
                    <article
                      key={story.id}
                      className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-xs font-bold text-primary">
                          {story.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {story.author}（{story.age}）
                          </p>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              themeColors[story.theme] || "bg-background text-muted"
                            }`}
                          >
                            {story.theme}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-sm mb-2">{story.title}</h3>
                      <p className="text-xs text-muted leading-relaxed mb-3">
                        {story.body}
                      </p>
                      <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                        <span className="flex items-center gap-1.5 text-xs text-muted">
                          <Heart size={14} />
                          {story.likes}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted">
                          <MessageSquare size={14} />
                          {story.comments}件
                        </span>
                      </div>
                    </article>
                  ))
                )}

                {/* 投稿機能の案内 */}
                <p className="text-center text-xs text-muted pt-2">
                  投稿機能は近日公開予定です。
                  <span className="text-primary cursor-pointer hover:underline">
                    公開時にお知らせを受け取る →
                  </span>
                </p>
              </div>
            </>
          )}

          {/* ═══ タブ：つながる ═══ */}
          {activeTab === "connect" && (
            <div className="space-y-6">
              {/* 近くの人プレビュー */}
              <div>
                <h2 className="text-sm font-bold mb-3 px-1">近くの人</h2>
                <div className="space-y-3">
                  {nearbyPeople.map((person) => (
                    <div
                      key={person.id}
                      className="bg-card border border-border rounded-2xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center text-sm font-bold text-primary">
                            {person.name.charAt(0)}
                          </div>
                          {person.online && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-card rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-bold">{person.name}</p>
                            <span className="text-[10px] text-muted">({person.age})</span>
                          </div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <MapPin size={11} className="text-muted shrink-0" />
                            <span className="text-[11px] text-muted">{person.city}</span>
                            <span className="text-[10px] text-muted">·</span>
                            <Clock size={11} className="text-muted shrink-0" />
                            <span className="text-[11px] text-muted">{person.lastActive}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mb-2">
                            {person.role && (
                              <span className="text-[10px] bg-background border border-border text-muted px-1.5 py-0.5 rounded-full">{person.role}</span>
                            )}
                            {person.themes?.map(t => (
                              <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${themeColors[t] || "bg-background text-muted"}`}>{t}</span>
                            ))}
                          </div>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            {person.message}
                          </p>
                          <p className="text-xs text-primary mt-2 cursor-pointer hover:underline">交流会に誘う →</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 交流会でつながるセクション */}
              <div className="bg-primary-light/40 rounded-xl px-4 py-3 text-center">
                <p className="text-xs text-primary font-medium">気になる方がいたら、交流会でお会いしましょう</p>
              </div>

              {/* 交流会プレビュー */}
              <div>
                <h2 className="text-sm font-bold mb-3 px-1">交流会</h2>
                <div className="space-y-3">
                  {meetups.map((meetup) => (
                    <div
                      key={meetup.id}
                      className="bg-card border border-border rounded-2xl p-5"
                    >
                      <div className="mb-2">
                        {meetup.theme ? (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              themeColors[meetup.theme] || "bg-background text-muted"
                            }`}
                          >
                            {meetup.theme}
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-600">
                            気軽な集まり
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm mb-2">{meetup.title}</h3>
                      <p className="text-xs text-muted leading-relaxed mb-3">
                        {meetup.description}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Calendar size={12} />
                          <span>{meetup.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <MapPin size={12} />
                          <span>{meetup.area}・{meetup.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Users size={12} />
                          <span>{meetup.members}/{meetup.capacity}名</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* まもなく公開メッセージ + メール登録 */}
              <div className="bg-primary-light/50 border border-primary/10 rounded-2xl p-6 text-center">
                <Mail size={24} className="text-primary mx-auto mb-3" />
                <p className="text-base font-bold mb-1">まもなく公開</p>
                <p className="text-xs text-muted mb-4 leading-relaxed">
                  メッセージ機能は準備中です。まずは交流会を通じてつながりましょう。
                  <br />
                  公開時にメールでお知らせします。
                </p>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:border-primary"
                  />
                  <button className="shrink-0 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-primary-hover transition-colors">
                    登録
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
