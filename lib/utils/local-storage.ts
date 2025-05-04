// ローカルストレージ用のキー定数
export const STORAGE_KEYS = {
  FLASHCARD_PROGRESS: 'flashcard-progress',
};

// フラッシュカードの進捗情報の型定義
export interface FlashcardProgress {
  lastCardIndex: number;
  completedCards: number[];
  lastStudiedAt: string;
}

// カテゴリー別の進捗情報を格納するマップの型定義
export interface FlashcardProgressMap {
  [category: string]: FlashcardProgress;
}

/**
 * フラッシュカードの進捗情報を保存する
 */
export function saveFlashcardProgress(category: string, progress: FlashcardProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    // 既存のデータを取得
    const storedData = localStorage.getItem(STORAGE_KEYS.FLASHCARD_PROGRESS);
    const progressMap: FlashcardProgressMap = storedData ? JSON.parse(storedData) : {};
    
    // 新しいデータを追加
    progressMap[category] = progress;
    
    // 保存
    localStorage.setItem(STORAGE_KEYS.FLASHCARD_PROGRESS, JSON.stringify(progressMap));
  } catch (error) {
    console.error('フラッシュカードの進捗情報の保存に失敗しました', error);
  }
}

/**
 * フラッシュカードの進捗情報を取得する
 */
export function getFlashcardProgress(category: string): FlashcardProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.FLASHCARD_PROGRESS);
    if (!storedData) return null;
    
    const progressMap: FlashcardProgressMap = JSON.parse(storedData);
    return progressMap[category] || null;
  } catch (error) {
    console.error('フラッシュカードの進捗情報の取得に失敗しました', error);
    return null;
  }
}

/**
 * すべてのフラッシュカードの進捗情報を取得する
 */
export function getAllFlashcardProgress(): FlashcardProgressMap {
  if (typeof window === 'undefined') return {};
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.FLASHCARD_PROGRESS);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('フラッシュカードの進捗情報の取得に失敗しました', error);
    return {};
  }
}

/**
 * フラッシュカードの進捗情報をリセットする
 */
export function resetFlashcardProgress(category: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.FLASHCARD_PROGRESS);
    if (!storedData) return;
    
    const progressMap: FlashcardProgressMap = JSON.parse(storedData);
    delete progressMap[category];
    
    localStorage.setItem(STORAGE_KEYS.FLASHCARD_PROGRESS, JSON.stringify(progressMap));
  } catch (error) {
    console.error('フラッシュカードの進捗情報のリセットに失敗しました', error);
  }
} 