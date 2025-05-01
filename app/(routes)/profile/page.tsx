import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "プロフィール | Shochan.dev",
  description: "Shochanのプロフィール情報",
};

export default function ProfilePage() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full py-12">
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
          <h1 className="text-3xl font-bold mb-2 text-center">Shochanのプロフィール</h1>
          <time className="text-sm text-muted-foreground" dateTime="2024-04-21">
            更新日: 2025年5月1日
          </time>
        </div>

        <div className="space-y-12">
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-center w-full">基本情報</h2>
            <p className="text-center text-muted-foreground">
              ここにプロフィール情報が表示されます。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 