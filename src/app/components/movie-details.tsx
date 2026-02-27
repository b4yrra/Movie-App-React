import { MovieDetailResponse } from "@/lib/types";
import { Star, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieDirectors } from "./movie-credits";
import { getCredtiDetails } from "@/lib/get-credit-details";
import { MoreLike } from "./more-like-this-footer";
import { MovieTrailer } from "./movie-trailer";
import { getMovieDetails as getMovieTrailers } from "@/lib/api";
import Link from "next/link";

type MovieListProps = {
  movie: MovieDetailResponse;
};

const TMBD_IMG_URL = "https://image.tmdb.org/t/p/w500";

export const MovieDetails = async ({ movie }: MovieListProps) => {
  const credits = await getCredtiDetails(movie.id);
  const trailers = await getMovieTrailers(movie.id);

  return (
    <div className="w-360 max-w-full my-20">
      <div className="flex flex-col gap-5 px-4">
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

        <div className="flex gap-5 justify-center">
          <img
            src={`${TMBD_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-t-lg object-cover w-72.5 h-107 max-w-full max-md:hidden"
          />
          <div className="max-w-full w-190 h-107">
            <MovieTrailer movie={movie} trailers={trailers} />
          </div>
        </div>

        {/* Watch Now button */}
        <div className="flex gap-3">
          <Link href={`/watch/movie/${movie.id}`}>
            <button className="flex items-center gap-2 px-6 py-2.5 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-colors">
              <Play size={16} fill="white" />
              Watch Now
            </button>
          </Link>
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
