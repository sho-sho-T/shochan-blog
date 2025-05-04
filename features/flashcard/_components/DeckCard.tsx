import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface DeckCardProps {
  category: string;
  title: string;
  cardCount: number;
}

export function DeckCard({ category, title, cardCount }: DeckCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          カード {cardCount} 枚
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-center py-6">
          <BookOpen className="h-12 w-12 text-muted-foreground" />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/flashcards/${category}`}>
            学習を始める
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 