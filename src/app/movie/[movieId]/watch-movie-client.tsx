"use client";

import { MovieDetailResponse } from "@/lib/types";
import { CreditResponse } from "@/lib/credit-type";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Calendar,
  ArrowLeft,
  Play,
  Subtitles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

type WatchMovieClientProps = {
  movie: MovieDetailResponse;
  credits: CreditResponse;
};

type SubtitleLine = {
  id: number;
  startMs: number;
  endMs: number;
  text: string;
};

const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export const WatchMovieClient = ({ movie, credits }: WatchMovieClientProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [subtitleLines, setSubtitleLines] = useState<SubtitleLine[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const directors = credits?.crew?.filter((c) => c.job === "Director") ?? [];
  const cast = credits?.cast?.slice(0, 6) ?? [];
  const hours = Math.floor((movie.runtime ?? 0) / 60);
  const minutes = (movie.runtime ?? 0) % 60;

  // Playback timer
  useEffect(() => {
    if (isPlaying && subtitlesEnabled && subtitleLines.length > 0) {
      startTimeRef.current = Date.now() - elapsedMs;
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTimeRef.current);
      }, 80);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, subtitlesEnabled, subtitleLines.length]);

  // Find active subtitle line
  useEffect(() => {
    if (!subtitlesEnabled || subtitleLines.length === 0) {
      setCurrentSubtitle(null);
      return;
    }
    const active = subtitleLines.find(
      (l) => elapsedMs >= l.startMs && elapsedMs <= l.endMs,
    );
    setCurrentSubtitle(active?.text ?? null);
  }, [elapsedMs, subtitleLines, subtitlesEnabled]);

  const fetchSubtitles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie, credits }),
      });

      // Read raw text first so we never crash on non-JSON responses
      const rawText = await res.text();

      // Try to parse as JSON
      let json: any;
      try {
        json = JSON.parse(rawText);
      } catch {
        // Response was HTML or something else — show the first 200 chars for debugging
        throw new Error(
          `Non-JSON response (${res.status}): ${rawText.slice(0, 200)}`,
        );
      }

      if (!res.ok) {
        throw new Error(json.error ?? `HTTP ${res.status}`);
      }

      if (!Array.isArray(json.subtitles) || json.subtitles.length === 0) {
        throw new Error("No subtitles returned");
      }

      setSubtitleLines(json.subtitles);
      setSubtitlesEnabled(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [movie, credits]);

  const handleToggleSubtitles = useCallback(() => {
    if (subtitlesEnabled) {
      setSubtitlesEnabled(false);
      setCurrentSubtitle(null);
      return;
    }
    if (subtitleLines.length > 0) {
      setSubtitlesEnabled(true);
      return;
    }
    fetchSubtitles();
  }, [subtitlesEnabled, subtitleLines.length, fetchSubtitles]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (subtitlesEnabled) startTimeRef.current = Date.now() - elapsedMs;
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top bar */}
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

        <div className="ml-auto flex items-center gap-3">
          {error && (
            <span className="text-xs text-red-400 hidden sm:inline max-w-48 truncate">
              ⚠ {error}
            </span>
          )}
          <button
            onClick={handleToggleSubtitles}
            disabled={loading}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              subtitlesEnabled
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-white/5 border-white/15 text-zinc-400 hover:text-white hover:bg-white/10"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Subtitles size={14} />
            )}
            <span className="hidden sm:inline">
              {loading
                ? "Үүсгэж байна..."
                : subtitlesEnabled
                  ? "МН субтитр ON"
                  : "МН субтитр"}
            </span>
          </button>
        </div>
      </div>

      {/* Player */}
      <div className="w-full bg-black relative">
        {!isPlaying ? (
          <div
            className="relative w-full aspect-video cursor-pointer group"
            onClick={handlePlay}
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
              {movie.tagline && (
                <p className="text-white/60 text-sm mt-1">{movie.tagline}</p>
              )}
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

            {/* Subtitle overlay */}
            {subtitlesEnabled && currentSubtitle && (
              <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-10">
                <div
                  className="bg-black/80 backdrop-blur-sm text-white text-base md:text-xl font-semibold px-6 py-2.5 rounded-xl max-w-[85%] text-center leading-snug shadow-2xl border border-white/10"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,1)" }}
                >
                  {currentSubtitle}
                </div>
              </div>
            )}

            {subtitlesEnabled &&
              !currentSubtitle &&
              subtitleLines.length > 0 && (
                <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-10">
                  <div className="bg-black/40 text-zinc-500 text-xs px-3 py-1 rounded-full">
                    МН субтитр идэвхтэй
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      {/* Main content */}
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

          {/* AI Subtitle panel */}
          <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Subtitles size={18} className="text-indigo-400" />
                <h2 className="text-base font-semibold">Монгол субтитр (AI)</h2>
                {subtitleLines.length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                    {subtitleLines.length} мөр бэлэн
                  </span>
                )}
              </div>
              <button
                onClick={handleToggleSubtitles}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  subtitlesEnabled
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-white/10 hover:bg-white/15 text-zinc-300"
                } disabled:opacity-50`}
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Subtitles size={14} />
                )}
                {loading
                  ? "Үүсгэж байна..."
                  : subtitlesEnabled
                    ? "Субтитр идэвхтэй"
                    : "Субтитр идэвхжүүлэх"}
              </button>
            </div>

            <p className="text-zinc-500 text-sm">
              {loading
                ? "Claude AI монгол субтитр үүсгэж байна, түр хүлээнэ үү..."
                : subtitleLines.length > 0
                  ? `${subtitleLines.length} мөр AI субтитр бэлэн боллоо. Play дарснаас хойш субтитр харагдана.`
                  : "Субтитр идэвхжүүлэхэд Claude AI энэ кинонд зориулсан монгол субтитрийг үүсгэнэ."}
            </p>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            {subtitleLines.length > 0 && (
              <div className="mt-4 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-white/5 px-3 py-1.5 border-b border-white/5">
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">
                    Preview
                  </span>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {subtitleLines.slice(0, 8).map((line) => (
                    <div
                      key={line.id}
                      className="flex gap-3 px-3 py-1.5 border-b border-white/5 last:border-0 text-xs"
                    >
                      <span className="shrink-0 text-zinc-600 tabular-nums w-10 pt-px">
                        {formatTime(line.startMs)}
                      </span>
                      <span className="text-zinc-200 leading-relaxed">
                        {line.text}
                      </span>
                    </div>
                  ))}
                  {subtitleLines.length > 8 && (
                    <div className="px-3 py-1.5 text-zinc-600 text-xs">
                      + {subtitleLines.length - 8} дахь мөр...
                    </div>
                  )}
                </div>
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
