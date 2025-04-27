import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between py-4 px-0">
        <div className="ml-4 md:ml-8">
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            Shochan.dev
          </Link>
        </div>
        <nav className="md:mr-8">
          <Link href="/blog" className="text-foreground/80 hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
} 