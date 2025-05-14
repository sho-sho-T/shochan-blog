---
title: 'formライブラリのConformとshadcn-uiのSelectコンポーネントで動作不良が起きたときの原因と対策'
publishedAt: '2025-05-14'
status: 'published'
category: 'NextJS'
tags: ['nextjs', 'react', 'error']
---

## 発生した問題

conformの`useForm`を用いてフォームを管理する際、セレクトコンポーネント（Shadcn UI/Radix UIベース）の選択状態が正しく反映されない問題が発生しました。具体的には次のような状況です：

1. セレクトボックスで値を選択する
2. 別の値を選択しようとする
3. UIには最初に選択した値が表示されたままになる

## 原因

調べてみた感じ、以下の問題っぽかったです。

1. **イベント発火の問題**：
   - Conformはネイティブフォームイベント（input、change、blur）を監視して状態を管理している
   - カスタムUIコンポーネントはこれらのイベントを自動的に発火しない
  
## 解決策
（例）：

```tsx
export const ExampleSelect: React.FC<ExampleSelectProps> = ({
  options,
  placeholder = "選択してください",
  label,
  meta,
}) => {
  const control = useInputControl(meta);
  const id = useId();

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === "_blank" || selectedValue === "") {
      control.change(undefined);
    } else {
      control.change(selectedValue);
    }
    // フォーカスとブラーイベントを明示的に発火
    control.focus();
    control.blur();
  };

  // control.valueを使用して現在の値を取得
  const currentValue = control.value ?? "";

  return (
    <div className="flex items-center gap-2">
      {/* ... */}
      <Select
        name={meta.name}
        value={currentValue}
        onValueChange={handleValueChange}
      >
        {/* ... */}
      </Select>
    </div>
  );
};
```

## 重要なポイント

1. **`useInputControl`フックの活用**：
   - Conformが提供する`useInputControl`フックを使用して入力制御を行う
   - `control.value`を参照することで常に最新の値を取得

2. **イベントの明示的な発火**：
   - `control.change()`：値を更新し、changeとinputイベントを発火
   - `control.focus()`：focusとfocusinイベントを発火
   - `control.blur()`：blurとfocusoutイベントを発火

3. **イベントの順序**：
   - 値の変更後に`focus()`→`blur()`の順で呼び出すことで、Conformに状態変更を確実に通知

## なぜこれで解決したのか

shadcn-uiはネイティブHTML要素とは異なり、ブラウザの標準的なフォームイベントを自動的にしないみたいです。

Conformはこれらのイベントを監視して状態を管理しているため、明示的にイベントを発火させる必要があります。

`control.focus()`と`control.blur()`を連続して呼び出すことで、Conformに「このフィールドにフォーカスが当たり、その後フォーカスが外れた」ことを通知します。これにより、Conformは内部状態を更新し、UIに反映させることができます。

## 参考資料

- Conformの公式ドキュメント「UI Librariesとの統合」
  https://conform.guide/integration/ui-libraries
- useInputControlのAPIリファレンス
  https://conform.guide/api/react/useInputControl

## まとめ

shadcn-uiとConformを統合する際は、以下の点に注意する必要がありそうです：

1. `useInputControl`フックを使用して入力制御を行う
2. 値の変更時にイベントを明示的に発火させる
3. 値の参照には`control.value`を使用する