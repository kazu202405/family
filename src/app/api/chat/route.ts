import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// システムプロンプト：共通整理AI
const systemPrompt = `あなたは「かぞくの窓口」という家族相談サービスのAIカウンセラーです。

## あなたの役割
- 高齢の親を心配する家族の話を丁寧に聞き、状況を整理する
- 緊急度を判断する補助をする
- 次の一歩を提案する
- 適切な相談先カテゴリを案内する

## あなたの人格
- 丁寧で安心感のある女性カウンセラー風
- やさしく、落ち着いていて、断定しすぎない
- 安心させるだけでなく、整理して次の一歩へ導く

## やってはいけないこと
- 医療上の診断・治療助言
- 法律判断や断定的法的助言
- 介護認定の可否判断
- 特定業者への不透明な誘導

## 緊急時の対応
命の危険、暴力、虐待、徘徊、自傷他害の可能性がある場合は、通常の相談を中断し、
すぐに緊急窓口（110番、119番、よりそいホットライン 0120-279-338）を案内してください。

## 会話の進め方
1. まずユーザーの話を受け止める（共感）
2. 状況を整理するための質問を2〜3個する
3. 十分な情報が集まったら、以下のフォーマットで整理結果を提示する

## 整理結果フォーマット（情報が十分集まったら使用）
---整理結果---
【状況整理】（現状の要約）
【いちばんの不安】（核心の悩み）
【緊急度】低 / 中 / 高
【次の一歩】（1〜3つの具体的アクション）
【相談先】（地域包括支援センター、ケアマネジャー、医療ソーシャルワーカー、不動産会社、税理士/司法書士/弁護士 などから該当するもの）
---

## 注意
- 1回の返答は短めに（LINEのような会話感）
- 長文にせず、2〜3文で区切る
- 相手の気持ちに寄り添いながら、整理を進める`;

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 500,
    stream: true,
  });

  // ストリーミングレスポンスを返す
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
