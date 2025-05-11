---
title: 'レストランで理解するNext.jsのServer Components'
publishedAt: '2025-05-09'
status: 'published'
category: 'NextJS'
tags: ['nextjs', 'react', 'server-components']
---

Next.jsのServer Componentsは理解しづらい概念だが、レストランに例えると分かりやすくなる。この記事では、レストランの例えを使って、Server Componentsの基本概念と活用法を簡潔に解説していく。

## レストランとしてのWebアプリケーション

従来のReactアプリケーションでは、お客さん（ブラウザ）が注文（アクセス）すると、レシピ本と調理器具一式（JavaScript）を渡され、自分でお皿（UI）を作る仕組みだった。これではお客さんの負担が大きすぎる。

Server Componentsは、この常識を覆す新しいアプローチだ。レストランのキッチン（サーバー）とホール（クライアント）の分業のように、作業を最適な場所で行う：

- **キッチン（サーバー側）**: 複雑な料理の準備、食材の下処理、重い調理器具を使った作業
- **ホール（クライアント側）**: お客さんとの対話、テーブルでの最終的な仕上げ、注文の受け付け

お客さん（ブラウザ）は完成した料理（HTML）だけを受け取り、必要最小限の対応だけを担当するようになる。

## Server Componentsのメリット：レストランの例え

| メリット | レストランでの例え |
| --- | --- |
| **バンドルサイズの削減** | お客さんがレシピ本全体を持ち歩く必要がなくなる |
| **初期ロード時間の短縮** | 料理が出来上がった状態で提供される |
| **SEO対応** | 食品評論家（検索エンジン）が実際の料理を見て評価できる |
| **データアクセスの簡素化** | シェフが直接食材庫（データベース）にアクセスできる |
| **セキュリティの向上** | 秘伝のレシピ（機密処理）を公開せずに済む |

## 従来のアプローチとServer Componentsの違い

### 従来のアプローチ（Client-Side Rendering）：
お客さん（ブラウザ）に材料と調理器具を渡して、自分で料理（UI）を作ってもらう方法。時間がかかり、お客さんの端末によっては重い処理になる。

### 改善されたアプローチ（SSR + ハイドレーション）：
料理を半分作った状態でお客さんに提供し、最後の仕上げをお客さんにしてもらう方法。しかし、最終的には調理器具一式をお客さんに渡す必要がある。

### Server Components：
キッチン（サーバー）で完全に料理を仕上げ、お客さんには完成品だけを提供する。お客さんが「調味料を追加したい」などの要望がある場合のみ、必要最小限の道具を渡す。

## Server ComponentsとClient Componentsの使い分け

```tsx
// キッチン（サーバー）とホール（クライアント）の連携例
// components/OrderForm.jsx - ホールで使用するコンポーネント
'use client'

import { useState } from 'react';

export default function OrderForm() {
  const [specialRequest, setSpecialRequest] = useState('');

  return (
    <div>
      <input 
        value={specialRequest}
        onChange={(e) => setSpecialRequest(e.target.value)}
        placeholder="何かご要望はありますか？"
      />
      <button>注文する</button>
    </div>
  );
}
```

```tsx
// app/menu/page.jsx - 全体の構成を担当するサーバーコンポーネント
import { getDailySpecials } from '@/lib/menu';
import OrderForm from '@/components/OrderForm';

export default async function MenuPage() {
  // キッチンで今日のスペシャルメニューを準備
  const specials = await getDailySpecials();
  
  return (
    <div>
      <h1>本日のおすすめ</h1>
      <ul>
        {specials.map(item => (
          <li key={item.id}>{item.name} - {item.price}円</li>
        ))}
      </ul>
      
      {/* ホールスタッフ（クライアントコンポーネント）に特別注文の受付を任せる */}
      <OrderForm />
    </div>
  );
}
```

この例では、静的なメニュー表示はキッチン（サーバー）で、対話的な注文フォームはホール（クライアント）で処理している。それぞれの役割に応じた最適な分担となっている。

Server Componentsにも制限がある：

1. **キッチンからお客さんの様子が見えない**: サーバーからはブラウザの状態が見えないため、window/documentなどは使えない
2. **お客さんの行動に直接反応できない**: キッチン（サーバー）ではクリックなどのイベントを直接処理できない
3. **キッチンに記憶力はない**: useState/useEffectはクライアント側の機能なので使えない

これらの制限がある場合は、その部分だけをホール（クライアント）の仕事として分離する必要がある。

## まとめ

Next.jsのServer Componentsは、ウェブ開発における「レストラン革命」と言える。これまでブラウザに負担をかけていた作業を適切にサーバーで行い、それぞれが得意な役割に集中できるようになった。

キッチン（サーバー）では複雑な料理の準備を、ホール（クライアント）ではお客さんとの対話を担当することで、より良いユーザー体験とパフォーマンスを両立できる。

この新しいレストラン方式は、ユーザーにもプログラマーにも優しいウェブアプリケーションの開発を可能にしている。 