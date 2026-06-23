import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { fetchBreeds, Breed } from "@/lib/api";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("all");

  useEffect(() => {
    fetchBreeds().then(setBreeds).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Curated feline beauty for your screens.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover a handpicked collection of stunning cat photography. Warm, intimate, and perfectly framed.
          </p>
        </div>

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-2 pb-4">
              <Button
                variant={selectedBreed === "all" ? "default" : "secondary"}
                className={`rounded-full px-6 ${selectedBreed === "all" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                onClick={() => setSelectedBreed("all")}
                data-testid="filter-breed-all"
              >
                All Cats
              </Button>
              {breeds.map((breed) => (
                <Button
                  key={breed.id}
                  variant={selectedBreed === breed.id ? "default" : "secondary"}
                  className={`rounded-full px-6 ${selectedBreed === breed.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                  onClick={() => setSelectedBreed(breed.id)}
                  data-testid={`filter-breed-${breed.id}`}
                >
                  {breed.name}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>

        <Gallery breedId={selectedBreed === "all" ? undefined : selectedBreed} />
      </main>
    </div>
  );
}
