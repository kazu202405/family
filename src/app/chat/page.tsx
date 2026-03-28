"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Send, HandHeart, ArrowRight, MessageSquare, ClipboardList } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/components/AuthContext";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

// カテゴリのラベルマップ
const categoryLabels: Record<string, string> = {
  mimamori: "親の異変と見守り",
  iryou: "通院・入院・医療",
  kaigo: "介護のはじめかた",
  shisetsu: "施設えらび",
  fudosan: "実家と不動産",
  souzoku: "相続と備え",
  okane: "お金と制度",
  sougi: "葬儀・死後の手続き",
};

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "こんにちは。かぞくの窓口です。\n\nご家族のことで気になっていること、心配なことはありませんか？\n\nどんなことでも構いません。まずはお話を聞かせてください。",
};

export default function ChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  // pendingCategory: AIが判定したがユーザー未確認
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  // confirmedCategory: ユーザーが承認済み → Phase2で使う
  const [confirmedCategory, setConfirmedCategory] = useState<string | null>(null);
  const [showResultButton, setShowResultButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming, pendingCategory]);

  const sendToApi = useCallback(
    async (allMessages: Message[], activeCategory: string | null) => {
      setIsStreaming(true);
      const apiMessages = allMessages.map((m) => ({
        role: m.role,
        content: m.content.replace(/\[CATEGORY:\w+\]/g, "").trim(),
      }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            category: activeCategory,
          }),
        });

        if (!response.ok) throw new Error("API error");

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error("No reader");

        const aiMsgId = allMessages.length + 1;
        setMessages((prev) => [
          ...prev,
          { id: aiMsgId, role: "assistant", content: "" },
        ]);

        let fullText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          fullText += chunk;

          const displayText = fullText.replace(/\[CATEGORY:\w+\]/g, "").trim();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: displayText } : m
            )
          );
        }

        // カテゴリ検知 → まだ確認カードを出すだけ（Phase2には切り替えない）
        const categoryMatch = fullText.match(/\[CATEGORY:(\w+)\]/);
        if (categoryMatch && !activeCategory && !pendingCategory) {
          setPendingCategory(categoryMatch[1]);
        }

        // 整理結果検知 → 履歴に保存してresultページへ
        if (fullText.includes("---整理結果---")) {
          const detectedCat = categoryMatch?.[1] || activeCategory || "unknown";
          const history = JSON.parse(
            sessionStorage.getItem("chatHistory") || "[]"
          );
          history.unshift({
            id: Date.now(),
            date: new Date().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            category: detectedCat,
            categoryLabel: categoryLabels[detectedCat] || detectedCat,
            summary: fullText
              .replace(/\[CATEGORY:\w+\]/g, "")
              .substring(0, 200),
            userName: user?.name || "ゲスト",
          });
          sessionStorage.setItem("chatHistory", JSON.stringify(history));
          sessionStorage.setItem(
            "resultText",
            fullText.replace(/\[CATEGORY:\w+\]/g, "")
          );
          setShowResultButton(true);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: allMessages.length + 1,
            role: "assistant",
            content:
              "申し訳ありません、少し混み合っているようです。30秒ほど待ってから、もう一度お話しいただけますか？",
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [user, pendingCategory]
  );

  // 「専門AIに引き継ぐ」を押した
  const handleConfirmHandoff = async () => {
    if (!pendingCategory) return;
    const cat = pendingCategory;
    setConfirmedCategory(cat);
    setPendingCategory(null);

    // 引き継ぎメッセージをAI側に追加
    const handoffMsg: Message = {
      id: messages.length + 1,
      role: "assistant",
      content: `ありがとうございます。ここまでのお話をもとに、${categoryLabels[cat]}の専門カウンセラーとして、より詳しくお話を伺います。\n\nもう少し教えていただけますか？`,
    };
    setMessages((prev) => [...prev, handoffMsg]);
  };

  // 「もう少し話す」を押した
  const handleContinue = () => {
    setPendingCategory(null);
  };

  // クイックスタートテーマ選択
  const quickThemes = [
    "親の見守りが気になる",
    "介護のことで悩んでいる",
    "施設を検討したい",
    "実家・空き家をどうするか",
    "相続のことが不安",
    "その他（自由に相談）",
  ];

  const handleQuickTheme = async (theme: string) => {
    if (theme === "その他（自由に相談）") {
      textareaRef.current?.focus();
      return;
    }
    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: theme,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    await sendToApi(newMessages, confirmedCategory);
  };

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    // テキストエリアの高さをリセット
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    await sendToApi(newMessages, confirmedCategory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // テキストエリア自動リサイズ
  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 80) + "px"; // 最大約3行
  };

  return (
    <div className="flex flex-col h-dvh bg-background">
      <AppHeader
        title="かぞくの窓口"
        subtitle={confirmedCategory ? categoryLabels[confirmedCategory] : "相談整理AI"}
        hideBack
      />

      {/* Phase2バッジ */}
      {confirmedCategory && (
        <div className="bg-primary-light border-b border-primary/10 px-4 py-2">
          <p className="max-w-2xl mx-auto text-xs text-primary font-medium text-center">
            {categoryLabels[confirmedCategory]}の専門カウンセラーが対応しています
          </p>
        </div>
      )}

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex chat-bubble-enter ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center shrink-0 mr-2.5 mt-1 shadow-sm">
                  <HandHeart size={16} />
                </div>
              )}
              <div
                className={`min-w-0 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-chat-user text-white rounded-2xl rounded-br-md shadow-sm max-w-[85%]"
                    : "flex-1 bg-card border border-border text-foreground rounded-2xl rounded-bl-md shadow-sm"
                }`}
              >
                {msg.content || (
                  <div className="flex gap-1.5 py-1">
                    <span className="typing-dot w-2 h-2 bg-muted-light rounded-full" />
                    <span className="typing-dot w-2 h-2 bg-muted-light rounded-full" />
                    <span className="typing-dot w-2 h-2 bg-muted-light rounded-full" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 初回注意書きカード */}
          {messages.length === 1 && !isStreaming && (
            <div className="ml-[42px] bg-background border border-border/60 rounded-xl px-4 py-3 text-[11px] text-muted leading-relaxed">
              AIが状況を整理し、次の一歩をご提案します。医療診断・法律判断は行いません。緊急時は<a href="/emergency" className="text-primary underline">専門窓口</a>をご利用ください。
            </div>
          )}

          {/* クイックスタートテーマ選択（初期メッセージのみの場合） */}
          {messages.length === 1 && !isStreaming && (
            <div className="grid grid-cols-2 gap-2 pl-[42px]">
              {quickThemes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleQuickTheme(theme)}
                  className="px-3 py-2.5 text-[13px] bg-primary-light text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-[0.97] text-left leading-snug"
                >
                  {theme}
                </button>
              ))}
            </div>
          )}

          {/* 整理結果ボタン */}
          {showResultButton && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => router.push("/result")}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-primary-hover transition-all active:scale-[0.98] shadow-md"
              >
                <ClipboardList size={16} />
                整理結果を見る
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 確認カード（カテゴリ判定時に表示） */}
      {pendingCategory && !confirmedCategory && (
        <div className="border-t border-border bg-card px-4 py-4 animate-[fadeInUp_300ms_ease-out]">
          <div className="max-w-2xl mx-auto">
            <div className="bg-primary-light border border-primary/20 rounded-2xl p-4">
              <p className="text-sm font-bold text-foreground mb-1">
                お悩みの整理ができてきました
              </p>
              <p className="text-xs text-muted mb-4">
                ここまでのお話から、
                <span className="font-bold text-primary">
                  「{categoryLabels[pendingCategory]}」
                </span>
                の領域と思われます。専門のAIカウンセラーに引き継いで、より詳しくお話を伺いましょうか？
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleConfirmHandoff}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-all active:scale-[0.98]"
                >
                  専門AIに引き継ぐ
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleContinue}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium text-muted hover:text-foreground hover:border-foreground/20 transition-all"
                >
                  <MessageSquare size={14} />
                  もう少し話す
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 入力エリア */}
      <div className="border-t border-border bg-card/80 backdrop-blur-sm shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="お悩みを入力してください..."
            rows={1}
            style={{ height: "auto", maxHeight: "5rem" }}
            className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all overflow-y-auto"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="bg-primary text-white rounded-xl w-10 h-10 flex items-center justify-center shrink-0 hover:bg-primary-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="送信"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-light pb-2">
          医療診断・法律判断・介護認定の判断は行いません
        </p>
      </div>
    </div>
  );
}
