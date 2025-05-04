"use client";

import { useEffect, useState } from "react";
import { Deck } from "@/lib/content/types";
import { Flashcard } from "./Flashcard";
import { Button } from "@/components/ui/button";
import { 
  getFlashcardProgress, 
  saveFlashcardProgress, 
  resetFlashcardProgress,
  FlashcardProgress 
} from "@/lib/utils/local-storage";
import { RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ClientFlashcards({ deck }: { deck: Deck }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const isLastCard = currentCardIndex === deck.cards.length - 1;
  const progressPercentage = completedCards.length > 0 
    ? Math.round((completedCards.length / deck.cards.length) * 100) 
    : 0;

  // ローカルストレージから進捗を読み込む
  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = getFlashcardProgress(deck.category);
      if (savedProgress) {
        setCurrentCardIndex(savedProgress.lastCardIndex);
        setCompletedCards(savedProgress.completedCards);
      }
      setIsLoaded(true);
    };
    
    loadProgress();
  }, [deck.category]);

  // 進捗を保存する
  const saveProgress = () => {
    if (!isLoaded) return;
    
    const progress: FlashcardProgress = {
      lastCardIndex: currentCardIndex,
      completedCards: completedCards,
      lastStudiedAt: new Date().toISOString()
    };
    
    saveFlashcardProgress(deck.category, progress);
  };

  // 進捗が変わったら保存
  useEffect(() => {
    saveProgress();
  }, [currentCardIndex, completedCards, isLoaded]);

  const handleCardComplete = () => {
    // まだ完了していないカードを完了済みに追加
    if (!completedCards.includes(currentCardIndex)) {
      setCompletedCards([...completedCards, currentCardIndex]);
    }
  };

  const handleNextCard = () => {
    // 現在のカードを完了済みに追加
    handleCardComplete();
    
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

  const handleReset = () => {
    if (confirm('学習進捗をリセットしますか？このアクションは元に戻せません。')) {
      setCurrentCardIndex(0);
      setCompletedCards([]);
      resetFlashcardProgress(deck.category);
    }
  };

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">
            進捗状況: {completedCards.length} / {deck.cards.length} 枚完了
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-muted-foreground"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            進捗をリセット
          </Button>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {isLastCard ? (
        <div className="flex flex-col space-y-4 items-center">
          <Flashcard
            card={currentCard}
            onNext={handleNextCard}
            totalCards={deck.cards.length}
            currentIndex={currentCardIndex}
            isCompleted={completedCards.includes(currentCardIndex)}
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
          isCompleted={completedCards.includes(currentCardIndex)}
        />
      )}
    </div>
  );
} 