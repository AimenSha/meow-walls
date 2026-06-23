import React, { useState, useEffect, useCallback } from "react";
import { fetchImages, CatImage } from "@/lib/api";
import { WallpaperCard } from "./WallpaperCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  breedId?: string;
}

export function Gallery({ breedId }: GalleryProps) {
  const [images, setImages] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CatImage | null>(null);

  const loadImages = useCallback(async (pageNum: number, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const newImages = await fetchImages(pageNum, 20, breedId);
      
      if (isInitial) {
        setImages(newImages);
      } else {
        setImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [breedId]);

  useEffect(() => {
    setPage(0);
    loadImages(0, true);
  }, [breedId, loadImages]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadImages(nextPage, false);
  };

  if (loading && page === 0) {
    return (
      <div className="flex justify-center items-center py-24" data-testid="status-loading">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!loading && images.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground" data-testid="status-empty">
        <p className="text-lg">No wallpapers found.</p>
        <p className="text-sm">Try a different breed.</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((img) => (
          <div key={`${img.id}-${Math.random()}`} className="break-inside-avoid">
            <WallpaperCard 
              image={img} 
              onClick={() => setSelectedImage(img)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 mb-8">
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="rounded-full px-8 bg-card border-primary/20 text-primary hover:bg-primary/5 hover:text-primary transition-colors"
          data-testid="button-load-more"
        >
          {loadingMore ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
          ) : (
            "Load More"
          )}
        </Button>
      </div>

      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
}
