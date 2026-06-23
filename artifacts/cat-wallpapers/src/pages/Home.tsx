import React, { useEffect, useState } from "react";
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
            <span className="inline-block text-primary text-4xl mb-3 select-none" aria-hidden>
              ᶜᵃᵗ
            </span>
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

      <main className="flex-1 container mx-auto px-4 py-8">

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
              {/* All Cats card */}
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
