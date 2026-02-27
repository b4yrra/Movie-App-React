import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGenres } from "@/lib/get-genres";
import { GenreNames } from "@/app/components/genre-names";

export const HeaderDropdownMenuDemo = async ({
  selectedGenreId,
}: {
  selectedGenreId?: number;
} = {}) => {
  const { genres } = await getGenres();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <ArrowDown size={15} /> Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-160 py-8 px-5" align="start">
        <DropdownMenuGroup>
          <div className="flex flex-col gap-2 border-b-2 pb-4">
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
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
