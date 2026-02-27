"use client";

import { MovieDetailResponse } from "@/lib/types";
import { CreditResponse } from "@/lib/credit-type";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type WatchMovieClientProps = {
  movie: MovieDetailResponse;
  credits: CreditResponse;
};

const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export const WatchMovieClient = ({ movie, credits }: WatchMovieClientProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const directors = credits?.crew?.filter((c) => c.job === "Director") ?? [];
  const cast = credits?.cast?.slice(0, 6) ?? [];

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="flex items-center gap-4 px-4 md:px-8 py-4 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <Link
          href={`/${movie.id}`}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-sm font-medium truncate">{movie.title}</span>
      </div>

      <div className="w-full bg-black">
        {!isPlaying ? (
          <div
            className="relative w-full aspect-video cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={`${TMDB_IMG_ORIGINAL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-200">
                  <Play size={32} fill="white" className="ml-1" />
                </div>
                <span className="text-white/80 text-sm font-medium tracking-wide">
                  Watch Now
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
              <p className="text-white/60 text-sm mt-1">{movie.tagline}</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.vidking.net/embed/movie/${movie.id}`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="origin"
            />
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-zinc-400 italic mt-1 text-sm">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">
                  {(movie.vote_average ?? 0).toFixed(1)}
                </span>
                <span>/10</span>
                <span className="text-zinc-600">
                  ({movie.vote_count?.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{movie.release_date?.slice(0, 4)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>
                  {hours}h {minutes}m
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres?.map((genre) => (
                <Link key={genre.id} href={`/genre?genre=${genre.id}`}>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-300 hover:border-indigo-500 hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {genre.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Overview</h2>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              {movie.overview}
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
            {directors.length > 0 && (
              <div className="flex gap-3 text-sm">
                <span className="text-zinc-500 w-20 shrink-0">Director</span>
                <span className="text-zinc-200">
                  {directors.map((d) => d.name).join(", ")}
                </span>
              </div>
            )}
            {cast.length > 0 && (
              <div className="flex gap-3 text-sm">
                <span className="text-zinc-500 w-20 shrink-0">Stars</span>
                <span className="text-zinc-200">
                  {cast.map((c) => c.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-56 shrink-0">
          <img
            src={`${TMDB_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl shadow-black/50 hidden lg:block"
          />

          {movie.production_companies?.length > 0 && (
            <div className="mt-4 hidden lg:block">
              <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider">
                Production
              </p>
              <div className="flex flex-col gap-1">
                {movie.production_companies.slice(0, 3).map((c) => (
                  <span key={c.id} className="text-zinc-400 text-xs">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
