import { DeckCard } from "@/features/flashcard/_components/DeckCard";
import { getAllDecks } from "@/lib/content/flashcards";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, List } from "lucide-react";

export const metadata = {
  title: "ITフラッシュカード | Flashcards",
  description: "IT用語や知識を効率的に学習できるフラッシュカードアプリ",
};

export default async function FlashcardsPage() {
  const decks = await getAllDecks();
  // 全カード数の計算
  const totalCards = decks.reduce((total, deck) => total + deck.cardCount, 0);

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          ホームに戻る
        </Link>
        <div className="flex items-center">
          <div className="relative w-8 h-8 mr-3">
            <Image 
              src="/images/flashcards.png" 
              alt="アイコン" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ITフラッシュカード</h1>
        </div>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-muted-foreground">
          学習したいカテゴリを選んでください。各カテゴリには複数の問題カードが含まれています。
          <br />
          <span className="text-sm">合計 {totalCards} 枚のカードがあります</span>
        </p>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href="/flashcards/cards" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            全カード一覧を見る
          </Link>
        </Button>
      </div>

      {decks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <DeckCard 
              key={deck.category}
              category={deck.category}
              title={deck.title}
              cardCount={deck.cardCount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            デッキが見つかりませんでした。フラッシュカードデータを追加してください。
          </p>
        </div>
      )}
    </div>
  );
} 