import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Shochan.dev All rights reserved.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              プロフィール
            </Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              プライバシーポリシー
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
} 