import { Movie } from "@/lib/types";
import { Star } from "lucide-react";

type MovieListProps = {
  movies: Movie[];
};

const TMBD_IMG_URL = "https://image.tmdb.org/t/p/w500";

export const MoreMovies = ({ movies }: MovieListProps) => {
  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="flex flex-col items-center rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out group"
        >
          <div className="rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] w-full max-w-[157.5px] sm:max-w-45 md:max-w-50 lg:max-w-57.5">
            <img
              src={`${TMBD_IMG_URL}${movie.poster_path}`}
              alt={movie.original_name}
              className="w-full h-auto rounded-t-lg object-cover transition-all duration-300 group-hover:brightness-50"
            />
            <div className="p-2 space-y-1">
              <div className="flex gap-1 items-center">
                <Star className="text-yellow-400" size={17} fill="yellow" />
                <div className="text-slate-600 text-[12px] lg:text-[14px] dark:text-[#A1A1AA]">
                  <span className="font-semibold text-[14px] text-black lg:text-[16px] dark:text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  /10
                </div>
              </div>
              <h1 className="text-sm md:text-base font-medium text-black dark:text-white line-clamp-2 w-30 h-12">
                {movie.title}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
