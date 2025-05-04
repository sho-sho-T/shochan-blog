import { getAllDecks, getDeckByCategory } from "@/lib/content/flashcards";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ClientFlashcards } from "@/features/flashcard/_components/ClientFlashcards";

interface FlashcardCategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const decks = await getAllDecks();
  return decks.map((deck) => ({
    category: deck.category,
  }));
}

export async function generateMetadata({ params }: FlashcardCategoryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  const deck = await getDeckByCategory(category);
  
  if (!deck) {
    return {
      title: "デッキが見つかりません",
      description: "指定されたフラッシュカードデッキは存在しません。",
    };
  }

  return {
    title: `${deck.title} | フラッシュカード`,
    description: `${deck.title}のフラッシュカードで学習します。全${deck.cards.length}カード。`,
  };
}

export default async function FlashcardCategoryPage({ params }: FlashcardCategoryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

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
        <h1 className="text-3xl font-bold tracking-tight">{deck.title}</h1>
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