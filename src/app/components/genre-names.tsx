"use client";

import { Genre } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export const GenreNames = ({
  genres,
  selectedGenre,
}: {
  genres: Genre[];
  selectedGenre?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get("genre") ?? selectedGenre ?? "";
  const selectedGenres = currentGenre.split(",").filter(Boolean);

  const onSelectGenre = (newGenre: string) => {
    const isIncluded = selectedGenres.includes(newGenre);

    const newGenres = isIncluded
      ? selectedGenres.filter((g) => g !== newGenre)
      : [...selectedGenres, newGenre];

    router.push(`/genre?genre=${newGenres.join(",")}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => {
        const isSelected = selectedGenres.includes(String(g.id));
        return (
          <Button
            key={g.id}
            onClick={() => onSelectGenre(String(g.id))}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer rounded-full text-[12px] ${
              isSelected ? "bg-indigo-600 text-white border-indigo-600" : ""
            }`}
          >
            {g.name}
          </Button>
        );
      })}
    </div>
  );
};
