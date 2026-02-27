import { Response } from "./types";

export const searchMovies = async (
  searchValue: string,
  page: number = 1,
): Promise<Response> => {
  const token = process.env.TMDB_TOKEN;

  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  return data;
};
