"use client";

import { useState } from "react";
import { Deck } from "@/lib/content/types";
import { Flashcard } from "./Flashcard";
import { Button } from "@/components/ui/button";

export function ClientFlashcards({ deck }: { deck: Deck }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const isLastCard = currentCardIndex === deck.cards.length - 1;

  const handleNextCard = () => {
    if (isLastCard) {
      // 最終カードの場合はインデックスをリセット
      setCurrentCardIndex(0);
    } else {
      // 次のカードへ
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
  };

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div>
      {isLastCard ? (
        <div className="flex flex-col space-y-4 items-center">
          <Flashcard
            card={currentCard}
            onNext={handleNextCard}
            totalCards={deck.cards.length}
            currentIndex={currentCardIndex}
          />
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">最後のカードです。最初から復習しますか？</p>
            <Button onClick={handleRestart}>最初からやり直す</Button>
          </div>
        </div>
      ) : (
        <Flashcard
          card={currentCard}
          onNext={handleNextCard}
          totalCards={deck.cards.length}
          currentIndex={currentCardIndex}
        />
      )}
    </div>
  );
} 