import React, { useState, useEffect, useCallback } from "react";
import { fetchImages, CatImage } from "@/lib/api";
import { WallpaperCard } from "./WallpaperCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Lightbox } from "./Lightbox";

export type Orientation = "desktop" | "mobile";

interface GalleryProps {
  breedId?: string;
  orientation: Orientation;
}

function matchesOrientation(img: CatImage, orientation: Orientation): boolean {
  if (!img.width || !img.height) return true;
  if (orientation === "desktop") return img.width >= img.height;
  return img.height > img.width;
}

export function Gallery({ breedId, orientation }: GalleryProps) {
  const [images, setImages] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CatImage | null>(null);

  const loadImages = useCallback(async (pageNum: number, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const raw = await fetchImages(pageNum, 40, breedId);
      const filtered = raw.filter(img => matchesOrientation(img, orientation));

      if (isInitial) {
        setImages(filtered);
      } else {
        setImages(prev => {
          const existing = new Set(prev.map(i => i.id));
          return [...prev, ...filtered.filter(i => !existing.has(i.id))];
        });
      }
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [breedId, orientation]);

  useEffect(() => {
    setPage(0);
    loadImages(0, true);
  }, [breedId, orientation, loadImages]);

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
        <p className="text-lg font-semibold">No wallpapers found.</p>
        <p className="text-sm mt-1">Try a different breed or orientation.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`columns-1 gap-5 space-y-5 ${
        orientation === "desktop"
          ? "sm:columns-2 lg:columns-3"
          : "sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
      }`}>
        {images.map((img) => (
          <div key={img.id} className="break-inside-avoid">
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
          className="rounded-full px-10 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all font-bold"
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
