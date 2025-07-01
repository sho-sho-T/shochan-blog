import { createContentAggregator } from './aggregation';

export type CategoryCount = {
  name: string;
  count: number;
};

/**
 * 全ての公開記事からカテゴリとその記事数を集約して取得する
 * @returns カテゴリ名と記事数の配列 (記事数で降順ソート)
 */
export const getAllCategories = createContentAggregator(
  (post) => post.category,
  (category) => category
); 