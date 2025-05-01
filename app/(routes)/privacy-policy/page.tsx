import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Shochan.dev",
  description: "当サイトのプライバシーポリシーに関する情報",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full flex justify-center px-4 md:px-6">
      <div className="max-w-3xl w-full py-12 overflow-hidden">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 bg-primary-foreground rounded-full flex items-center justify-center">
            <span className="text-4xl">🏝️</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center break-words px-4">プライバシーポリシー</h1>
          <time className="text-sm text-muted-foreground" dateTime="2025-05-01">
            更新日: 2025年5月1日
          </time>
        </div>

        <div className="space-y-12 px-4 md:px-0">
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">免責事項</h2>
            <p className="text-muted-foreground">
              当サイト「Shochan.dev」では、情報の正確性や安全性に細心の注意を払っておりますが、掲載された内容によって生じた損害等の一切の責任を負いかねます。
              
              <br /><br />
              
              また、当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              
              <br /><br />
              
              当サイトの保守、火災、停電、その他の自然災害、ウイルスや第三者の妨害等行為による不可抗力によって、当サイトによるサービスが一時的に停止する場合もあります。この場合、当サイトに掲載された内容の消失や変更についても責任は負いかねますので、ご了承ください。
            </p>
          </section>

          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">著作権について</h2>
            <p className="text-muted-foreground">
              当サイト「Shochan.dev」に掲載されているすべてのコンテンツ（文章、画像、デザイン等）の著作権は、特に記載がない限り当サイト管理者に帰属します。
              
              <br /><br />
              
              当サイトのコンテンツを引用する場合は、「引用元：Shochan.dev」と明記の上、ご利用いただけます。ただし、引用の範囲を超えた全文転載や商用利用は禁止しております。
              
              <br /><br />
              
              記事の内容や画像の無断転載・複製等の行為は著作権法により禁止されています。また、当サイトのRSSフィードを利用して自動的にコンテンツを転載することもご遠慮ください。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 