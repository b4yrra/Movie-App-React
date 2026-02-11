import { MovieDetailResponse } from "@/lib/types";
import { Star } from "lucide-react";

type MovieListProps = {
  movies: MovieDetailResponse[];
};

const TMBD_IMG_URL = "https://image.tmdb.org/t/p/w500";

export const MovieDetails = ({ movies }: MovieListProps) => {
  console.log("movies:", movies);

  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="flex flex-col items-center rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out group"
        >
          <div className="rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] w-full overflow-hidden">
            <img
              src={`${TMBD_IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-t-lg object-cover transition-all duration-300 group-hover:brightness-80"
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
              <h1 className="text-sm md:text-base font-medium text-black dark:text-white line-clamp-2">
                {movie.title}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
