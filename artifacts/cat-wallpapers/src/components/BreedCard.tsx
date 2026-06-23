import React, { useEffect, useState } from "react";
import { fetchBreedImage, Breed, CatImage } from "@/lib/api";
import { motion } from "framer-motion";

interface BreedCardProps {
  breed: Breed;
  selected: boolean;
  onClick: () => void;
}

export function BreedCard({ breed, selected, onClick }: BreedCardProps) {
  const [image, setImage] = useState<CatImage | null>(null);

  useEffect(() => {
    fetchBreedImage(breed.id).then(setImage).catch(() => {});
  }, [breed.id]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      data-testid={`card-breed-${breed.id}`}
      className={`relative flex-shrink-0 w-32 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
        selected
          ? "border-primary shadow-lg shadow-primary/30"
          : "border-transparent hover:border-primary/40"
      }`}
    >
      {image ? (
        <img
          src={image.url}
          alt={breed.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-secondary animate-pulse" />
      )}
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          selected
            ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10"
            : "bg-gradient-to-t from-black/70 via-black/30 to-black/5"
        }`}
      />
      {selected && (
        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary" />
      )}
      <span className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-white text-xs font-bold leading-tight text-center drop-shadow">
        {breed.name}
      </span>
    </motion.button>
  );
}
