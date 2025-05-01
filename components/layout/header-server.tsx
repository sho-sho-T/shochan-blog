import { getAllCategories } from "@/lib/content/categories";
import { getAllTags } from "@/lib/content/tags";
import { HeaderUI } from "./header";

// サーバーコンポーネント: データ取得のみを担当
export async function Header() {
  // カテゴリとタグのデータを取得
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // データをクライアントコンポーネントに渡す
  return <HeaderUI categories={categories} tags={tags} />;
} 