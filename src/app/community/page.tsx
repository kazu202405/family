"use client";

import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/components/AuthContext";
import {
  MessageSquare,
  Heart,
  Clock,
  MapPin,
  Users,
  Calendar,
  ChevronRight,
  UserPlus,
  BookOpen,
  Coffee,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";

// ── 近くの人（目的なしでも会える人たち）──
const nearbyPeople = [
  {
    id: 1,
    name: "Aさん",
    age: "50代",
    prefecture: "大阪府",
    city: "大阪市北区",
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
    message: "ひとりで考えていても仕方ないので、誰かと話したくて登録しました",
    lastActive: "3時間前",
    online: false,
  },
  {
    id: 4,
    name: "Dさん",
    age: "50代",
    prefecture: "兵庫県",
    city: "神戸市中央区",
    message: "週末カフェでおしゃべりできる方いませんか",
    lastActive: "2時間前",
    online: true,
  },
  {
    id: 5,
    name: "Eさん",
    age: "40代",
    prefecture: "大阪府",
    city: "堺市",
    message: "気軽に話せる友達がほしいです。同じ境遇の方と繋がりたい",
    lastActive: "5時間前",
    online: false,
  },
  {
    id: 6,
    name: "Fさん",
    age: "50代",
    prefecture: "大阪府",
    city: "大阪市中央区",
    message: "親のことで孤独を感じています。話を聞いてくれる方がいたら",
    lastActive: "1日前",
    online: false,
  },
];

// ── 仲間をさがす（テーマベース）──
const themeMembers = [
  {
    id: 101,
    name: "Gさん",
    age: "50代",
    prefecture: "大阪府",
    city: "大阪市北区",
    themes: ["見守り", "介護"],
    message: "遠方の母の見守りについて、経験のある方とお話ししたいです",
    lastActive: "3時間前",
  },
  {
    id: 102,
    name: "Hさん",
    age: "40代",
    prefecture: "大阪府",
    city: "豊中市",
    themes: ["介護", "お金"],
    message: "介護保険を申請したばかり。同じ時期の方と情報交換したい",
    lastActive: "1日前",
  },
  {
    id: 103,
    name: "Iさん",
    age: "60代",
    prefecture: "大阪府",
    city: "吹田市",
    themes: ["不動産", "相続"],
    message: "実家の空き家をどうするか、同じ経験のある方の話が聞きたい",
    lastActive: "2日前",
  },
  {
    id: 104,
    name: "Jさん",
    age: "50代",
    prefecture: "兵庫県",
    city: "神戸市中央区",
    themes: ["施設"],
    message: "施設見学のポイントなど情報交換したいです",
    lastActive: "5時間前",
  },
  {
    id: 105,
    name: "Kさん",
    age: "40代",
    prefecture: "大阪府",
    city: "堺市",
    themes: ["見守り"],
    message: "一人暮らしの父が心配。見守りサービスを使っている方いますか？",
    lastActive: "1時間前",
  },
];

// ── 交流会（気軽なもの + テーマ付きも混在）──
const meetups = [
  {
    id: 1,
    title: "おしゃべりカフェ会",
    theme: null,
    area: "大阪市北区",
    prefecture: "大阪府",
    date: "4月5日（土）14:00〜16:00",
    venue: "梅田駅近くのカフェ",
    members: 4,
    capacity: 8,
    description: "テーマなし。同世代で気軽におしゃべりしませんか。お茶代だけでOK",
  },
  {
    id: 2,
    title: "お散歩＆ランチ会",
    theme: null,
    area: "豊中市",
    prefecture: "大阪府",
    date: "4月6日（日）10:30〜13:00",
    venue: "千里中央公園 → 近くのレストラン",
    members: 3,
    capacity: 6,
    description: "緑の中を歩いてリフレッシュ。話したい人もゆっくりしたい人もどうぞ",
  },
  {
    id: 3,
    title: "介護のはじめかた座談会",
    theme: "介護",
    area: "大阪市北区",
    prefecture: "大阪府",
    date: "4月12日（土）14:00〜16:00",
    venue: "北区民センター 第2会議室",
    members: 8,
    capacity: 15,
    description: "介護保険の申請から在宅サービスの活用まで、経験者と一緒に話しましょう",
  },
  {
    id: 4,
    title: "実家の空き家、どうする？情報交換会",
    theme: "不動産",
    area: "大阪市中央区",
    prefecture: "大阪府",
    date: "4月19日（土）13:00〜15:00",
    venue: "中央区民センター 和室",
    members: 5,
    capacity: 10,
    description: "売却・賃貸・管理、それぞれの経験を持つメンバーが集まります",
  },
  {
    id: 5,
    title: "見守りの工夫を共有する会",
    theme: "見守り",
    area: "豊中市",
    prefecture: "大阪府",
    date: "4月26日（土）10:00〜12:00",
    venue: "豊中市立文化芸術センター",
    members: 12,
    capacity: 20,
    description: "見守りカメラ、電話、訪問サービスなど、みんなの工夫を共有します",
  },
  {
    id: 6,
    title: "週末おしゃべり会",
    theme: null,
    area: "神戸市中央区",
    prefecture: "兵庫県",
    date: "4月13日（日）13:00〜15:00",
    venue: "三宮駅近くのカフェ",
    members: 2,
    capacity: 6,
    description: "神戸エリアの方、お茶しながらゆるく話しませんか。初参加歓迎です",
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

type TabId = "nearby" | "members" | "meetups" | "stories";

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("nearby");
  const [activeTheme, setActiveTheme] = useState("すべて");
  const [meetupArea, setMeetupArea] = useState("すべて");

  const userArea = user ? `${user.prefecture}${user.city}` : null;
  const userPrefecture = user?.prefecture || null;

  // 近くの人（同じ都道府県を優先）
  const sortedNearby = useMemo(() => {
    if (!userPrefecture) return nearbyPeople;
    return [
      ...nearbyPeople.filter((p) => p.prefecture === userPrefecture),
      ...nearbyPeople.filter((p) => p.prefecture !== userPrefecture),
    ];
  }, [userPrefecture]);

  // 仲間をさがす（テーマフィルター）
  const filteredMembers = useMemo(() => {
    let members = themeMembers;
    if (userPrefecture) {
      members = [
        ...members.filter((m) => m.prefecture === userPrefecture),
        ...members.filter((m) => m.prefecture !== userPrefecture),
      ];
    }
    if (activeTheme !== "すべて") {
      members = members.filter((m) => m.themes.includes(activeTheme));
    }
    return members;
  }, [userPrefecture, activeTheme]);

  // 交流会のエリア一覧
  const meetupAreas = useMemo(() => {
    const areas = [...new Set(meetups.map((m) => m.area))];
    return ["すべて", ...areas];
  }, []);

  // 交流会フィルター
  const filteredMeetups = useMemo(() => {
    if (meetupArea === "すべて") return meetups;
    return meetups.filter((m) => m.area === meetupArea);
  }, [meetupArea]);

  // 体験つぶやきフィルター
  const filteredStories = useMemo(() => {
    if (activeTheme === "すべて") return stories;
    return stories.filter((s) => s.theme === activeTheme);
  }, [activeTheme]);

  const tabs: { id: TabId; label: string; icon: typeof Users }[] = [
    { id: "nearby", label: "近くの人", icon: MapPin },
    { id: "members", label: "仲間さがし", icon: Search },
    { id: "meetups", label: "交流会", icon: Calendar },
    { id: "stories", label: "つぶやき", icon: BookOpen },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <AppHeader title="コミュニティ" subtitle="仲間と繋がる" hideBack />

      <div className="flex-1 px-4 py-6">
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
                    setMeetupArea("すべて");
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* テーマフィルター（仲間さがし・つぶやきで表示） */}
          {(activeTab === "members" || activeTab === "stories") && (
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
          )}

          {/* エリアフィルター（交流会で表示） */}
          {activeTab === "meetups" && (
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 scrollbar-none">
              {meetupAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setMeetupArea(area)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    meetupArea === area
                      ? "bg-primary text-white"
                      : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {area === "すべて" ? "すべてのエリア" : area}
                </button>
              ))}
            </div>
          )}

          {/* ═══ タブ：近くの人 ═══ */}
          {activeTab === "nearby" && (
            <div className="space-y-3">
              <p className="text-xs text-muted px-1 mb-2">
                目的がなくてもOK。近くにいる方と気軽に繋がれます
              </p>

              {sortedNearby.map((person) => {
                const isSameArea = userPrefecture && person.prefecture === userPrefecture;
                return (
                  <div
                    key={person.id}
                    className={`bg-card border rounded-2xl p-4 hover:border-primary/40 transition-colors ${
                      isSameArea ? "border-primary/20" : "border-border"
                    }`}
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
                          {isSameArea && (
                            <span className="text-[10px] bg-primary-light text-primary px-1.5 py-0.5 rounded-full font-medium">
                              近く
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <MapPin size={11} className="text-muted shrink-0" />
                          <span className="text-[11px] text-muted">{person.city}</span>
                          <span className="text-[10px] text-muted">·</span>
                          <Clock size={11} className="text-muted shrink-0" />
                          <span className="text-[11px] text-muted">{person.lastActive}</span>
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {person.message}
                        </p>
                      </div>
                      <button className="shrink-0 w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <UserPlus size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="bg-primary-light/50 border border-primary/10 rounded-2xl p-5 text-center mt-4">
                <Coffee size={20} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-bold mb-1">あなたも登録しませんか？</p>
                <p className="text-xs text-muted mb-3">
                  ひとことメッセージを添えるだけ。悩みの共有は必須ではありません
                </p>
                <button className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors">
                  プロフィールを登録（準備中）
                </button>
              </div>
            </div>
          )}

          {/* ═══ タブ：仲間さがし ═══ */}
          {activeTab === "members" && (
            <div className="space-y-3">
              <p className="text-xs text-muted px-1 mb-2">
                同じテーマで悩んでいる方と繋がれます
              </p>

              {filteredMembers.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-8 text-center">
                  <Users size={24} className="text-muted mx-auto mb-3" />
                  <p className="text-sm text-muted">このテーマの仲間はまだいません</p>
                </div>
              ) : (
                filteredMembers.map((member) => {
                  const isSameArea = userPrefecture && member.prefecture === userPrefecture;
                  return (
                    <div
                      key={member.id}
                      className={`bg-card border rounded-2xl p-4 hover:border-primary/40 transition-colors ${
                        isSameArea ? "border-primary/20" : "border-border"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-sm font-bold text-primary shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold">{member.name}</p>
                            <span className="text-[10px] text-muted">({member.age})</span>
                            {isSameArea && (
                              <span className="text-[10px] bg-primary-light text-primary px-1.5 py-0.5 rounded-full font-medium">
                                近く
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <MapPin size={11} className="text-muted shrink-0" />
                            <span className="text-[11px] text-muted">{member.city}</span>
                            <span className="text-[10px] text-muted">·</span>
                            <Clock size={11} className="text-muted shrink-0" />
                            <span className="text-[11px] text-muted">{member.lastActive}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {member.themes.map((t) => (
                              <span
                                key={t}
                                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                  themeColors[t] || "bg-background text-muted"
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted leading-relaxed">
                            {member.message}
                          </p>
                        </div>
                        <button className="shrink-0 w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <UserPlus size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ═══ タブ：交流会 ═══ */}
          {activeTab === "meetups" && (
            <div className="space-y-4">
              {filteredMeetups.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-8 text-center">
                  <Calendar size={24} className="text-muted mx-auto mb-3" />
                  <p className="text-sm text-muted">このエリアの交流会はまだありません</p>
                </div>
              ) : (
                filteredMeetups.map((meetup) => (
                  <div
                    key={meetup.id}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
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
                        <h3 className="font-bold text-sm">{meetup.title}</h3>
                      </div>
                      <ChevronRight size={16} className="text-muted shrink-0 mt-1" />
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-3">
                      {meetup.description}
                    </p>

                    <div className="flex flex-col gap-1.5 mb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar size={12} className="text-muted" />
                        <span>{meetup.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin size={12} className="text-muted" />
                        <span>{meetup.area}・{meetup.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Users size={12} className="text-muted" />
                        <span>{meetup.members}/{meetup.capacity}名</span>
                        <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(meetup.members / meetup.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-primary text-white text-sm font-medium py-2.5 rounded-xl hover:bg-primary-hover transition-colors">
                      参加を申し込む（準備中）
                    </button>
                  </div>
                ))
              )}

              <div className="bg-primary-light border border-primary/15 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold mb-1">交流会を開きませんか？</p>
                <p className="text-xs text-muted mb-3">
                  お茶会でも座談会でも。日時と場所を決めて参加者を募集できます
                </p>
                <button className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  交流会を作成（準備中）
                </button>
              </div>
            </div>
          )}

          {/* ═══ タブ：体験つぶやき ═══ */}
          {activeTab === "stories" && (
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
                      <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
                        <Heart size={14} />
                        {story.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
                        <MessageSquare size={14} />
                        {story.comments}件
                      </button>
                    </div>
                  </article>
                ))
              )}

              <div className="bg-accent-light border border-accent/15 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold mb-1">あなたもつぶやいてみませんか？</p>
                <p className="text-xs text-muted mb-3">
                  ひとことでOK。気軽に経験を共有できます
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  プランを見る
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
