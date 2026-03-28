"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import AppHeader from "@/components/AppHeader";
import { MessageSquare, Clock, Pencil, X, MapPin, Save, User, LogOut, ArrowRight } from "lucide-react";

type HistoryItem = {
  id: number;
  date: string;
  category: string;
  categoryLabel: string;
  summary: string;
  userName: string;
};

// カテゴリ別のカラー（8カテゴリ）
const categoryColors: Record<string, string> = {
  mimamori: "bg-blue-50 text-blue-600",
  iryou: "bg-teal-50 text-teal-600",
  kaigo: "bg-primary-light text-primary",
  shisetsu: "bg-purple-50 text-purple-600",
  fudosan: "bg-amber-50 text-amber-600",
  souzoku: "bg-orange-50 text-orange-600",
  okane: "bg-emerald-50 text-emerald-600",
  sougi: "bg-slate-100 text-slate-600",
};

export default function MyPage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPostalCode, setEditPostalCode] = useState("");
  const [editPrefecture, setEditPrefecture] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editAgeGroup, setEditAgeGroup] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editThemes, setEditThemes] = useState<string[]>([]);
  const [editIntroduction, setEditIntroduction] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);

  const openProfileEdit = () => {
    setEditName(user?.name || "");
    setEditPostalCode(user?.postalCode || "");
    setEditPrefecture(user?.prefecture || "");
    setEditCity(user?.city || "");
    setEditArea(user?.area || "");
    setEditAgeGroup(user?.ageGroup || "");
    setEditRole(user?.role || "");
    setEditThemes(user?.themes || []);
    setEditIntroduction(user?.introduction || "");
    setShowProfileEdit(true);
  };

  // 郵便番号から住所を自動入力
  const lookupAddress = async (code: string) => {
    const cleaned = code.replace(/\D/g, "");
    if (cleaned.length !== 7) return;
    setIsLookingUp(true);
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleaned}`);
      const data = await res.json();
      if (data.results && data.results[0]) {
        const r = data.results[0];
        setEditPrefecture(r.address1);
        setEditCity(r.address2);
        setEditArea(r.address3);
      }
    } catch {
      // 検索失敗時は手動入力を促す
    } finally {
      setIsLookingUp(false);
    }
  };

  const handlePostalCodeChange = (value: string) => {
    setEditPostalCode(value);
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 7) {
      lookupAddress(cleaned);
    }
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    updateProfile({
      name: editName.trim(),
      postalCode: editPostalCode,
      prefecture: editPrefecture,
      city: editCity,
      area: editArea,
      ageGroup: editAgeGroup || undefined,
      role: editRole || undefined,
      themes: editThemes.length > 0 ? editThemes : undefined,
      introduction: editIntroduction.trim() || undefined,
    });
    setShowProfileEdit(false);
  };
  // ダミーデータ（実際のデータがなければこちらを表示）
  const dummyHistory: HistoryItem[] = [
    {
      id: 1001,
      date: "2026年3月22日",
      category: "mimamori",
      categoryLabel: "親の異変と見守り",
      summary: "離れて暮らす母（82歳）の物忘れが増えている。同じ話を繰り返す、火の消し忘れが1回あった。地域包括支援センターへの相談と、見守りカメラの導入を提案。緊急度：中。",
      userName: user?.name || "ゲスト",
    },
    {
      id: 1002,
      date: "2026年3月18日",
      category: "fudosan",
      categoryLabel: "実家と不動産",
      summary: "父が施設に入り実家が空き家に。築40年の木造、兄弟3人で意見が割れている。まず自治体の空き家相談窓口で選択肢を整理し、兄弟で共有することを提案。緊急度：低。",
      userName: user?.name || "ゲスト",
    },
    {
      id: 1003,
      date: "2026年3月12日",
      category: "kaigo",
      categoryLabel: "介護のはじめかた",
      summary: "父（85歳）が転倒し入院。退院後の在宅介護について不安。要介護認定の申請手順とケアマネジャーへの相談を案内。介護休業制度の利用も検討。緊急度：高。",
      userName: user?.name || "ゲスト",
    },
    {
      id: 1004,
      date: "2026年3月5日",
      category: "souzoku",
      categoryLabel: "相続と備え",
      summary: "両親とも80代。相続について兄弟で話したことがない。基礎控除の計算で相続税がかかる可能性があるか確認。税理士会の無料相談会への参加を提案。緊急度：低。",
      userName: user?.name || "ゲスト",
    },
    {
      id: 1005,
      date: "2026年2月28日",
      category: "okane",
      categoryLabel: "お金と制度",
      summary: "母の介護費用が月15万円。年金だけでは足りず貯蓄を切り崩している。高額介護サービス費の申請と、世帯分離による負担軽減の可能性を案内。緊急度：中。",
      userName: user?.name || "ゲスト",
    },
  ];

  const [history, setHistory] = useState<HistoryItem[]>([]);

  // sessionStorageから履歴を読み込む（なければダミーを表示）
  useEffect(() => {
    const stored = sessionStorage.getItem("chatHistory");
    if (stored) {
      const parsed = JSON.parse(stored);
      setHistory(parsed.length > 0 ? parsed : dummyHistory);
    } else {
      setHistory(dummyHistory);
    }
  }, []);

  const [activeTab, setActiveTab] = useState("all");

  // 履歴に存在するカテゴリだけをタブとして表示
  const tabs = useMemo(() => {
    const categories = [...new Set(history.map((h) => h.category))];
    const tabList: { id: string; label: string }[] = [
      { id: "all", label: "すべて" },
    ];
    const labelMap: Record<string, string> = {
      mimamori: "見守り",
      iryou: "医療",
      kaigo: "介護",
      shisetsu: "施設",
      fudosan: "不動産",
      souzoku: "相続",
      okane: "お金",
      sougi: "葬儀",
    };
    categories.forEach((cat) => {
      if (labelMap[cat]) {
        tabList.push({ id: cat, label: labelMap[cat] });
      }
    });
    return tabList;
  }, [history]);

  const filteredHistory = useMemo(() => {
    if (activeTab === "all") return history;
    return history.filter((h) => h.category === activeTab);
  }, [history, activeTab]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // 最新の相談履歴（ダッシュボードヘッダー用）
  const latestHistory = history.length > 0 ? history[0] : null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <AppHeader title="マイページ" subtitle="履歴・設定" hideBack />

      <div className="flex-1 px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-3xl mx-auto">
          {/* ダッシュボードヘッダー */}
          <section className="bg-card border border-border rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <User size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold">
                  おかえりなさい、{user?.name || "ゲスト"}さん
                </p>
                {user && (
                  <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                    <MapPin size={11} />
                    {user.prefecture}{user.city}{user.area && ` ${user.area}`}
                  </p>
                )}
                {(user?.ageGroup || user?.role) && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user?.ageGroup && (
                      <span className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full">{user.ageGroup}</span>
                    )}
                    {user?.role && (
                      <span className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full">{user.role}</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={openProfileEdit}
                className="shrink-0 w-9 h-9 rounded-xl bg-background text-muted flex items-center justify-center hover:bg-primary-light hover:text-primary transition-colors"
                aria-label="プロフィール編集"
              >
                <Pencil size={15} />
              </button>
            </div>

            {/* テーマ・ひとこと */}
            {(user?.themes && user.themes.length > 0 || user?.introduction) && (
              <div className="mb-4">
                {user?.themes && user.themes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {user.themes.map((theme) => (
                      <span key={theme} className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium">
                        {theme}
                      </span>
                    ))}
                  </div>
                )}
                {user?.introduction && (
                  <p className="text-xs text-muted leading-relaxed">{user.introduction}</p>
                )}
              </div>
            )}

            {/* 前回の相談情報 */}
            {latestHistory && (
              <div className="bg-background rounded-xl px-4 py-3 mb-4">
                <p className="text-xs text-muted mb-1">前回の相談</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock size={11} />
                    {latestHistory.date}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      categoryColors[latestHistory.category] || "bg-primary-light text-primary"
                    }`}
                  >
                    {latestHistory.categoryLabel}
                  </span>
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex gap-3">
              {latestHistory && (
                <button
                  onClick={() => {/* 前回の結果表示（将来実装） */}}
                  className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-muted hover:bg-background transition-colors"
                >
                  前回の結果を見る
                </button>
              )}
              <Link
                href="/chat"
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                <MessageSquare size={14} />
                新しい相談
              </Link>
            </div>
          </section>

          {/* 相談履歴 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                相談履歴
              </h2>
              <span className="text-xs text-muted">
                {history.length > 0
                  ? `${history.length}件`
                  : "※有料プランで保存可能"}
              </span>
            </div>

            {/* カテゴリタブ */}
            {history.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tab.label}
                    {tab.id === "all"
                      ? ` (${history.length})`
                      : ` (${history.filter((h) => h.category === tab.id).length})`}
                  </button>
                ))}
              </div>
            )}

            {filteredHistory.length > 0 ? (
              <div className="space-y-3">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-2xl p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock size={11} />
                        {item.date}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          categoryColors[item.category] || "bg-primary-light text-primary"
                        }`}
                      >
                        {item.categoryLabel}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <MessageSquare size={24} className="text-muted mx-auto mb-3" />
                <p className="text-sm text-muted mb-1">相談履歴はまだありません</p>
                <p className="text-xs text-muted">
                  相談を完了すると、ここにカテゴリ別で表示されます
                </p>
              </div>
            )}
          </section>

          {/* 有料プランインラインカード */}
          <section className="mb-8">
            <Link
              href="/pricing"
              className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 hover:border-primary transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-muted">
                  履歴の保存や深掘り整理には有料プランが必要です
                </p>
              </div>
              <span className="shrink-0 text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                詳細を見る
                <ArrowRight size={13} />
              </span>
            </Link>
          </section>

          {/* 設定 */}
          <section>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={openProfileEdit}
                className="w-full flex items-center justify-between px-5 py-4 text-sm hover:bg-background transition-colors border-b border-border"
              >
                <span className="flex items-center gap-2">
                  <Pencil size={14} className="text-muted" />
                  プロフィール編集
                </span>
                <ArrowRight size={14} className="text-muted" />
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-5 py-4 text-sm text-danger hover:bg-danger-light transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LogOut size={14} />
                  ログアウト
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* プロフィール編集モーダル */}
      {showProfileEdit && (
        <div className="fixed inset-0 z-[70]">
          <div
            className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
            onClick={() => setShowProfileEdit(false)}
          />
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-card rounded-2xl shadow-xl overflow-hidden">
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-base font-bold">プロフィール編集</h2>
              <button
                onClick={() => setShowProfileEdit(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-background transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* フォーム */}
            <div className="px-5 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  お名前（ニックネーム可）
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="例：たかし"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  郵便番号
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editPostalCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="例：5300001"
                    maxLength={8}
                  />
                  {isLookingUp && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                      検索中...
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted mt-1">
                  ハイフンなしで入力すると住所が自動入力されます
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    都道府県
                  </label>
                  <input
                    type="text"
                    value={editPrefecture}
                    onChange={(e) => setEditPrefecture(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="大阪府"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    市区町村
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="大阪市北区"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  町域
                </label>
                <input
                  type="text"
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="梅田"
                />
              </div>

              {/* 年代 */}
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  年代
                </label>
                <div className="flex flex-wrap gap-2">
                  {["40代", "50代", "60代", "70代以上"].map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setEditAgeGroup(editAgeGroup === age ? "" : age)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        editAgeGroup === age
                          ? "bg-primary text-white"
                          : "bg-background border border-border text-muted hover:border-primary"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* 立場 */}
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  立場
                </label>
                <div className="flex flex-wrap gap-2">
                  {["離れて暮らす子ども", "同居家族", "近くに住む子ども", "きょうだい", "その他"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setEditRole(editRole === role ? "" : role)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        editRole === role
                          ? "bg-primary text-white"
                          : "bg-background border border-border text-muted hover:border-primary"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* テーマ */}
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  テーマ（複数選択可）
                </label>
                <div className="flex flex-wrap gap-2">
                  {["見守り", "介護", "施設", "不動産", "相続", "お金"].map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() =>
                        setEditThemes((prev) =>
                          prev.includes(theme)
                            ? prev.filter((t) => t !== theme)
                            : [...prev, theme]
                        )
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        editThemes.includes(theme)
                          ? "bg-primary text-white"
                          : "bg-background border border-border text-muted hover:border-primary"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* ひとこと */}
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  ひとこと
                </label>
                <textarea
                  value={editIntroduction}
                  onChange={(e) => setEditIntroduction(e.target.value)}
                  maxLength={100}
                  rows={2}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="例：母の介護について相談したいです"
                />
                <p className="text-[10px] text-muted text-right mt-1">
                  {editIntroduction.length}/100
                </p>
              </div>
            </div>

            {/* フッター */}
            <div className="px-5 py-4 border-t border-border flex gap-3">
              <button
                onClick={() => setShowProfileEdit(false)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-background transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={!editName.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-40"
              >
                <Save size={14} />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
