import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロフィール | Shochan.dev",
  description: "Shochanのプロフィール情報",
};

export default function ProfilePage() {
  return (
    <div className="container max-w-3xl py-12">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 mb-4 bg-primary-foreground rounded-full flex items-center justify-center">
          {/* ここにアイコンを表示する場合は、適切なアイコンを挿入 */}
          <span className="text-4xl">🌵</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Shochanのプロフィール</h1>
        <time className="text-sm text-muted-foreground" dateTime="2024-04-21">
          更新日: 2024年4月21日
        </time>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">基本情報</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left bg-muted/50 w-1/4">名前</th>
                  <td className="py-3 px-4">Shochan</td>
                </tr>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left bg-muted/50">職業</th>
                  <td className="py-3 px-4">フロントエンドエンジニア (2023年現在)</td>
                </tr>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left bg-muted/50">経歴</th>
                  <td className="py-3 px-4">
                    <div>1年目：大手IT企業でWebアプリケーション開発</div>
                    <div>2年目：現在のフロントエンド開発チームにジョイン</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">運営しているサイト・サービス</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left bg-muted/50">サイト名</th>
                  <th className="py-3 px-4 text-left bg-muted/50">概要</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-primary">Shochan Blog</td>
                  <td className="py-3 px-4">技術ブログ</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-primary">Shochan Tools</td>
                  <td className="py-3 px-4">便利なWeb開発ツールを公開しているサイト</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 