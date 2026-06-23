import React, { useEffect } from "react";
import { CatImage, downloadImage } from "@/lib/api";
import { X, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface LightboxProps {
  image: CatImage | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (image) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  const breed = image.breeds?.[0];

  const handleDownload = () => {
    downloadImage(image.url, `meow-walls-${breed?.name?.toLowerCase().replace(/\s+/g, '-') || 'cat'}-${image.id}.jpg`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
        onClick={onClose}
        data-testid="modal-lightbox"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full z-50"
          onClick={onClose}
          data-testid="button-close-lightbox"
        >
          <X className="w-6 h-6" />
        </Button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full max-h-full flex flex-col lg:flex-row bg-background rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 bg-black/5 flex items-center justify-center relative overflow-hidden min-h-[40vh] lg:min-h-[60vh]">
            <img
              src={image.url}
              alt={breed ? `${breed.name} cat` : "Beautiful cat"}
              className="max-w-full max-h-[70vh] lg:max-h-[85vh] object-contain"
            />
          </div>
          
          <div className="w-full lg:w-80 p-6 sm:p-8 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border bg-card">
            <div>
              {breed ? (
                <>
                  <h2 className="font-serif text-2xl font-bold mb-2">{breed.name}</h2>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    <Info className="w-3 h-3" />
                    {breed.origin}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                    {breed.description}
                  </p>
                  <Link href={`/breed/${breed.id}`}>
                    <Button variant="link" className="px-0 text-primary hover:text-primary/80 h-auto font-semibold">
                      View all {breed.name}s &rarr;
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-2xl font-bold mb-2">Beautiful Cat</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A stunning feline photograph, ready to adorn your screen.
                  </p>
                </>
              )}
            </div>

            <div className="mt-auto pt-6">
              <Button 
                onClick={handleDownload} 
                className="w-full rounded-xl py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                data-testid="button-download-lightbox"
              >
                <Download className="mr-2 w-5 h-5" />
                Download High-Res
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                {image.width} × {image.height} pixels
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
