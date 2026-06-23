import React from "react";
import { Link } from "wouter";
import { CatImage, downloadImage } from "@/lib/api";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface WallpaperCardProps {
  image: CatImage;
  onClick: () => void;
}

export function WallpaperCard({ image, onClick }: WallpaperCardProps) {
  const breed = image.breeds?.[0];

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadImage(image.url, `meow-walls-${breed?.name?.toLowerCase().replace(/\s+/g, '-') || 'cat'}-${image.id}.jpg`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-muted shadow-sm hover:shadow-xl transition-all duration-300"
      onClick={onClick}
      data-testid={`card-wallpaper-${image.id}`}
    >
      <img
        src={image.url}
        alt={breed ? `${breed.name} cat` : "Beautiful cat"}
        className="w-full h-auto object-cover block"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center justify-between">
          <div>
            {breed && (
              <Badge 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none font-medium pointer-events-auto"
                data-testid={`badge-breed-${image.id}`}
              >
                <Link href={`/breed/${breed.id}`} onClick={e => e.stopPropagation()}>
                  {breed.name}
                </Link>
              </Badge>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border-none opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 pointer-events-auto"
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
