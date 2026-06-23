import React from "react";
import { Link } from "wouter";
import { CatImage, downloadImage } from "@/lib/api";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WallpaperCardProps {
  image: CatImage;
  onClick: () => void;
}

export function WallpaperCard({ image, onClick }: WallpaperCardProps) {
  const breed = image.breeds?.[0];

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadImage(
      image.url,
      `meowwalls-${breed?.name?.toLowerCase().replace(/\s+/g, "-") || "cat"}-${image.id}.jpg`
    );
  };

  const resLabel =
    image.width && image.height
      ? image.width >= 3840
        ? "4K"
        : image.width >= 2560
        ? "2K"
        : image.width >= 1920
        ? "FHD"
        : null
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group relative rounded-2xl overflow-hidden cursor-zoom-in bg-card border border-border/40 shadow hover:shadow-xl hover:shadow-black/40 hover:scale-[1.02] transition-all duration-300"
      onClick={onClick}
      data-testid={`card-wallpaper-${image.id}`}
    >
      <img
        src={image.url}
        alt={breed ? `${breed.name} cat` : "Beautiful cat"}
        className="w-full h-auto object-cover block"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            {breed && (
              <Link href={`/breed/${breed.id}`} onClick={(e) => e.stopPropagation()}>
                <span
                  className="inline-block text-xs font-bold text-white bg-primary/80 hover:bg-primary px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                  data-testid={`badge-breed-${image.id}`}
                >
                  {breed.name}
                </span>
              </Link>
            )}
            {resLabel && (
              <span className="inline-block text-[10px] font-bold text-primary/90 bg-black/50 px-2 py-0.5 rounded-full w-fit">
                {resLabel}
              </span>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full w-9 h-9 bg-white/15 hover:bg-primary/80 text-white backdrop-blur-md border-none opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 delay-75 pointer-events-auto flex-shrink-0"
            onClick={handleDownload}
            data-testid={`button-download-${image.id}`}
          >
            <Download className="w-4 h-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
