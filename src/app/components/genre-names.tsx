"use client";

import { Genre } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Special pseudo-genre for Mongolian movies (uses language filter, not genre id)
const MONGOLIA_ID = "mn";

const MONGOLIA_GENRE: Genre = {
  id: MONGOLIA_ID as unknown as number,
  name: "Mонгол кинонууд",
};

export const GenreNames = ({
  genres,
  selectedGenre,
  onSelect,
}: {
  genres: Genre[];
  selectedGenre?: string;
  onSelect?: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get("genre") ?? selectedGenre ?? "";
  const selectedGenres = currentGenre.split(",").filter(Boolean);

  const allGenres = [MONGOLIA_GENRE, ...genres];

  const onSelectGenre = (newGenre: string) => {
    const isIncluded = selectedGenres.includes(newGenre);

    const newGenres = isIncluded
      ? selectedGenres.filter((g) => g !== newGenre)
      : [...selectedGenres, newGenre];

    const params = new URLSearchParams();
    const query = searchParams.get("query");
    if (query) params.set("query", query);
    if (newGenres.length > 0) params.set("genre", newGenres.join(","));
    params.delete("page");

    router.push(`/genre?${params.toString()}`);
    onSelect?.();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allGenres.map((g) => {
        const id = String(g.id);
        const isSelected = selectedGenres.includes(id);
        return (
          <Button
            key={id}
            onClick={() => onSelectGenre(id)}
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
