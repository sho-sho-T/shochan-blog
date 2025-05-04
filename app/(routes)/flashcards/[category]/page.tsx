import { getAllDecks, getDeckByCategory } from "@/lib/content/flashcards";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ClientFlashcards } from "@/features/flashcard/_components/ClientFlashcards";

export async function generateStaticParams() {
  const decks = await getAllDecks();
  return decks.map((deck) => ({
    category: deck.category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  const deck = await getDeckByCategory(category);
  
  if (!deck) {
    return {
      title: "デッキが見つかりません | ITフラッシュカード",
      description: "指定されたフラッシュカードデッキは存在しません。",
    };
  }

  return {
    title: `${deck.title} | ITフラッシュカード`,
    description: `${deck.title}のフラッシュカードで学習します。全${deck.cards.length}カード。`,
  };
}

export default async function FlashcardCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const deck = await getDeckByCategory(category);

  if (!deck || !deck.cards.length) {
    notFound();
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/flashcards" className="flex items-center text-muted-foreground hover:text-foreground mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          デッキ一覧に戻る
        </Link>
        <div className="flex items-center">
          <div className="relative w-7 h-7 mr-3">
            <Image 
              src="/images/flashcards.png" 
              alt="アイコン" 
              width={28} 
              height={28}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{deck.title}</h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground">
          全{deck.cards.length}枚のカードがあります。「答えを見る」をクリックして答えを確認し、「次のカードへ」で次に進みます。
        </p>
      </div>

      <ClientFlashcards deck={deck} />
    </div>
  );
} 