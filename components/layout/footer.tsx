import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-center mb-4">
            <nav className="flex gap-12 justify-center">
              <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                プロフィール
              </Link>
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                プライバシーポリシー
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} Shochan.dev All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 