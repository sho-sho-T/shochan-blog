import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getAllDecks, getDeckByCategory } from "@/lib/content/flashcards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "カード一覧 | ITフラッシュカード",
  description: "すべてのフラッシュカードを一覧で表示します",
};

export default async function AllCardsPage() {
  // まずデッキ情報を取得
  const deckInfos = await getAllDecks();
  const allDecksWithCards = [];
  
  // 各デッキのカードデータを取得
  for (const deckInfo of deckInfos) {
    const deck = await getDeckByCategory(deckInfo.category);
    if (deck && deck.cards && deck.cards.length > 0) {
      allDecksWithCards.push(deck);
    }
  }

  // 全カード数をカウント
  const totalCardCount = allDecksWithCards.reduce(
    (total, deck) => total + deck.cards.length, 
    0
  );

  // デッキをソート
  const sortedDecks = allDecksWithCards.sort((a, b) => 
    a.title.localeCompare(b.title)
  );

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
          <h1 className="text-3xl font-bold tracking-tight">全カード一覧</h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground">
          全{totalCardCount}枚のカードをカテゴリ別に表示します。タブを切り替えて各カテゴリのカードを確認できます。
        </p>
      </div>

      <Tabs defaultValue={sortedDecks[0]?.category || ""} className="w-full">
        <TabsList className="mb-6 w-full flex overflow-x-auto">
          {sortedDecks.map((deck) => (
            <TabsTrigger 
              key={deck.category} 
              value={deck.category}
              className="flex-shrink-0"
            >
              {deck.title} ({deck.cards.length})
            </TabsTrigger>
          ))}
        </TabsList>
        
        {sortedDecks.map((deck) => (
          <TabsContent key={deck.category} value={deck.category} className="mt-0">
            <div className="rounded-lg border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{deck.title}</h2>
                <Link 
                  href={`/flashcards/${deck.category}`}
                  className="text-sm text-primary hover:underline"
                >
                  このデッキで学習する →
                </Link>
              </div>
              
              <div className="grid gap-4">
                {deck.cards.map((card) => (
                  <div 
                    key={card.id} 
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-full pr-4">
                        <h3 className="text-lg font-medium mb-2">{card.question}</h3>
                        <div className="text-sm text-muted-foreground border-t pt-2 mt-2">
                          <p>{card.answer}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full flex-shrink-0">
                        {card.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 