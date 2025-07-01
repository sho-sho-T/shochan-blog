import { useEffect, useState, useCallback } from 'react';
import { 
  getFlashcardProgress, 
  saveFlashcardProgress, 
  resetFlashcardProgress,
  FlashcardProgress 
} from '@/lib/utils/local-storage';

export function useFlashcardProgress(category: string) {
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // ローカルストレージから進捗を読み込む
  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = getFlashcardProgress(category);
      if (savedProgress) {
        setCurrentCardIndex(savedProgress.lastCardIndex);
        setCompletedCards(savedProgress.completedCards);
      }
      setIsLoaded(true);
    };
    
    loadProgress();
  }, [category]);

  // 進捗を保存する
  const saveProgress = useCallback(() => {
    if (!isLoaded) return;
    
    const progress: FlashcardProgress = {
      lastCardIndex: currentCardIndex,
      completedCards: completedCards,
      lastStudiedAt: new Date().toISOString()
    };
    
    saveFlashcardProgress(category, progress);
  }, [currentCardIndex, completedCards, isLoaded, category]);

  // 進捗が変わったら保存
  useEffect(() => {
    saveProgress();
  }, [saveProgress]);

  const resetProgress = useCallback(() => {
    if (confirm('学習進捗をリセットしますか？このアクションは元に戻せません。')) {
      setCurrentCardIndex(0);
      setCompletedCards([]);
      resetFlashcardProgress(category);
    }
  }, [category]);

  return {
    completedCards,
    currentCardIndex,
    isLoaded,
    setCompletedCards,
    setCurrentCardIndex,
    resetProgress
  };
}