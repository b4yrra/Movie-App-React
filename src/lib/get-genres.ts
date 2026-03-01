import { GenresResponse, Response } from "./types";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ4MjI1MjFkZjgxZGY4YzdhYjFlOGIwNGIyYjU5ZSIsIm5iZiI6MTc3MDYzNTMzNi40MzUwMDAyLCJzdWIiOiI2OTg5YzA0ODZiMzMyYjhlZWY1ZDkzOWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-eBs0VvEU5hF3dYTPkFUiXzMFWlRXiVvmNoyyyeaf4o";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getGenres = async (): Promise<GenresResponse> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options,
  );
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
