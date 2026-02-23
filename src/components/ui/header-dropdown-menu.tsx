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
            <DropdownMenuItem key={g.id}>{g.name}</DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// type GenreNamesProps = {
//   text: string;
//   onClick: string;
// };

// export const GenreNames = (props: GenreNamesProps) => {
//   const { text, onClick } = props;

//   return (
//     <Link href={onClick}>
//       <div className="flex items-center border px-3 py-1 rounded-xl text-[12px] font-semibold hover:bg-slate-200 dark:hover:bg-slate-700">
//         {text}
//       </div>
//     </Link>
//   );
// };
