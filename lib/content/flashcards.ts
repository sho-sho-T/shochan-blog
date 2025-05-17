import fs from 'fs';
import path from 'path';
import { Deck, Flashcard } from './types';

const FLASHCARDS_DIR = path.join(process.cwd(), 'content/flashcards');

/**
 * デッキのタイトルをカテゴリ名から生成する関数
 */
function generateDeckTitle(category: string): string {
  const titleMap: Record<string, string> = {
    'pm': 'プロジェクトマネジメント',
    'ap': '応用情報技術者試験',
    'fe': '基本情報技術者試験',
    'important_aws_services': 'AWS 重要サービス',
    'other_aws_services': 'AWS その他のサービス',
  };

  return titleMap[category] || category.toUpperCase();
}

/**
 * すべてのフラッシュカードデッキの情報を取得する関数
 * カード自体のデータは含まない（カード数のみ）
 */
export async function getAllDecks(): Promise<(Omit<Deck, 'cards'> & { cardCount: number })[]> {
  try {
    // フラッシュカードディレクトリが存在するか確認
    if (!fs.existsSync(FLASHCARDS_DIR)) {
      return [];
    }

    // ディレクトリ内のカテゴリフォルダを取得
    const categories = fs.readdirSync(FLASHCARDS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // 各カテゴリのデッキ情報を取得
    const decks = await Promise.all(
      categories.map(async (category) => {
        const cardsFilePath = path.join(FLASHCARDS_DIR, category, 'cards.json');
        
        // カードファイルが存在するか確認
        if (!fs.existsSync(cardsFilePath)) {
          return null;
        }
        
        // カードデータを読み込む
        const fileContent = fs.readFileSync(cardsFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        return {
          category,
          title: generateDeckTitle(category),
          cardCount: data.cards.length,
        };
      })
    );

    // nullを除外して返す
    return decks.filter(Boolean) as (Omit<Deck, 'cards'> & { cardCount: number })[];
  } catch (error) {
    console.error('Error getting all decks:', error);
    return [];
  }
}

/**
 * 特定のカテゴリのデッキデータを取得する関数
 * カード情報を含む
 */
export async function getDeckByCategory(category: string): Promise<Deck | null> {
  try {
    const cardsFilePath = path.join(FLASHCARDS_DIR, category, 'cards.json');
    
    // カードファイルが存在するか確認
    if (!fs.existsSync(cardsFilePath)) {
      return null;
    }
    
    // カードデータを読み込む
    const fileContent = fs.readFileSync(cardsFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return {
      category,
      title: generateDeckTitle(category),
      cards: data.cards as Flashcard[],
    };
  } catch (error) {
    console.error(`Error getting deck for category ${category}:`, error);
    return null;
  }
} 