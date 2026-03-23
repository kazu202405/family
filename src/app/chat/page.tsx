"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Eye,
  HandHeart,
  Hospital,
  House,
  Users,
  FileText,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const themes = [
  { label: "親の見守り", icon: Eye },
  { label: "介護の入口", icon: HandHeart },
  { label: "施設入居", icon: Hospital },
  { label: "実家・空き家", icon: House },
  { label: "家族の話し合い", icon: Users },
  { label: "相続の不安", icon: FileText },
];

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "こんにちは。かぞくの窓口です。\n\nご家族のことで気になっていること、ひとりで抱えていることはありませんか？\n\nまずは、どんなテーマでお話ししたいか教えてください。",
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [showThemes, setShowThemes] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const sendToApi = useCallback(
    async (allMessages: Message[]) => {
      setIsStreaming(true);
      const apiMessages = allMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
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
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId ? { ...m, content: fullText } : m
            )
          );
        }

        if (fullText.includes("---整理結果---")) {
          sessionStorage.setItem("resultText", fullText);
          setTimeout(() => router.push("/result"), 2000);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: allMessages.length + 1,
            role: "assistant",
            content:
              "申し訳ありません。接続に問題が発生しました。もう一度お試しください。",
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [router]
  );

  const handleThemeSelect = async (theme: string) => {
    setShowThemes(false);
    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: `${theme}について相談したい`,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    await sendToApi(newMessages);
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
    setShowThemes(false);
    await sendToApi(newMessages);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-background">
      <AppHeader title="かぞくの窓口" subtitle="相談整理AI" hideBack />

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
                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mr-2.5 mt-1">
                  <HandHeart size={16} />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-chat-user text-white rounded-2xl rounded-br-md shadow-sm"
                    : "bg-card border border-border text-foreground rounded-2xl rounded-bl-md shadow-sm"
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

          {/* テーマ選択ボタン */}
          {showThemes && !isStreaming && (
            <div className="grid grid-cols-2 gap-2 pl-11 chat-bubble-enter">
              {themes.map((theme) => (
                <button
                  key={theme.label}
                  onClick={() => handleThemeSelect(theme.label)}
                  className="flex items-center gap-2 bg-card border border-border rounded-xl px-3.5 py-2.5 text-sm text-left hover:border-primary hover:bg-primary-light transition-all group"
                >
                  <theme.icon
                    size={16}
                    className="text-muted group-hover:text-primary transition-colors shrink-0"
                  />
                  <span className="group-hover:text-primary transition-colors">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力エリア */}
      <div className="border-t border-border bg-card/80 backdrop-blur-sm shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="お悩みを入力してください..."
            rows={1}
            className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
