import { SimilarResponse } from "./more-like-type";

export const getSimilarMovies = async (
  movieId: string,
  page: string | undefined,
): Promise<SimilarResponse> => {
  const similarMovies = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${page ?? 1}`;

  const token = process.env.TMDB_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(similarMovies, options);
  const data = await response.json();

  return data;
};
