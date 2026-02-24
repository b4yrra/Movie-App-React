import { Film, SearchIcon } from "lucide-react";
import { Search } from "lucide-react";

import Link from "next/link";

import { getMovieGenres } from "@/lib/api";
import { HeaderDropdownMenuDemo } from "@/components/ui/header-dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchInput } from "./search-input";

export const Header = async () => {
  const genresData = await getMovieGenres();

  console.log("genres", genresData);

  return (
    <div className="flex justify-between items-center h-14 px-5 py-5 pb-5 xl:px-20">
      <div className="flex gap-2 h-5 items-center">
        <Film className="h-5 w-5 text-indigo-700" />
        <Link href={"/"}>
          <button className="text-[16px] italic font-bold text-indigo-700 cursor-pointer">
            Movie Z
          </button>
        </Link>
      </div>
      <div className="max-md:hidden md:block">
        <div className="flex gap-3">
          <div>
            <HeaderDropdownMenuDemo movie={genresData} />
          </div>
          <div>
            <SearchInput />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="w-9 h-9 cursor-pointer md:hidden">
          <div className="border-2 border-[#E4E4E7] dark:border-[#27272A] h-full w-full flex items-center justify-center rounded-lg">
            <Search className="w-4 h-4" />
          </div>
        </button>
        <div className="w-9 h-9 cursor-pointer">
          <div className="border-2 border-[#E4E4E7] dark:border-[#27272A] h-full w-full flex items-center justify-center rounded-lg ">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
