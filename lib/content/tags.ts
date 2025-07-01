import { createContentAggregator } from './aggregation';

export type TagCount = {
  name: string;
  count: number;
};

/**
 * 全ての公開記事からタグとその記事数を集約して取得する
 * @returns タグ名と記事数の配列 (記事数で降順ソート)
 */
export const getAllTags = createContentAggregator(
  (post) => post.tags,
  (tag) => tag
); 