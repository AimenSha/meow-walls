import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Gallery, Orientation } from "@/components/Gallery";
import { BreedCard } from "@/components/BreedCard";
import { fetchBreeds, Breed } from "@/lib/api";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

function WaveDivider() {
  return (
    <div className="w-full overflow-hidden leading-none my-0" aria-hidden>
      <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path
          d="M0,14 C180,28 360,0 540,14 C720,28 900,0 1080,14 C1260,28 1380,6 1440,14 L1440,28 L0,28 Z"
          fill="hsl(240 16% 11%)"
        />
      </svg>
    </div>
  );
}

function PawIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="5" cy="4" rx="2.2" ry="2.8" />
      <ellipse cx="10" cy="3" rx="2.2" ry="2.8" />
      <ellipse cx="15" cy="4.5" rx="2" ry="2.5" />
      <ellipse cx="2" cy="8.5" rx="1.8" ry="2.2" />
      <ellipse cx="9" cy="11" rx="5.5" ry="5" />
    </svg>
  );
}

const MARQUEE_TEXT = "Wanna know more about cats?";
const MARQUEE_ITEMS = Array(12).fill(MARQUEE_TEXT);

function Marquee() {
  return (
    <Link href="/encyclopedia">
      <div
        className="w-full overflow-hidden bg-primary cursor-pointer hover:bg-primary/90 transition-colors"
        data-testid="marquee-encyclopedia-link"
      >
        <div className="marquee-track py-2.5">
          {MARQUEE_ITEMS.map((text, i) => (
            <span key={i} className="flex items-center gap-3 px-6 text-primary-foreground font-bold text-sm whitespace-nowrap">
              <PawIcon />
              {text}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

const FUN_FACTS = [
  { icon: "😴", category: "Biology", fact: "Cats sleep 12–16 hours a day — that's up to 70% of their lives!" },
  { icon: "👂", category: "Biology", fact: "Each cat ear has 32 individual muscles, letting them rotate 180 degrees." },
  { icon: "👃", category: "Biology", fact: "A cat's nose print is unique — like a human fingerprint." },
  { icon: "🦘", category: "Biology", fact: "Cats can jump up to 6× their own body length in a single leap." },
  { icon: "🎵", category: "Biology", fact: "A cat's purr vibrates at 25–150 Hz, a frequency known to promote bone healing." },
  { icon: "🍬", category: "Biology", fact: "Cats cannot taste sweetness — they lack the taste receptor gene for it." },
  { icon: "🐾", category: "Trivia", fact: "A group of cats is called a clowder. A group of kittens is a kindle." },
  { icon: "🏛️", category: "History", fact: "The oldest known pet cat was buried alongside a human ~9,500 years ago in Cyprus." },
  { icon: "🚶", category: "Biology", fact: "Cats walk like camels and giraffes — both right feet first, then both left feet." },
  { icon: "🌐", category: "Trivia", fact: "There are over 600 million domestic cats in the world today." },
  { icon: "🎬", category: "Movies", fact: "The 2019 film Cats used 'digital fur technology' to put human actors in CGI cat suits — it became one of cinema's most talked-about disasters." },
  { icon: "🐱", category: "Movies", fact: "Keanu (2016) starred Keegan-Michael Key and Jordan Peele on a mission to rescue a stolen kitten named Keanu." },
  { icon: "🎥", category: "Movies", fact: "The aristocats (1970) was the first Disney animated film to use xerography for all backgrounds, featuring Thomas O'Malley and Duchess." },
  { icon: "🐈", category: "Movies", fact: "Puss in Boots (2011) earned over $554 million worldwide — making the Shrek spin-off cat one of DreamWorks' biggest hits." },
  { icon: "🌙", category: "Movies", fact: "Cat People (1942) is a classic horror film where a woman believes she transforms into a deadly panther when aroused." },
  { icon: "🎞️", category: "Movies", fact: "In Breakfast at Tiffany's (1961), Audrey Hepburn's unnamed cat 'Cat' became one of Hollywood's most iconic animal co-stars." },
  { icon: "🏆", category: "Movies", fact: "A Street Cat Named Bob (2016) featured a real-life ginger cat who helped a busker turn his life around — the true story became a bestselling book too." },
  { icon: "🌟", category: "Movies", fact: "Church, the zombie cat in Pet Sematary (1989 & 2019), is one of horror cinema's most iconic feline villains." },
  { icon: "🎭", category: "Trivia", fact: "The Broadway musical Cats, based on T.S. Eliot's poems, ran for 18 years and grossed over $4 billion worldwide." },
  { icon: "💻", category: "Internet", fact: "The first cat video on the internet was uploaded in 1894 — by Thomas Edison's assistant — showing two cats boxing in a tiny ring." },
  { icon: "📱", category: "Internet", fact: "Grumpy Cat (Tardar Sauce) became the world's most recognisable internet cat, earning an estimated $100 million in her lifetime." },
  { icon: "🐈‍⬛", category: "Internet", fact: "Nyan Cat — the pixelated cat with a Pop-Tart body — sold as an NFT for nearly $600,000 in 2021." },
];

function FunFacts() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 2) % FUN_FACTS.length);
        setVisible(true);
      }, 400);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const pair = [
    FUN_FACTS[index % FUN_FACTS.length],
    FUN_FACTS[(index + 1) % FUN_FACTS.length],
  ];

  const total = Math.ceil(FUN_FACTS.length / 2);
  const current = Math.floor(index / 2) % total;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-serif text-2xl font-bold text-foreground text-center">Fun Cat Facts</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
      >
        {pair.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            data-testid={`fact-card-${i}`}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded-full mb-3">
              {item.category}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold">{item.fact}</p>
          </div>
        ))}
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIndex(i * 2); setVisible(true); }, 400); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-primary w-5" : "bg-border hover:bg-primary/40"
            }`}
            data-testid={`fact-dot-${i}`}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3 font-semibold">
        Changes every minute · {current + 1} of {total}
      </p>
    </section>
  );
}

type Tab = { id: Orientation; label: string; icon: React.ReactNode; desc: string };

const TABS: Tab[] = [
  {
    id: "desktop",
    label: "Desktop",
    desc: "Landscape · 16:9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="3" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="15" width="6" height="2" rx="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "Mobile",
    desc: "Portrait · 9:16",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="1" width="10" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="16.5" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
];

export default function Home() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("all");
  const [orientation, setOrientation] = useState<Orientation>("desktop");

  useEffect(() => {
    fetchBreeds().then(setBreeds).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative paw-pattern wave-bottom bg-card pt-12 pb-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4" aria-hidden>
              <svg width="52" height="48" viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="11" cy="10" rx="6" ry="7.5" fill="hsl(42 95% 55%)" opacity="0.85" />
                <ellipse cx="26" cy="7" rx="6" ry="7.5" fill="hsl(42 95% 55%)" opacity="0.85" />
                <ellipse cx="41" cy="10" rx="6" ry="7.5" fill="hsl(42 95% 55%)" opacity="0.85" />
                <ellipse cx="5" cy="22" rx="5" ry="6" fill="hsl(42 95% 55%)" opacity="0.85" />
                <ellipse cx="26" cy="30" rx="18" ry="16" fill="hsl(42 95% 55%)" opacity="0.85" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Beautiful cats,<br />
              <span className="text-primary italic">made for your screen.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-semibold">
              Full-resolution wallpapers handpicked from the finest feline photography.
              Download free for desktop or mobile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Fun Facts */}
      <FunFacts />

      <main className="flex-1 container mx-auto px-4 pb-8">

        {/* Segment Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-card border border-border rounded-2xl p-1.5 gap-1.5 shadow-md">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setOrientation(tab.id); setSelectedBreed("all"); }}
                data-testid={`tab-${tab.id}`}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  orientation === tab.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span className={orientation === tab.id ? "text-primary-foreground" : "text-muted-foreground"}>
                  {tab.icon}
                </span>
                <span>
                  <span className="block leading-none">{tab.label}</span>
                  <span className="block text-[10px] font-normal opacity-70 mt-0.5">{tab.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Breed Image Cards */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-1">
            Filter by Breed
          </h3>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max gap-3 pb-4 items-stretch">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedBreed("all")}
                data-testid="card-breed-all"
                className={`relative flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 flex items-center justify-center ${
                  selectedBreed === "all"
                    ? "border-primary shadow-lg shadow-primary/30 bg-primary"
                    : "border-border bg-secondary hover:border-primary/40"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-0.5">🐾</div>
                  <span className={`text-xs font-bold ${selectedBreed === "all" ? "text-primary-foreground" : "text-foreground"}`}>
                    All Cats
                  </span>
                </div>
              </motion.button>

              {breeds.map((breed) => (
                <BreedCard
                  key={breed.id}
                  breed={breed}
                  selected={selectedBreed === breed.id}
                  onClick={() => setSelectedBreed(selectedBreed === breed.id ? "all" : breed.id)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="opacity-30" />
          </ScrollArea>
        </div>

        <WaveDivider />

        {/* Gallery */}
        <div className="mt-6">
          <Gallery
            breedId={selectedBreed === "all" ? undefined : selectedBreed}
            orientation={orientation}
          />
        </div>
      </main>
    </div>
  );
}
