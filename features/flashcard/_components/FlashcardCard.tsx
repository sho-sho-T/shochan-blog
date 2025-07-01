import { Flashcard } from "./Flashcard";
import { FlashcardControls } from "./FlashcardControls";
import { Flashcard as FlashcardType } from "@/lib/content/types";

interface FlashcardCardProps {
  card: FlashcardType;
  onNext: () => void;
  totalCards: number;
  currentIndex: number;
  isCompleted: boolean;
  isLastCard: boolean;
  onRestart: () => void;
}

export function FlashcardCard({
  card,
  onNext,
  totalCards,
  currentIndex,
  isCompleted,
  isLastCard,
  onRestart
}: FlashcardCardProps) {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <Flashcard
        card={card}
        onNext={onNext}
        totalCards={totalCards}
        currentIndex={currentIndex}
        isCompleted={isCompleted}
      />
      <FlashcardControls
        isLastCard={isLastCard}
        onRestart={onRestart}
      />
    </div>
  );
}