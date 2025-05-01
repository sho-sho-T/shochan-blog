"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// 検索アイテムの型定義
type SearchItem = {
  type: "category" | "tag";
  name: string;
  count: number;
};

// UI部分のみのクライアントコンポーネント
export function SearchDialog({ 
  categories,
  tags 
}: { 
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[]; 
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // 検索アイテムを選択したときの処理
  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    if (item.type === "category") {
      router.push(`/blog/categories/${encodeURIComponent(item.name)}`);
    } else {
      router.push(`/blog/tags/${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="検索">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>記事検索</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="カテゴリまたはタグを検索..." />
          <CommandList>
            <CommandEmpty>結果がありません</CommandEmpty>
            <CommandGroup heading="カテゴリ">
              {categories.map(category => (
                <CommandItem
                  key={`category-${category.name}`}
                  value={`category-${category.name}`}
                  onSelect={() => handleSelect({ type: "category", ...category })}
                >
                  <span className="mr-2">📂</span>
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{category.count}記事</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="タグ">
              {tags.map(tag => (
                <CommandItem
                  key={`tag-${tag.name}`}
                  value={`tag-${tag.name}`}
                  onSelect={() => handleSelect({ type: "tag", ...tag })}
                >
                  <span className="mr-2">#</span>
                  <span>{tag.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{tag.count}記事</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

// ヘッダーUI部分（クライアントコンポーネント）
export function HeaderUI({ 
  categories,
  tags 
}: { 
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[]; 
}) {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between py-4 px-4 md:px-8">
        <div>
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            Shochan.dev
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <SearchDialog categories={categories} tags={tags} />
        </div>
      </div>
    </header>
  );
} 