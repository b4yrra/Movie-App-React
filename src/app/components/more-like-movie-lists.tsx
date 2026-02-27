import { MoreLikeThisResult, SimilarResponse } from "@/lib/more-like-type";
import { Star } from "lucide-react";
import Link from "next/link";

type MoreLikeThisMoviesProps = {
  movies: MoreLikeThisResult[];
  showAll: boolean;
};

const TMBD_IMG_URL = "https://image.tmdb.org/t/p/w500";

export const MoreLikeThisMovies = ({
  movies = [],
  showAll = false,
}: MoreLikeThisMoviesProps) => {
  const displayed = (showAll ? movies : movies.slice(0, 5)) ?? [];

  return (
    <>
      {displayed.map((s) => (
        <Link
          href={`/${s.id}`}
          key={s.id}
          className="flex flex-col items-center rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out group"
        >
          <div className="rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] w-full max-w-[157.5px] sm:max-w-45 md:max-w-50 lg:max-w-57.5">
            <img
              src={`${TMBD_IMG_URL}${s.poster_path}`}
              alt={s.title}
              className="w-full h-auto rounded-t-lg object-cover transition-all duration-300 group-hover:brightness-80"
            />
            <div className="p-2 space-y-1">
              <div className="flex gap-1 items-center">
                <Star className="text-yellow-400" size={17} fill="yellow" />
                <div className="text-slate-600 text-[12px] lg:text-[14px] dark:text-[#A1A1AA]">
                  <span className="font-semibold text-[14px] text-black lg:text-[16px] dark:text-white">
                    {(s.vote_average ?? 0).toFixed(1)}
                  </span>
                  /10
                </div>
              </div>
              <h1 className="text-sm md:text-base font-medium text-black dark:text-white line-clamp-2 w-30 h-12">
                {s.title}
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
