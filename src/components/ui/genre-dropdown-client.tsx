"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { Genre } from "@/lib/types";
import { GenreNames } from "@/app/components/genre-names";
import { useState } from "react";

export const GenreDropdownClient = ({
  genres,
  selectedGenreId,
}: {
  genres: Genre[];
  selectedGenreId?: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <ArrowDown size={15} /> Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-160 py-8 px-5"
        align="start"
        // Prevent Radix from closing when clicking genre buttons inside
        onInteractOutside={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* Clicking this header area closes the dropdown */}
        <DropdownMenuGroup>
          <div
            className="flex flex-col gap-2 border-b-2 pb-4 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <h1 className="text-[24px] font-semibold">Genres</h1>
            <h2 className="text-[16px]">See lists of movies by genre</h2>
          </div>
        </DropdownMenuGroup>
        <div className="flex flex-wrap pt-4 gap-3">
          <GenreNames
            genres={genres}
            selectedGenre={
              selectedGenreId ? String(selectedGenreId) : undefined
            }
            onSelect={() => setOpen(false)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
