---
title: 'TypeScriptとReact Hooksを使いこなす: カスタムフックの基本'
publishedAt: '2024-07-27'
status: 'draft'
category: 'TypeScript'
tags: ['react', 'typescript', 'hooks', 'custom-hook']
---

React Hooks は、関数コンポーネントで状態やライフサイクル機能を利用するための強力な機能です。特に、`useState` や `useEffect` を組み合わせることで、再利用可能なロジックを**カスタムフック**として抽出できます。この記事では、TypeScript を使用して型安全なカスタムフックを作成する基本的な方法を紹介します。

## カスタムフックとは？

カスタムフックは、`use` で始まる JavaScript 関数で、他のフック（`useState`, `useEffect` など）を呼び出すことができます。これにより、コンポーネント間でロジックを共有し、コードをよりクリーンで再利用しやすく保つことができます。

例えば、以下のような共通のニーズがあります:

*   API からデータをフェッチする処理
*   ローカルストレージとの同期
*   フォーム入力の管理
*   ウィンドウサイズの監視

これらはカスタムフックとして実装するのに適しています。

## TypeScript でカスタムフックを作成する

TypeScript を使うことで、カスタムフックの引数や戻り値に型を付け、開発中のエラーを防ぎ、コードの可読性を向上させることができます。

### 例: データフェッチ用のカスタムフック

以下は、指定された URL からデータをフェッチするシンプルなカスタムフック `useFetch` の例です。

```typescript
import { useState, useEffect } from 'react';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json() as T;
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // クリーンアップ関数
    return () => {
      // 必要であれば、進行中のフェッチをキャンセルするロジックをここに追加
    };
  }, [url]); // urlが変わったら再フェッチ

  return { data, loading, error };
}

export default useFetch;
```

### カスタムフックの使い方

作成した `useFetch` フックは、コンポーネント内で以下のように使用できます。

```tsx
import React from 'react';
import useFetch from './useFetch'; // 作成したカスタムフックをインポート

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user data</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
```

## カスタムフックの利点

| 利点                 | 説明                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| **再利用性**         | 同じロジックを複数のコンポーネントで簡単に共有できる。                  |
| **可読性・保守性** | コンポーネントのロジックがシンプルになり、関心事が分離される。             |
| **型安全性**         | TypeScript により、インターフェースが明確になり、エラーを早期に発見できる。 |
| **テスト容易性**     | フック自体を独立してテストできる。                                     |

> 注意: カスタムフックのルール（トップレベルでのみ呼び出す、`if` 文やループ内で呼び出さないなど）を守ることが重要です。

カスタムフックは React 開発において非常に強力なツールです。TypeScript と組み合わせることで、より堅牢でメンテナンスしやすいアプリケーションを構築できます。

[React 公式ドキュメント - カスタムフックの構築](https://react.dev/learn/reusing-logic-with-custom-hooks) 