"use client";

import { Film } from "lucide-react";
import { Search } from "lucide-react";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  return (
    <div className="flex justify-between items-center h-14 px-5 py-5 pb-5 xl:px-20">
      <div className="flex gap-2 h-5 items-center">
        <Film className="h-5 w-5 text-indigo-700" />
        <button className="text-[16px] italic font-bold text-indigo-700 cursor-pointer">
          Movie Z
        </button>
      </div>
      <div className="max-md:hidden md:block">
        <div className="flex gap-3">
          <div>
            <button className="border-2 border-[#E4E4E7] dark:border-[#27272A] rounded-lg py-1 px-3 flex gap-2 items-center cursor-pointer">
              <ArrowDown size={15} /> Genre
            </button>
          </div>
          <div className="border-2 border-[#E4E4E7] dark:border-[#27272A] flex px-1 items-center rounded-lg gap-3">
            <Search className="w-4 text-slate-500" />
            <input
              type="text"
              className="outline-none xl:w-94.75"
              placeholder="Search"
            />
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

export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
