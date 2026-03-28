import Link from "next/link";
import {
  Ear,
  ClipboardList,
  Compass,
  ShieldCheck,
  Eye,
  Stethoscope,
  HeartHandshake,
  Building2,
  Home as HomeIcon,
  ScrollText,
  Check,
  ArrowRight,
  MessageCircle,
  Quote,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";

// --- データ定義 ---

const worries = [
  {
    situation: "電話越しに、母の声が少し変だった",
    detail: "同じ話を繰り返す。冷蔵庫に同じものが3つ。「大丈夫よ」と言うけれど、本当に大丈夫なのか分からない。",
  },
  {
    situation: "介護って、何から始めればいいの？",
    detail: "認定？包括？ケアマネ？知らない言葉ばかり。ネットで調べても情報が多すぎて、結局何もできていない。",
  },
  {
    situation: "兄弟に、実家のことを切り出せない",
    detail: "親のこと、お金のこと、家のこと。話さなきゃと分かっているのに、どう切り出せばいいか分からない。",
  },
];

const steps = [
  {
    number: "01",
    title: "話を聞く",
    description: "AIが丁寧にヒアリング。うまく言葉にならなくても大丈夫です。",
    Icon: Ear,
  },
  {
    number: "02",
    title: "状況を整理する",
    description: "緊急度や優先順位を整理し、今やるべきことを明らかにします。",
    Icon: ClipboardList,
  },
  {
    number: "03",
    title: "相談先につなぐ",
    description: "地域の窓口や専門家など、次に頼れる場所をご案内します。",
    Icon: Compass,
  },
];

const boundaries = [
  "医療診断はしません",
  "法律判断はしません",
  "介護認定の判断はしません",
  "特定業者への誘導はしません",
  "緊急案件は専門窓口を優先します",
];

const themes = [
  { Icon: Eye, title: "親の異変と見守り", description: "離れて暮らす親の変化が気になったら" },
  { Icon: HeartHandshake, title: "介護のはじめかた", description: "何から始めればいいかわからないとき" },
  { Icon: Building2, title: "施設えらび", description: "施設の種類や選び方を整理したいとき" },
  { Icon: HomeIcon, title: "実家と不動産", description: "空き家・実家の管理や処分について" },
  { Icon: ScrollText, title: "相続と備え", description: "相続の準備や家族での話し合いについて" },
  { Icon: Stethoscope, title: "通院・入院・制度", description: "付き添いや使える制度について" },
];

const testimonials = [
  {
    before: "母の物忘れが気になるけど、誰に相談していいか分からなかった",
    quote: "漠然とした不安を話しただけなのに、「まず何をすればいいか」が見えてきました。翌日、地域包括支援センターに電話できました。",
    attribution: "Aさん　50代女性",
  },
  {
    before: "兄弟3人で実家のことを話し合えずにいた",
    quote: "ここで状況を整理してから切り出したら、びっくりするほどスムーズに話が進みました。整理って大事ですね。",
    attribution: "Bさん　40代男性",
  },
  {
    before: "「まだ早いかも」と思って、ずっと後回しにしていた",
    quote: "早めに整理しておいてよかった。やるべきことが3つに絞られて、気持ちがすっと軽くなりました。",
    attribution: "Cさん　50代女性",
  },
];

const faqItems = [
  { question: "本当に無料で使えますか？", answer: "はい。基本的な相談整理は無料でご利用いただけます。回数や機能に制限はありますが、まずは気軽にお試しください。有料プランでは履歴保存や深掘り整理などの機能をご利用いただけます。" },
  { question: "AIの相談って、冷たくないですか？", answer: "お気持ちはよくわかります。かぞくの窓口のAIは、まず「聴くこと」を大切にしています。答えを急がず、あなたの言葉を丁寧に受け止めながら、状況の整理をお手伝いします。" },
  { question: "個人情報は安全ですか？", answer: "はい。ご相談内容は暗号化して保存し、第三者に提供することはありません。詳しくはプライバシーポリシーをご確認ください。" },
  { question: "どんな人が使っていますか？", answer: "40〜60代の方が中心です。「親の物忘れが気になりはじめた」「介護について何も知らないけど不安」という方から、「兄弟と実家のことを話し合いたい」という方まで、幅広くご利用いただいています。" },
  { question: "本当に専門家につないでもらえますか？", answer: "はい。ご相談内容に応じて、地域包括支援センター・ケアマネジャー・弁護士・税理士など、適切な相談先の種類と探し方をご案内します。特定の業者を紹介・誘導することはありません。" },
  { question: "途中でやめても大丈夫ですか？", answer: "もちろんです。途中で中断しても、再開しても、まったく問題ありません。ご自身のペースで、必要なときにお使いください。" },
];

// --- SVG装飾 ---

function HeroBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="g1" cx="20%" cy="30%" r="60%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="80%" cy="70%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g1)" />
      <rect width="800" height="600" fill="url(#g2)" />
      <ellipse cx="150" cy="450" rx="200" ry="120" fill="var(--primary)" opacity="0.03" />
      <ellipse cx="650" cy="150" rx="180" ry="100" fill="var(--accent)" opacity="0.04" />
      <path d="M0 400 Q200 350 400 380 Q600 410 800 360" stroke="var(--primary)" strokeWidth="1" opacity="0.06" fill="none" />
      <path d="M0 450 Q200 400 400 430 Q600 460 800 410" stroke="var(--primary)" strokeWidth="0.5" opacity="0.04" fill="none" />
    </svg>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`w-full h-12 sm:h-16 text-card block ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 1200 60"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 30 Q300 0 600 30 Q900 60 1200 30 L1200 60 L0 60Z" fill="currentColor" />
    </svg>
  );
}

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-2 py-6" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/15" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary/25" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary/15" />
    </div>
  );
}

// --- ページ本体 ---

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        {/* ══════════════════════════════════════════ */}
        {/* 1. ファーストビュー */}
        {/* ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/60 via-primary-light/30 to-background min-h-[70vh] sm:min-h-0 sm:py-24 md:py-32 flex items-center px-4">
          <HeroBackground />

          <div className="relative max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* 左：テキスト */}
              <div className="py-16 sm:py-0">
                <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/60 rounded-full px-4 py-1.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted font-medium">無料・押し売りなし</span>
                </div>
                <p className="text-xs text-muted mb-4">40〜60代のご家族の方へ</p>

                <h1 className="text-[28px] sm:text-3xl md:text-[40px] font-bold tracking-tight text-foreground leading-snug md:leading-snug mb-2">
                  親のことが、
                  <br />
                  気になりはじめたら。
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-primary font-bold mb-6">
                  まず、話を整理してみませんか。
                </p>

                <p className="text-muted text-sm sm:text-[15px] leading-relaxed mb-8 max-w-md">
                  深刻じゃなくても、まだ言葉にならなくても、大丈夫。
                  <br />
                  あなたのモヤモヤを、一緒に整理します。
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <Link
                    href="/chat"
                    className="inline-flex items-center gap-2 bg-primary text-white font-medium px-8 py-4 rounded-full text-base hover:bg-primary-hover transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    <MessageCircle size={18} />
                    無料で相談をはじめる
                  </Link>
                  <span className="text-xs text-muted self-center">登録不要・3分で完了</span>
                </div>
              </div>

              {/* 右：チャットUIモックアップ */}
              <div className="hidden md:block relative">
                <div className="w-full max-w-[360px] mx-auto bg-card/90 backdrop-blur-sm border border-border/60 rounded-2xl shadow-lg overflow-hidden">
                  {/* チャットヘッダー */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-primary-light/30">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                      <MessageCircle size={14} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">かぞくの窓口</span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-green-400" />
                  </div>

                  {/* チャット本文 */}
                  <div className="p-4 space-y-3">
                    {/* AI吹き出し */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageCircle size={10} className="text-primary" />
                      </div>
                      <div className="bg-primary-light/50 border border-primary/10 rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                        <p className="text-xs text-foreground leading-relaxed">お話を聞かせてください。どんなことが気になっていますか？</p>
                      </div>
                    </div>

                    {/* ユーザー吹き出し */}
                    <div className="flex justify-end">
                      <div className="bg-primary text-white rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                        <p className="text-xs leading-relaxed">母の物忘れが増えてきて...</p>
                      </div>
                    </div>

                    {/* AI整理カード */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageCircle size={10} className="text-primary" />
                      </div>
                      <div className="bg-primary-light/50 border border-primary/10 rounded-xl rounded-tl-sm px-3 py-2.5 max-w-[85%] space-y-2">
                        <p className="text-xs text-foreground leading-relaxed">整理してみますね。</p>
                        <div className="bg-card border border-border/50 rounded-lg p-2.5 space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <ClipboardList size={10} className="text-primary" />
                            <span className="text-[10px] font-bold text-primary">状況整理</span>
                          </div>
                          <p className="text-[10px] text-muted leading-relaxed">お母様の物忘れの頻度・生活への影響を確認</p>
                          <div className="border-t border-border/30 pt-1.5 flex items-center gap-1.5">
                            <Compass size={10} className="text-accent" />
                            <span className="text-[10px] font-bold text-accent">次の一歩</span>
                          </div>
                          <p className="text-[10px] text-muted leading-relaxed">地域包括支援センターへの相談をご案内</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ヒーロー下部のカーブ */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-16 sm:h-20" viewBox="0 0 1200 80" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40 Q300 80 600 40 Q900 0 1200 40 L1200 80 L0 80Z" fill="var(--background)" />
          </svg>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 2. こんなこと、ありませんか？ */}
        {/* ══════════════════════════════════════════ */}
        <WaveDivider />
        <section className="pb-16 sm:pb-20 pt-4 px-4 bg-card">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center mb-3">
              こんなこと、ありませんか？
            </h2>
            <p className="text-sm text-muted text-center mb-10 leading-relaxed">
              日々のなかで、ふと気になること。
            </p>

            <ul className="space-y-4">
              {worries.map((worry) => (
                <li key={worry.situation} className="bg-background border border-border/60 rounded-xl p-5">
                  <p className="text-[15px] font-bold text-foreground mb-2 flex items-start gap-3">
                    <Check size={16} className="text-primary shrink-0 mt-1" />
                    {worry.situation}
                  </p>
                  <p className="text-sm text-muted leading-relaxed pl-7">{worry.detail}</p>
                </li>
              ))}
            </ul>

            <p className="text-center mt-10 text-sm text-muted leading-relaxed">
              ひとつでも当てはまったら、まず整理してみませんか。
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 3. 3つのステップ */}
        {/* ══════════════════════════════════════════ */}
        <WaveDivider flip />
        <section className="pb-16 sm:pb-20 pt-8 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center mb-3">
              「かぞくの窓口」がやること
            </h2>
            <p className="text-sm text-muted text-center mb-14 leading-relaxed">
              3つのステップで、あなたの状況を整理します。
            </p>

            {/* 横並びステップ（カードなし） */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
              {steps.map((step, i) => (
                <div key={step.number} className="relative text-center">
                  {/* コネクター矢印（PC） */}
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-8 -right-3 w-6">
                      <ArrowRight size={14} className="text-border mx-auto" />
                    </div>
                  )}
                  {/* 番号 + アイコン */}
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center">
                      <step.Icon size={26} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 4. やらないこと */}
        {/* ══════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 px-4 bg-primary-light/30">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <ShieldCheck size={20} className="text-primary" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">安心してご利用いただくために</h2>
            </div>

            {/* 横一列（カードなし） */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {boundaries.map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <ShieldCheck size={14} className="text-primary shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            <p className="text-center mt-6 text-xs text-muted">
              緊急の場合は、適切な専門窓口をご案内します。
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 5. 相談できるテーマ */}
        {/* ══════════════════════════════════════════ */}
        <DotDivider />
        <section className="pb-16 sm:pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center mb-3">
              相談できるテーマ
            </h2>
            <p className="text-sm text-muted text-center mb-12 leading-relaxed">
              家族にまつわるさまざまな悩みに対応しています。
            </p>

            {/* 2カラムのアイコン+テキスト（カードなし） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 max-w-2xl mx-auto">
              {themes.map((theme) => (
                <div key={theme.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <theme.Icon size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-0.5">{theme.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{theme.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 6. 利用者の声 */}
        {/* ══════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 bg-card">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center mb-3">
              利用された方の声
            </h2>
            <p className="text-sm text-muted text-center mb-12 leading-relaxed">
              同じ悩みを持つご家族から届いた言葉です。
            </p>

            {/* ビフォーアフター形式 */}
            <div className="space-y-6">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-background border border-border/60 rounded-xl p-5">
                  <p className="text-xs text-muted mb-3 flex items-center gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-muted/10 text-muted flex items-center justify-center text-[10px] font-bold">前</span>
                    {item.before}
                  </p>
                  <div className="relative pl-6 border-l-2 border-primary/25">
                    <Quote size={16} className="absolute -left-[10px] -top-0.5 text-primary/20 bg-background" />
                    <p className="text-sm sm:text-[15px] text-foreground leading-[1.9] mb-2">
                      {item.quote}
                    </p>
                  </div>
                  <p className="text-xs text-muted mt-3">── {item.attribution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 7. よくある質問 */}
        {/* ══════════════════════════════════════════ */}
        <DotDivider />
        <section className="pb-16 sm:pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center mb-3">
              よくある質問
            </h2>
            <p className="text-sm text-muted text-center mb-10 leading-relaxed">
              はじめての方からよくいただく質問です。
            </p>

            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 8. 料金 */}
        {/* ══════════════════════════════════════════ */}
        <WaveDivider />
        <section className="pb-16 sm:pb-20 pt-4 px-4 bg-card">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center mb-3">料金</h2>
            <p className="text-sm text-muted text-center mb-10 leading-relaxed">
              まずは無料でお試しいただけます。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="bg-background border border-border rounded-2xl p-6 sm:p-7">
                <p className="text-sm font-medium text-muted mb-1">無料プラン</p>
                <p className="text-3xl font-bold text-primary mb-4">
                  ¥0<span className="text-sm font-normal text-muted ml-1">/月</span>
                </p>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" />初回相談整理</li>
                  <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" />月数回までご利用可能</li>
                  <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" />基本的な窓口案内</li>
                </ul>
              </div>
              <div className="bg-accent-light/50 border border-accent/20 rounded-2xl p-6 sm:p-7">
                <p className="text-sm font-medium text-accent mb-1">有料プラン</p>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-xs font-medium text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    まもなく公開
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-center gap-2.5"><Check size={14} className="text-accent shrink-0" />相談履歴の保存</li>
                  <li className="flex items-center gap-2.5"><Check size={14} className="text-accent shrink-0" />深掘り整理・詳細分析</li>
                  <li className="flex items-center gap-2.5"><Check size={14} className="text-accent shrink-0" />コミュニティ参加</li>
                </ul>
                <p className="mt-4 text-xs text-accent/70 hover:text-accent cursor-pointer underline underline-offset-2">
                  公開時に通知を受け取る
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link href="/pricing" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                料金の詳細を見る
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* 9. 最終CTA */}
        {/* ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 sm:py-24 px-4 bg-primary-light/60">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="cta-g1" cx="30%" cy="50%" r="60%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="400" fill="url(#cta-g1)" />
            <path d="M0 350 Q200 300 400 330 Q600 360 800 320" stroke="var(--primary)" strokeWidth="0.8" opacity="0.08" fill="none" />
          </svg>

          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 leading-relaxed">
              まずは、話を整理してみませんか。
            </h2>
            <p className="text-sm sm:text-[15px] text-muted leading-relaxed mb-8 max-w-md mx-auto">
              深刻じゃなくても大丈夫。
              <br />
              言葉にならないモヤモヤからでも。
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-primary text-white font-medium px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg hover:bg-primary-hover transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <MessageCircle size={20} />
              3分で状況を整理する
            </Link>
            <p className="text-xs text-muted mt-5">無料・登録不要・押し売りなし</p>
          </div>
        </section>
      </div>
    </>
  );
}
