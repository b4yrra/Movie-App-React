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
import { ArrowDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function HeaderDropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
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
        <DropdownMenuGroup>
          <div className="flex flex-wrap pt-4 gap-3">
            <GenreNames text="Action" onClick="" />
            <GenreNames text="Adventure" onClick="" />
            <GenreNames text="Animation" onClick="" />
            <GenreNames text="Biography" onClick="" />
            <GenreNames text="Comedy" onClick="" />
            <GenreNames text="Crime" onClick="" />
            <GenreNames text="Documentary" onClick="" />
            <GenreNames text="Drama" onClick="" />
            <GenreNames text="Family" onClick="" />
            <GenreNames text="Fantasy" onClick="" />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type GenreNamesProps = {
  text: string;
  onClick: string;
};

export const GenreNames = (props: GenreNamesProps) => {
  const { text, onClick } = props;

  return (
    <Link href={onClick}>
      <div className="flex items-center border px-3 py-1 rounded-xl text-[12px] font-semibold hover:bg-slate-200">
        {text}
      </div>
    </Link>
  );
};
