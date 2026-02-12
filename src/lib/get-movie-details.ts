import { MovieDetailResponse } from "./types";

export const getMovieDetails = async (
  movieId: string,
): Promise<MovieDetailResponse> => {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const token = process.env.TMDB_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(movieDetailsUrl, options);
  const data = await response.json();

  return data;
};
