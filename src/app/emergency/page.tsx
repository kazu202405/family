import Link from "next/link";

const emergencyContacts = [
  {
    name: "警察",
    number: "110",
    description: "暴力・犯罪・身の危険がある場合",
    icon: "🚔",
  },
  {
    name: "救急",
    number: "119",
    description: "急病・けが・火災など緊急の医療対応が必要な場合",
    icon: "🚑",
  },
  {
    name: "よりそいホットライン",
    number: "0120-279-338",
    description: "暮らしの困りごと全般（24時間対応・無料）",
    icon: "📞",
  },
  {
    name: "いのちの電話",
    number: "0120-783-556",
    description: "心の悩み・自殺に関する相談（毎日16時〜21時・無料）",
    icon: "💚",
  },
  {
    name: "児童相談所全国共通ダイヤル",
    number: "189",
    description: "児童虐待の通告・相談（24時間対応）",
    icon: "🧒",
  },
  {
    name: "高齢者虐待に関する相談",
    number: "地域包括支援センター",
    description: "高齢者への虐待が疑われる場合の相談窓口",
    icon: "🏛️",
  },
];

export default function EmergencyPage() {
  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* 緊急アラート */}
        <div className="bg-danger-light border-2 border-danger rounded-2xl p-6 mb-8 text-center">
          <p className="text-3xl mb-3">🚨</p>
          <h1 className="text-xl font-bold text-danger mb-2">
            緊急の場合は、まず安全を確保してください
          </h1>
          <p className="text-sm text-foreground leading-relaxed">
            命の危険、暴力、虐待、徘徊など緊急性の高い状況では、
            <br />
            このサービスでの相談よりも先に、以下の窓口にご連絡ください。
          </p>
        </div>

        {/* 緊急連絡先 */}
        <div className="space-y-4 mb-8">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.name}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{contact.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold mb-1">{contact.name}</h2>
                  <p className="text-xs text-muted mb-2">
                    {contact.description}
                  </p>
                  {contact.number.match(/^\d/) ? (
                    <a
                      href={`tel:${contact.number.replace(/-/g, "")}`}
                      className="inline-block bg-danger text-white font-bold px-6 py-2.5 rounded-full text-lg hover:opacity-90 transition-opacity"
                    >
                      📞 {contact.number}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-primary">
                      → {contact.number}に相談
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 注意書き */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-bold mb-2">
            このページが表示された方へ
          </h2>
          <ul className="text-xs text-muted space-y-2 leading-relaxed">
            <li>
              ・本サービスは緊急対応を行う窓口ではありません。危険な状況では、上記の専門機関にご連絡ください。
            </li>
            <li>
              ・安全が確保された後、状況を整理したい場合はいつでもご相談いただけます。
            </li>
            <li>
              ・ご本人だけでなく、周囲の方が気づいた場合も通報・相談をためらわないでください。
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block border border-border rounded-full px-6 py-3 text-sm font-medium hover:bg-card transition-colors"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
