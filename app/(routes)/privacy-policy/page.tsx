import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Shochan.dev",
  description: "当サイトのプライバシーポリシーに関する情報",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 mb-4 bg-primary-foreground rounded-full flex items-center justify-center">
          {/* ここにアイコンを表示する場合は、適切なアイコンを挿入 */}
          <span className="text-4xl">🏝️</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">プライバシーポリシー</h1>
        <time className="text-sm text-muted-foreground" dateTime="2024-07-13">
          更新日: 2024年7月13日
        </time>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">免責事項</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              当サイトのすべてのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めていますが、必ずしも正確性・信頼性等を保証するものではありません。当サイトの情報による損害に関して、一切責任を負いかねますので、あらかじめご了承ください。
            </p>
            <p>
              本免責事項、および、当サイトに掲載しているコンテンツ・情報は、予告なしに変更・削除されることがあります。予めご了承ください。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">著作権について</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              当サイトに掲載されている情報についての著作権は放棄しておりません。当サイト記事からの引用に関しましては「引用元の明記」によって無償で引用頂けます。
            </p>
            <p>
              ただし、全文転載は禁止しております。引用範囲についても、事前予告なくこれを変更する場合があります。また当サイトのRSSを利用し、コンテンツをそのまま転載することも禁止しています。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 