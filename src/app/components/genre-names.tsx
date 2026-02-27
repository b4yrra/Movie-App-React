"use client";

import { Genre } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const GenreNames = ({
  genres,
  selectedGenre,
}: {
  genres: Genre[];
  selectedGenre: string | string[] | undefined;
}) => {
  const router = useRouter();

  const onSelectGenre = (newGenre: string) => {
    if (!selectedGenre) {
      router.push(`/genre?genre=${newGenre}`);
      return;
    }

    const oldGenres = String(selectedGenre).split(",").filter(Boolean);
    const isIncluded = oldGenres.includes(newGenre);

    const newGenres = isIncluded
      ? oldGenres.filter((g) => g !== newGenre)
      : [...oldGenres, newGenre];

    router.push(`/genre?genre=${newGenres}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => {
        const isSelected = String(selectedGenre)
          .split(",")
          .includes(String(g.id));
        return (
          <div key={g.id} onClick={() => onSelectGenre(String(g.id))}>
            <Button
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer rounded-full text-[12px] ${
                isSelected ? "bg-indigo-600 text-white border-indigo-600" : ""
              }`}
            >
              {g.name} <ArrowRight />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
