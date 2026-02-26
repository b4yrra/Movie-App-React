import { GenresResponse, Response } from "./types";

const MovieGenres = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const token = process.env.TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getGenres = async (): Promise<GenresResponse> => {
  const response = await fetch(MovieGenres, options);
  const data = await response.json();

  return data;
};

export const getMovieByGenres = async (
  genreIds: string,
  page?: string,
): Promise<Response> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page ?? 1}`,
    options,
  );
  const data = await response.json();

  return data;
};
