import { Response, GenresResponse, Trailer } from "./types";

const MovieUrl = "https://api.themoviedb.org/3/movie/";

const nowPlayingMovieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const token = process.env.TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getPopularMovies = async (
  page: string | undefined,
): Promise<Response> => {
  const response = await fetch(
    `${MovieUrl}popular?language=en-US&page=${page ?? 1}`,
    options,
  );
  const data = await response.json();

  return data;
};

export const getUpcomingMovies = async (
  page: string | undefined,
): Promise<Response> => {
  const response = await fetch(
    `${MovieUrl}upcoming?language=en-US&page=${page ?? 1}`,
    options,
  );
  const data = await response.json();

  return data;
};

export const getTopRatedMovies = async (
  page: string | undefined,
): Promise<Response> => {
  const response = await fetch(
    `${MovieUrl}top_rated?language=en-US&page=${page ?? 1}`,
    options,
  );
  const data = await response.json();

  return data;
};

export const getNowPlayingMovies = async (): Promise<Response> => {
  const response = await fetch(nowPlayingMovieUrl, options);
  const data = await response.json();

  return data;
};

export const getMovieDetails = async (movieId: string): Promise<Trailer> => {
  const MovieTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  const token = process.env.TMDB_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(MovieTrailer, options);
  const data = await response.json();

  return data;
};
