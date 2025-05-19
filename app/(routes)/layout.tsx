import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/header-server";
import { Footer } from "@/components/layout/footer";

const zen = Zen_Maru_Gothic({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Shochan.dev",
  description: "雑に学習、学びなどを投稿します",
  openGraph: {
    title: "Shochan.dev",
    description: "雑に学習、学びなどを投稿します",
    type: "website",
    url: "https://shochan-blog.vercel.app",
  },
  alternates: {
    canonical: "https://shochan-blog.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={zen.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 flex justify-center items-start">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
