import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Shochan.dev",
  description: "当サイトのプライバシーポリシーに関する情報",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 mb-4 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-4xl">🏝️</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center">プライバシーポリシー</h1>
            <time className="text-sm text-muted-foreground" dateTime="2024-07-13">
              更新日: 2024年7月13日
            </time>
          </div>

          <div className="space-y-12">
            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">免責事項</h2>
              <p className="text-center text-muted-foreground">
                サイトの免責事項に関する情報がここに表示されます。
              </p>
            </section>

            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">著作権について</h2>
              <p className="text-center text-muted-foreground">
                著作権に関する情報がここに表示されます。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 