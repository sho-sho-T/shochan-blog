import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flashcard as FlashcardType } from "@/lib/content/types";
import { ChevronRight, Eye, CheckCircle } from "lucide-react";

interface FlashcardProps {
  card: FlashcardType;
  onNext: () => void;
  totalCards: number;
  currentIndex: number;
  isCompleted?: boolean;
}

export function Flashcard({ 
  card, 
  onNext, 
  totalCards, 
  currentIndex,
  isCompleted = false 
}: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">
            質問 ({currentIndex + 1}/{totalCards})
          </div>
          {isCompleted && (
            <div className="flex items-center text-sm text-green-500">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>完了</span>
            </div>
          )}
        </div>
        <div className="text-xl font-semibold mb-6 min-h-[4rem]">
          {card.question}
        </div>

        {showAnswer ? (
          <div className="border-t pt-4">
            <div className="text-sm text-muted-foreground mb-2">
              回答
            </div>
            <div className="text-lg mb-4 min-h-[4rem]">
              {card.answer}
            </div>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center border rounded-md">
            <Button onClick={handleShowAnswer} className="gap-2">
              <Eye className="h-4 w-4" />
              答えを見る
            </Button>
          </div>
        )}
      </CardContent>

      {showAnswer && (
        <CardFooter className="justify-end pt-2 pb-4">
          <Button onClick={handleNext} className="gap-2">
            次のカードへ
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 