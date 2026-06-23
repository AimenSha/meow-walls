import React from "react";
import { Link } from "wouter";

function CatEarLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="hsl(42 95% 55%)" />
      <polygon points="4,18 10,4 16,14" fill="hsl(240 18% 7%)" opacity="0.6" />
      <polygon points="20,14 26,4 32,18" fill="hsl(240 18% 7%)" opacity="0.6" />
      <ellipse cx="13" cy="22" rx="3" ry="2" fill="hsl(240 18% 7%)" opacity="0.7" />
      <ellipse cx="23" cy="22" rx="3" ry="2" fill="hsl(240 18% 7%)" opacity="0.7" />
      <path d="M15 27 Q18 29 21 27" stroke="hsl(240 18% 7%)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <line x1="7" y1="24" x2="14" y2="23" stroke="hsl(240 18% 7%)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="26" x2="14" y2="25" stroke="hsl(240 18% 7%)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="22" y1="23" x2="29" y2="24" stroke="hsl(240 18% 7%)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="22" y1="25" x2="29" y2="26" stroke="hsl(240 18% 7%)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="transform group-hover:rotate-6 transition-transform duration-300">
            <CatEarLogo />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl leading-none text-foreground">
              Meow<span className="text-primary">Walls</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-0.5">
              Purrfect Wallpapers
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
            <ellipse cx="4" cy="3" rx="2" ry="2.5" fill="currentColor" />
            <ellipse cx="10" cy="3" rx="2" ry="2.5" fill="currentColor" />
            <ellipse cx="1.5" cy="7" rx="1.5" ry="2" fill="currentColor" />
            <ellipse cx="7" cy="9" rx="4.5" ry="4" fill="currentColor" />
          </svg>
          <span className="hidden sm:inline font-semibold">Full Resolution Downloads</span>
        </div>
      </div>
    </header>
  );
}
