import { useCallback } from 'react';

interface UseFlashcardNavigationProps {
  currentCardIndex: number;
  setCurrentCardIndex: (index: number) => void;
  completedCards: number[];
  setCompletedCards: (cards: number[]) => void;
  totalCards: number;
}

export function useFlashcardNavigation({
  currentCardIndex,
  setCurrentCardIndex,
  completedCards,
  setCompletedCards,
  totalCards
}: UseFlashcardNavigationProps) {
  const isLastCard = currentCardIndex === totalCards - 1;

  const handleCardComplete = useCallback(() => {
    // まだ完了していないカードを完了済みに追加
    if (!completedCards.includes(currentCardIndex)) {
      setCompletedCards([...completedCards, currentCardIndex]);
    }
  }, [currentCardIndex, completedCards, setCompletedCards]);

  const handleNextCard = useCallback(() => {
    // 現在のカードを完了済みに追加
    handleCardComplete();
    
    if (isLastCard) {
      // 最終カードの場合はインデックスをリセット
      setCurrentCardIndex(0);
    } else {
      // 次のカードへ
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }, [handleCardComplete, isLastCard, currentCardIndex, setCurrentCardIndex]);

  const handleRestart = useCallback(() => {
    setCurrentCardIndex(0);
  }, [setCurrentCardIndex]);

  return {
    isLastCard,
    handleCardComplete,
    handleNextCard,
    handleRestart
  };
}