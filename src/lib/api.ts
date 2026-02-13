import { GenreResponse, Response } from "./types";

const popularMovieUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const upcomingMovieUrl =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const topRatedMovieUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const nowPlayingMovieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const MovieGenres =
  "https://api.themoviedb.org/3/movie/genre/movie/list?language=en";

const token = process.env.TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getPopularMovies = async (): Promise<Response> => {
  const response = await fetch(popularMovieUrl, options);
  const data = await response.json();

  return data;
};

export const getUpcomingMovies = async (): Promise<Response> => {
  const response = await fetch(upcomingMovieUrl, options);
  const data = await response.json();

  return data;
};

export const getTopRatedMovies = async (): Promise<Response> => {
  const response = await fetch(topRatedMovieUrl, options);
  const data = await response.json();

  return data;
};

export const getNowPlayingMovies = async (): Promise<Response> => {
  const response = await fetch(nowPlayingMovieUrl, options);
  const data = await response.json();

  return data;
};

export const getMovieGenres = async (): Promise<GenreResponse> => {
  const response = await fetch(MovieGenres, options);
  const data = await response.json();

  return data;
};
