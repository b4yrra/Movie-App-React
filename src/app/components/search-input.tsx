"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { searchMovies } from "@/lib/search-movies";
import { Movie } from "@/lib/types";
import { SearchIcon, Star } from "lucide-react";
import Link from "next/link";
import { ChangeEventHandler, useEffect, useState } from "react";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const onChangeSearchValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue === "") {
      setMovies([]);
      return;
    }

    const timer = setTimeout(async () => {
      const data = await searchMovies(searchValue);

      setMovies(data.results ?? []);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const TMBD_IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="relative">
      <InputGroup>
        <InputGroupInput
          onChange={onChangeSearchValue}
          placeholder="Search..."
          value={searchValue}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {
        <div>
          <div>
            {movies.length > 0 && (
              <div className="flex flex-col absolute left-0 top-full mt-2 z-50 bg-white dark:bg-[#0b0b0b] rounded-lg shadow-lg p-3 pb-3 gap-3">
                {movies.slice(0, 5).map((movie) => (
                  <Link
                    href={`/${movie.id}`}
                    key={movie.id}
                    className="flex rounded-lg cursor-pointer transition-transform duration-300 ease-in-out group"
                  >
                    <div className="flex items-center gap-5 rounded-lg bg-[#E5E5E5] dark:bg-[#27272A] max-w-full w-110 h-29 p-5 hover:scale-103 transition-transform duration-300 ease-in-out">
                      <img
                        src={`${TMBD_IMG_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-16 h-25 rounded-t-lg object-cover transition-all duration-300 group-hover:brightness-80"
                      />
                      <div>
                        <h1 className="text-sm md:text-base font-medium text-black dark:text-white line-clamp-2">
                          {movie.title}
                        </h1>
                        <div className="flex gap-1 items-center">
                          <Star
                            className="text-yellow-400"
                            size={17}
                            fill="yellow"
                          />
                          <div className="text-slate-600 text-[12px] lg:text-[14px] dark:text-[#A1A1AA]">
                            <span className="font-semibold text-[14px] text-black lg:text-[16px] dark:text-white">
                              {(movie.vote_average ?? 0).toFixed(1)}
                            </span>
                            /10
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="p-3 border-t-2">
                  See all results for "{searchValue}"
                </div>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};
