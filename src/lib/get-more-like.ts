import { SimilarResponse } from "./more-like-type";

export const getSimilarMovies = async (
  movieId: string,
  page: string | undefined,
): Promise<SimilarResponse> => {
  const similarMovies = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${page ?? 1}`;

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ4MjI1MjFkZjgxZGY4YzdhYjFlOGIwNGIyYjU5ZSIsIm5iZiI6MTc3MDYzNTMzNi40MzUwMDAyLCJzdWIiOiI2OTg5YzA0ODZiMzMyYjhlZWY1ZDkzOWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-eBs0VvEU5hF3dYTPkFUiXzMFWlRXiVvmNoyyyeaf4o";

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
