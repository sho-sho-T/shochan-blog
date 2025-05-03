import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "プロフィール | Shochan.dev",
  description: "Shochanのプロフィール情報",
};

// 技術の型定義
interface Tech {
  name: string;
  icon: string;
}

interface TechCategory {
  name: string;
  techs: Tech[];
}

interface LoadingCategory {
  name: string;
  count: number;
}

// 技術スタックのローディングコンポーネント
function TechStackLoading() {
  // カテゴリとそれぞれのカテゴリに表示するプレースホルダーの数
  const categories: LoadingCategory[] = [
    { name: "言語", count: 3 },
    { name: "フレームワーク", count: 1 },
    { name: "AI", count: 3 }
  ];

  return (
    <div className="w-full space-y-8">
      {categories.map((category) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-lg font-medium border-l-4 border-primary pl-3">{category.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(category.count)].map((_, i) => (
              <div key={i} className="h-28 rounded-lg bg-gray-100 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 技術スタックコンポーネント
function TechStack() {
  // 技術スタックの定義（カテゴリ別）
  const techCategories: TechCategory[] = [
    { 
      name: "言語", 
      techs: [
        { name: "TypeScript", icon: "/images/icons/typescript.png" },
        { name: "JavaScript", icon: "/images/icons/javascript.png" },
        { name: "Ruby", icon: "/images/icons/ruby.png" },
      ]
    },
    { 
      name: "フレームワーク", 
      techs: [
        { name: "Next.js", icon: "/images/icons/nextjs.png" },
        { name: "React", icon: "/images/icons/react.png" },
        { name: "Ruby on Rails", icon: "/images/icons/rails.png" },
      ]
    },
    {
      name: "AI関連", 
      techs: [
        { name: "Gemini", icon: "/images/icons/llms/gemini.png" },
        { name: "Claude", icon: "/images/icons/llms/claude.png" },
        { name: "ChatGPT", icon: "/images/icons/llms/chatgpt.png" },
        { name: "Cursor", icon: "/images/icons/cursor.png" },
      ]
    }
  ];

  return (
    <div className="w-full space-y-8">
      {techCategories.map((category) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-lg font-medium border-l-4 border-primary pl-3">{category.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {category.techs.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 relative mb-3">
                  <Image 
                    src={tech.icon} 
                    alt={`${tech.name} アイコン`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                    priority={tech.name === "TypeScript" || tech.name === "JavaScript"}
                  />
                </div>
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  // 基本情報の定義
  const basicInfo = [
    { label: "名前", value: "Shochan" },
    { label: "生年月", value: "2000年6月" },
    { label: "出身地", value: "島根県" },
    { label: "好きな食べ物", value: "納豆、生姜焼き、寿司" },
    { label: "趣味", value: "釣り、読書" },
    { label: "好きな言語", value: "TypeScript, Ruby" },
    { label: "好きなフレームワーク", value: "Next.js" },
    { label: "プログラミング歴", value: "2年" },
  ];

  return (
    <div className="w-full flex justify-center px-4 md:px-6">
      <div className="max-w-3xl w-full py-12 overflow-hidden">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden flex items-center justify-center">
            <Image 
              src="/images/profile.png" 
              alt="プロフィール画像" 
              width={96} 
              height={96} 
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center break-words px-4">Shochanのプロフィール</h1>
          <time className="text-sm text-muted-foreground" dateTime="2025-05-01">
            更新日: 2025年5月1日
          </time>
        </div>

        <div className="space-y-12 px-4 md:px-0">
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">基本情報</h2>
            <div className="w-full max-w-xl border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y">
                  {basicInfo.map((info) => (
                    <tr key={info.label} className="hover:bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium bg-gray-50 w-1/3">{info.label}</th>
                      <td className="py-3 px-4">{info.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">触っている技術</h2>
            <Suspense fallback={<TechStackLoading />}>
              <TechStack />
            </Suspense>
          </section>
          
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">興味のある分野</h2>
            <div className="w-full">
              <ul className="list-disc pl-6 space-y-2">
                <li>AI関連の最新技術</li>
                <li>アプリケーションアーキテクチャ</li>
                <li>AIを活用した開発支援ツール</li>
                <li>プロジェクトマネジメント</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 