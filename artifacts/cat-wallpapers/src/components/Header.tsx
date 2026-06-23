import React from "react";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl transform group-hover:-rotate-6 transition-transform">
            M
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl leading-none text-foreground">Meow Walls</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Curated Feline Photography</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
