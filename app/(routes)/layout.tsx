import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/header-server";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 flex justify-center items-start">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
