"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { HandHeart, MapPin, Loader2, CheckCircle2 } from "lucide-react";

type AddressResult = {
  prefecture: string;
  city: string;
  area: string;
};

// zipcloud API で郵便番号から住所を取得
async function fetchAddress(zipcode: string): Promise<AddressResult | null> {
  const cleaned = zipcode.replace(/[^0-9]/g, "");
  if (cleaned.length !== 7) return null;

  try {
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleaned}`
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const r = data.results[0];
      return {
        prefecture: r.address1,
        city: r.address2,
        area: r.address3,
      };
    }
  } catch {
    // APIエラー時はnullを返す
  }
  return null;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState<AddressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [role, setRole] = useState("");
  const [themes, setThemes] = useState<string[]>([]);
  const [introduction, setIntroduction] = useState("");

  // 郵便番号の入力ハンドラ（自動ハイフン挿入 + 7桁で自動検索）
  const handlePostalCodeChange = async (value: string) => {
    // 数字とハイフンのみ
    const raw = value.replace(/[^0-9-]/g, "");
    setPostalCode(raw);
    setAddress(null);
    setError("");

    const digits = raw.replace(/[^0-9]/g, "");

    // 3桁入力でハイフン自動挿入
    if (digits.length === 3 && !raw.includes("-")) {
      setPostalCode(digits + "-");
      return;
    }

    // 7桁揃ったら自動検索
    if (digits.length === 7) {
      setLoading(true);
      const result = await fetchAddress(digits);
      setLoading(false);

      if (result) {
        setAddress(result);
      } else {
        setError("住所が見つかりませんでした。郵便番号を確認してください。");
      }
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("お名前を入力してください");
      return;
    }
    if (!address) {
      setError("郵便番号から住所を取得してください");
      return;
    }

    register({
      name: name.trim(),
      postalCode: postalCode.replace(/[^0-9]/g, ""),
      prefecture: address.prefecture,
      city: address.city,
      area: address.area,
      ageGroup: ageGroup || undefined,
      introduction: introduction.trim() || undefined,
      themes: themes.length > 0 ? themes : undefined,
      role: role || undefined,
    });

    router.push("/chat");
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* ヘッダー */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center">
            <HandHeart size={15} strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold text-foreground">
            かぞくの窓口
          </span>
        </div>
      </header>

      {/* 登録フォーム */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h1 className="text-xl font-bold text-center mb-2">新規登録</h1>
            <p className="text-xs text-muted text-center mb-6">
              お住まいの地域に合った相談先をご案内するために使います
            </p>

            <div className="space-y-5">
              {/* 名前 */}
              <div>
                <label className="block text-sm text-muted mb-1.5">
                  お名前（ニックネーム可）
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：たろう"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* 郵便番号 */}
              <div>
                <label className="block text-sm text-muted mb-1.5">
                  郵便番号
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={postalCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    placeholder="例：123-4567"
                    maxLength={8}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {loading && (
                    <Loader2
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted animate-spin"
                    />
                  )}
                </div>
                <p className="text-[11px] text-muted mt-1">
                  7桁入力で住所を自動検索します
                </p>
              </div>

              {/* 住所表示 */}
              {address && (
                <div className="bg-primary-light rounded-xl px-4 py-3 flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {address.prefecture} {address.city}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {address.area}
                    </p>
                  </div>
                </div>
              )}

              {/* 年代 */}
              <div>
                <label className="block text-sm text-muted mb-1">年代</label>
                <p className="text-[11px] text-muted mb-2">同世代の方とつながりやすくなります</p>
                <div className="flex flex-wrap gap-2">
                  {["40代", "50代", "60代", "70代以上"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAgeGroup(ageGroup === option ? "" : option)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        ageGroup === option
                          ? "bg-primary text-white"
                          : "bg-background border border-border text-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 立場 */}
              <div>
                <label className="block text-sm text-muted mb-1">ご自身の立場</label>
                <p className="text-[11px] text-muted mb-2">あなたに近い経験の方をお探しできます</p>
                <div className="flex flex-wrap gap-2">
                  {["離れて暮らす子ども", "同居家族", "近くに住む子ども", "きょうだい", "その他"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRole(role === option ? "" : option)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        role === option
                          ? "bg-primary text-white"
                          : "bg-background border border-border text-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* テーマ */}
              <div>
                <label className="block text-sm text-muted mb-1">気になっているテーマ</label>
                <p className="text-[11px] text-muted mb-2">複数選択できます</p>
                <div className="flex flex-wrap gap-2">
                  {["見守り", "介護", "施設", "不動産", "相続", "お金"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setThemes((prev) =>
                          prev.includes(option)
                            ? prev.filter((t) => t !== option)
                            : [...prev, option]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        themes.includes(option)
                          ? "bg-primary text-white"
                          : "bg-background border border-border text-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 自己紹介 */}
              <div>
                <label className="block text-sm text-muted mb-1">ひとこと（任意）</label>
                <p className="text-[11px] text-muted mb-2">コミュニティで表示されます</p>
                <textarea
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder="例：同じ境遇の方と話したいです"
                  maxLength={100}
                  rows={3}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
                <p className="text-[11px] text-muted text-right mt-1">{introduction.length}/100</p>
              </div>

              {/* エラー */}
              {error && (
                <p className="text-xs text-danger bg-danger-light rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !address}
              className="w-full mt-6 bg-primary text-white font-medium py-3 rounded-full hover:bg-primary-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              登録して相談をはじめる
            </button>

            <p className="text-xs text-muted text-center mt-4">
              ※ モック版のため実際の保存は行いません
            </p>

            <div className="text-center mt-4">
              <Link href="/login" className="text-xs text-primary hover:underline">
                すでにアカウントをお持ちの方はログイン
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
