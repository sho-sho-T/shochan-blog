"use client";

import { Deck } from "@/lib/content/types";
import { useFlashcardProgress } from "./hooks/useFlashcardProgress";
import { useFlashcardNavigation } from "./hooks/useFlashcardNavigation";
import { FlashcardProgress } from "./FlashcardProgress";
import { FlashcardCard } from "./FlashcardCard";

export function ClientFlashcards({ deck }: { deck: Deck }) {
  const {
    completedCards,
    currentCardIndex,
    isLoaded,
    setCompletedCards,
    setCurrentCardIndex,
    resetProgress
  } = useFlashcardProgress(deck.category);

  const {
    isLastCard,
    handleNextCard,
    handleRestart
  } = useFlashcardNavigation({
    currentCardIndex,
    setCurrentCardIndex,
    completedCards,
    setCompletedCards,
    totalCards: deck.cards.length
  });

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div>
      <FlashcardProgress
        completedCount={completedCards.length}
        totalCount={deck.cards.length}
        onReset={resetProgress}
      />

      <FlashcardCard
        card={currentCard}
        onNext={handleNextCard}
        totalCards={deck.cards.length}
        currentIndex={currentCardIndex}
        isCompleted={completedCards.includes(currentCardIndex)}
        isLastCard={isLastCard}
        onRestart={handleRestart}
      />
    </div>
  );
} 