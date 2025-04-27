import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="py-8">
        <div className="grid place-items-center">
          <div className="flex justify-center mb-4">
            <nav className="inline-flex gap-12 justify-center">
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