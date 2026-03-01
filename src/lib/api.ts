import { Response, Trailer } from "./types";

const MovieUrl = "https://api.themoviedb.org/3/movie/";
const nowPlayingMovieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const getToken = () => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ4MjI1MjFkZjgxZGY4YzdhYjFlOGIwNGIyYjU5ZSIsIm5iZiI6MTc3MDYzNTMzNi40MzUwMDAyLCJzdWIiOiI2OTg5YzA0ODZiMzMyYjhlZWY1ZDkzOWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-eBs0VvEU5hF3dYTPkFUiXzMFWlRXiVvmNoyyyeaf4o";
  if (!token) throw new Error("TMDB_TOKEN environment variable is not set");
  return token;
};

const getOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

const safeFetch = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url, getOptions());
    if (!response.ok) {
      console.error(`TMDB API error: ${response.status} for ${url}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch failed for ${url}:`, error);
    return null;
  }
};

export const getPopularMovies = async (
  page: string | undefined,
): Promise<Response> => {
  const data = await safeFetch(
    `${MovieUrl}popular?language=en-US&page=${page ?? 1}`,
  );
  return data ?? { page: 1, results: [], total_pages: 1, total_results: 0 };
};

export const getUpcomingMovies = async (
  page: string | undefined,
): Promise<Response> => {
  const data = await safeFetch(
    `${MovieUrl}upcoming?language=en-US&page=${page ?? 1}`,
  );
  return data ?? { page: 1, results: [], total_pages: 1, total_results: 0 };
};

export const getTopRatedMovies = async (
  page: string | undefined,
): Promise<Response> => {
  const data = await safeFetch(
    `${MovieUrl}top_rated?language=en-US&page=${page ?? 1}`,
  );
  return data ?? { page: 1, results: [], total_pages: 1, total_results: 0 };
};

export const getNowPlayingMovies = async (): Promise<Response> => {
  const data = await safeFetch(nowPlayingMovieUrl);
  return data ?? { page: 1, results: [], total_pages: 1, total_results: 0 };
};

export const getMovieDetails = async (movieId: string): Promise<Trailer> => {
  const data = await safeFetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
  );
  return data ?? { id: Number(movieId), results: [] };
};
