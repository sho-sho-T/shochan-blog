---
title: 'Markdownスタイルテスト'
publishedAt: '2024-08-01'
status: 'draft'
category: 'Test'
tags: ['markdown', 'table', 'code']
---

# Markdownスタイルテスト

このページはMarkdownの様々な要素のスタイルをテストするためのものです。

## テーブルのスタイリング

以下は異なる配置を持つテーブルの例です。

### シンプルテーブル

| ヘッダー1 | ヘッダー2 | ヘッダー3 |
| -------- | -------- | -------- |
| セル1-1  | セル1-2  | セル1-3  |
| セル2-1  | セル2-2  | セル2-3  |
| セル3-1  | セル3-2  | セル3-3  |

### 配置を指定したテーブル

| 左揃え | 中央揃え | 右揃え |
| :------ | :------: | ------: |
| 左     | 中央    | 右     |
| test   | example | 123    |
| 長いテキスト | 配置のテスト | 200,000 |

## コードブロックのスタイリング

### JavaScript

```javascript
function greet(name) {
  return `こんにちは、${name}さん！`;
}

const result = greet('ユーザー');
console.log(result);
```

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function greetUser(user: User): string {
  return `こんにちは、${user.name}さん！`;
}

const user: User = { id: 1, name: 'テストユーザー' };
console.log(greetUser(user));
```

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# 最初の10個のフィボナッチ数を計算
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")
```

### CSS

```css
.markdown-body {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.markdown-body pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid #ddd;
  padding: 6px 13px;
}

.markdown-body th {
  background-color: #f6f8fa;
  font-weight: 600;
}
```

## インラインコード

文章の中に `const myVariable = "インラインコードテスト";` などのインラインコードを入れると、このようにスタイリングされます。

フォーマットを確認するため、`border-radius: 4px;` や `margin: 0 auto;` など複数のインラインコードサンプルを表示します。 