import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Genre } from "@/lib/types";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeaderDropdownMenuDemoProps = {
  movie?: { genres?: Genre[] };
};

export function HeaderDropdownMenuDemo({ movie }: HeaderDropdownMenuDemoProps) {
  const genres = movie?.genres ?? [];
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
          {genres.map((g) => (
            <Link key={g.id} href={`/genre?genre=${g.id}`}>
              <Button
                variant="outline"
                className="cursor-pointer rounded-full text-[12px]"
              >
                {g.name} <ArrowRight />
              </Button>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
