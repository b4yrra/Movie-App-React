"use client";

import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Calendar,
  ArrowLeft,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Season = {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path?: string;
};

type Genre = { id: number; name: string };

type TVShow = {
  id: number;
  name: string;
  tagline?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  episode_run_time: number[];
  genres: Genre[];
  seasons: Season[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
};

type WatchTVClientProps = {
  show: TVShow;
  credits: { cast: { id: number; name: string }[] };
  season: number;
  episode: number;
};

const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export const WatchTVClient = ({
  show,
  credits,
  season,
  episode,
}: WatchTVClientProps) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(season);
  const [selectedEpisode, setSelectedEpisode] = useState(episode);

  const cast = credits?.cast?.slice(0, 6) ?? [];

  const currentSeason = show.seasons?.find(
    (s) => s.season_number === selectedSeason,
  );
  const episodeCount = currentSeason?.episode_count ?? 1;

  const realSeasons = show.seasons?.filter((s) => s.season_number > 0) ?? [];

  const navigate = (s: number, e: number) => {
    setSelectedSeason(s);
    setSelectedEpisode(e);
    setIsPlaying(false);
    router.push(`/watch/tv/${show.id}/${s}/${e}`);
  };

  const prevEp = () => {
    if (selectedEpisode > 1) {
      navigate(selectedSeason, selectedEpisode - 1);
    } else if (selectedSeason > 1) {
      const prevSeason = show.seasons?.find(
        (s) => s.season_number === selectedSeason - 1,
      );
      navigate(selectedSeason - 1, prevSeason?.episode_count ?? 1);
    }
  };

  const nextEp = () => {
    if (selectedEpisode < episodeCount) {
      navigate(selectedSeason, selectedEpisode + 1);
    } else if (selectedSeason < show.number_of_seasons) {
      navigate(selectedSeason + 1, 1);
    }
  };

  const runtime = show.episode_run_time?.[0];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-4 md:px-8 py-4 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-sm font-medium truncate">{show.name}</span>
        <span className="text-zinc-500 text-sm">
          S{String(selectedSeason).padStart(2, "0")} E
          {String(selectedEpisode).padStart(2, "0")}
        </span>
      </div>

      {/* Player */}
      <div className="w-full bg-black">
        {!isPlaying ? (
          <div
            className="relative w-full aspect-video cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={`${TMDB_IMG_ORIGINAL}${show.backdrop_path}`}
              alt={show.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-200">
                  <Play size={32} fill="white" className="ml-1" />
                </div>
                <span className="text-white/80 text-sm font-medium tracking-wide">
                  S{String(selectedSeason).padStart(2, "0")} E
                  {String(selectedEpisode).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-2xl md:text-3xl font-bold">{show.name}</h1>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.vidking.net/embed/tv/${show.id}/${selectedSeason}/${selectedEpisode}`}
              title={`${show.name} S${selectedSeason}E${selectedEpisode}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="origin"
            />
          </div>
        )}
      </div>

      {/* Episode navigation */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-[#111118] border-b border-white/10">
        <button
          onClick={prevEp}
          disabled={selectedSeason === 1 && selectedEpisode === 1}
          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <span className="text-sm text-zinc-400">
          Season {selectedSeason} · Episode {selectedEpisode} of {episodeCount}
        </span>
        <button
          onClick={nextEp}
          disabled={
            selectedSeason === show.number_of_seasons &&
            selectedEpisode === episodeCount
          }
          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          {/* Show info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{show.name}</h1>
            {show.tagline && (
              <p className="text-zinc-400 italic mt-1 text-sm">
                "{show.tagline}"
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">
                  {(show.vote_average ?? 0).toFixed(1)}
                </span>
                <span>/10</span>
                <span className="text-zinc-600">
                  ({show.vote_count?.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{show.first_air_date?.slice(0, 4)}</span>
              </div>
              {runtime && (
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{runtime}m / ep</span>
                </div>
              )}
              <Badge
                variant="outline"
                className="border-zinc-700 text-zinc-400 text-xs"
              >
                {show.status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {show.genres?.map((genre) => (
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
              {show.overview}
            </p>
          </div>

          {cast.length > 0 && (
            <div className="border-t border-white/10 pt-5">
              <div className="flex gap-3 text-sm">
                <span className="text-zinc-500 w-20 shrink-0">Stars</span>
                <span className="text-zinc-200">
                  {cast.map((c) => c.name).join(", ")}
                </span>
              </div>
            </div>
          )}

          {/* Season / Episode selector */}
          {realSeasons.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Episodes</h2>

              {/* Season tabs */}
              <div className="flex gap-2 flex-wrap mb-4">
                {realSeasons.map((s) => (
                  <button
                    key={s.season_number}
                    onClick={() => navigate(s.season_number, 1)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedSeason === s.season_number
                        ? "bg-indigo-600 text-white"
                        : "bg-white/10 text-zinc-400 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    Season {s.season_number}
                  </button>
                ))}
              </div>

              {/* Episode buttons */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: episodeCount }, (_, i) => i + 1).map(
                  (ep) => (
                    <button
                      key={ep}
                      onClick={() => navigate(selectedSeason, ep)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        selectedEpisode === ep && selectedSeason === season
                          ? "bg-indigo-600 text-white"
                          : "bg-white/10 text-zinc-400 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {ep}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-56 shrink-0 hidden lg:block">
          <img
            src={`${TMDB_IMG_URL}${currentSeason?.poster_path || show.poster_path}`}
            alt={show.name}
            className="w-full rounded-xl shadow-2xl shadow-black/50"
          />
          <div className="mt-4 flex flex-col gap-1 text-xs text-zinc-500">
            <span>{show.number_of_seasons} seasons</span>
            <span>{show.number_of_episodes} episodes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
