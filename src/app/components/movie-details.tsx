import { Genre, MovieDetailResponse } from "@/lib/types";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieDirectors } from "./movie-credits";
import { getCredtiDetails } from "@/lib/get-credit-details";
import { Play } from "lucide-react";

import { MoreLike } from "./more-like-this-footer";
import { Button } from "@/components/ui/button";

type MovieListProps = {
  movie: MovieDetailResponse;
};

const TMBD_IMG_URL = "https:image.tmdb.org/t/p/w500";
const TMBD_IMG_URL_ORIGINAL = "https:image.tmdb.org/t/p/original";

export const MovieDetails = async ({ movie }: MovieListProps) => {
  const credits = await getCredtiDetails(movie.id);

  return (
    <div className="w-360 max-w-full my-20">
      <div className="flex flex-col gap-5 max-lg:px-4">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-[36px] font-bold">{movie.title}</h1>
            <div className="flex gap-4 text-[18px]">
              <div>{movie.release_date}</div>
              <div>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Rating</p>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={28} fill="yellow" />
              <div className="text-slate-600 text-[12px] lg:text-[14px] dark:text-[#A1A1AA]">
                <span className="font-semibold text-[14px] text-black lg:text-[16px] dark:text-white">
                  {(movie.vote_average ?? 0).toFixed(1)}
                </span>
                /10
                <div className="text-[#71717A]">{movie.vote_count}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-center max-md:flex-col">
          <img
            src={`${TMBD_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-t-lg object-cover w-72.5 h-107 max-w-full"
          />
          <div className="relative">
            <img
              src={`${TMBD_IMG_URL_ORIGINAL}${movie.backdrop_path}`}
              alt={movie.title}
              className="rounded-t-lg object-cover w-270 h-107 max-w-full brightness-50"
            />
            <div className="flex gap-3 items-center absolute left-5 bottom-5">
              <Button className="cursor-pointer rounded-full">
                <Play />
              </Button>
              <div>Play Trailer</div>
            </div>
          </div>
        </div>
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} variant={"outline"}>
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
        <div className="text-[16px] max-w-full w-360">{movie.overview}</div>
        <div>
          <MovieDirectors credit={credits} />
        </div>
        <div>
          <MoreLike movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};
