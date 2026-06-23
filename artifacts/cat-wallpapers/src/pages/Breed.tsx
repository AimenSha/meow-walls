import React, { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { fetchBreedDetails, Breed } from "@/lib/api";
import { ArrowLeft, Loader2, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BreedPage() {
  const params = useParams();
  const breedId = params.breedId;
  const [breed, setBreed] = useState<Breed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!breedId) return;
    setLoading(true);
    fetchBreedDetails(breedId)
      .then(b => {
        if (b) setBreed(b);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [breedId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground pl-0 mb-4" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>

          {loading ? (
            <div className="h-32 flex items-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : breed ? (
            <div className="max-w-3xl bg-card rounded-2xl p-6 sm:p-10 shadow-sm border border-border">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                {breed.name}
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                  Origin: {breed.origin}
                </div>
                <div className="flex items-center text-sm font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                  <Heart className="w-4 h-4 mr-1.5 text-primary" />
                  Life Span: {breed.life_span} years
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-foreground">Temperament</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {breed.temperament}
                </p>
                
                <h3 className="font-serif text-xl font-semibold text-foreground pt-2">About the breed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {breed.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center">
              <p className="text-muted-foreground">Breed not found.</p>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-border">
          <h3 className="font-serif text-2xl font-bold mb-8">Wallpapers</h3>
          {breedId && <Gallery breedId={breedId} />}
        </div>
      </main>
    </div>
  );
}
