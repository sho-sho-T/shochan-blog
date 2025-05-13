---
title: 'Next.jsにおけるハイドレーションエラーの原因と対策'
publishedAt: '2025-05-13'
status: 'published'
category: 'NextJS'
tags: ['nextjs', 'hydration', 'error']
---

## はじめに

案件でNext.jsを用いたフロントエンド開発をしていますが、実装中にハイドレーションマッチエラーが起きて少し詰まったので備忘録として執筆します :memo:

## ハイドレーションとは？

Next.jsでは、初回アクセス時にサーバー側でHTMLを生成し、それをクライアントに送信します（SSR）。その後、クライアント側ではJavaScriptがロードされ、このHTMLに命を吹き込むプロセス（onClickなどのインタラクティブな動作をできるようにする）が発生します。これをハイドレーションと言います。

ハイドレーションでは、以下のことが行われます：
1. サーバーで生成されたHTMLが素早くブラウザに表示される
2. クライアント側でJavaScriptがロードされる
3. Reactがこの静的なHTMLに対して、イベントリスナーの追加などの処理を行い、インタラクティブな状態にする

このハイドレーションでは、HTMLをインタラクティブにするだけではなく、**サーバーサイドでレンダリングされたコンテンツ**と、**クライアントサイドでレンダリングされたコンテンツ**が**同一か確認**します

## uuid v4によるハイドレーションミスマッチ

案件ではformライブラリに「conform」を採用していて、フォームのリセットする際にformのidを更新する処理を行います。
このformのidを更新する際に使用するのが[uuid](https://github.com/uuidjs/uuid)のv4という**実行されるたびに異なる値を返す**関数なのですが、このUUID生成君の扱い方の問題でハイドレーションミスマッチが起きていました。

サーバーサイドレンダリング時にuuid v4を呼び出すと、サーバー上でIDが生成されます。その後、クライアント側の初回レンダリング時に再度uuid v4が呼び出されると、異なるIDが生成されます。この結果、サーバーとクライアントで異なるHTMLが生成され、Reactはこの不一致を検出してハイドレーションエラーを発生させます。

具体的なエラーメッセージは次のようになります：
```text
Warning: Text content did not match.
Server: "123e4567-e89b-12d3-a456-426614174000" 
Client: "98765432-abcd-4321-efgh-987654321000"
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

## コード例と解決策

以下のようなコードでこの問題が起きてました：

```tsx
"use client";

import { useForm } from "@conform-to/react";
import { useState } from "react";
import { v4 } from "uuid";
...

export const ExampleContainer = ({
  initialValues,
  onSearch,
}: ExampleContainerProps) => {
  // 問題のある実装
  const [formInstanceKey, setFormInstanceKey] = useState(V4()); // サーバーとクライアントで異なる値が生成される
  
  const [form, fields] = useForm<Example>({
    id: `example-form-${formInstanceKey}`,
    defaultValue: {
      keyword: "",
      // 他のフォームフィールド...
    },
  });
  
  // 以下、コンポーネントの残りの部分...
};
```

この実装では、コンポーネントのレンダリング時に毎回 `v4()` が呼び出されてサーバーとクライアントで異なるIDが生成されていました。

### 解決策：useEffectでクライアント側のみで生成する

この問題を解決するために、`useEffect`フックを使用してクライアント側でのみUUIDを生成するように変更しました：

```tsx
"use client";

import { useForm } from "@conform-to/react";
import { useState } from "react";
import { v4 } from "uuid";
...

export const ExampleContainer = ({
  initialValues,
  onSearch,
}: ExampleContainerProps) => {
  // 空の文字列で初期化
  const [formInstanceKey, setFormInstanceKey] = useState("");

  useEffect(() => {
    setFormInstanceKey(v4());    // client 側でフォームのインスタンスキーを生成させる
  }, []);

  const [form, fields] = useForm<Example>({
    id: `example-form-${formInstanceKey}`,
    defaultValue: {
      keyword: "",
      // 他のフォームフィールド...
    },
  });
  
  // 以下、コンポーネントの残りの部分...
};
```

このアプローチでは：

1. 初期レンダリング時（サーバーとクライアント両方）では、`formInstanceKey`は空の文字列になります
2. クライアント側でのみ`useEffect`が実行され、そこで`v4()`を呼び出してUUIDを生成します
3. これにより、サーバーとクライアントの初期レンダリングで同じHTMLが生成されるため、ハイドレーションミスマッチが発生しなくなります

この解決法がベストなのかは分かりませんが、一旦ハイドレーションミスマッチエラーは解消されます。
uuidの他にも時間依存のAPI使用でも同じようなエラーが起こります（Date()とか）
## 参考リンク

- [Next.js公式ドキュメント: React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)
- [React公式ドキュメント: ハイドレーション](https://ja.react.dev/reference/react-dom/client/hydrateRoot)

