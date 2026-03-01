import { MovieDetailResponse } from "./types";

export const getMovieDetails = async (
  movieId: string,
): Promise<MovieDetailResponse> => {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ4MjI1MjFkZjgxZGY4YzdhYjFlOGIwNGIyYjU5ZSIsIm5iZiI6MTc3MDYzNTMzNi40MzUwMDAyLCJzdWIiOiI2OTg5YzA0ODZiMzMyYjhlZWY1ZDkzOWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-eBs0VvEU5hF3dYTPkFUiXzMFWlRXiVvmNoyyyeaf4o";

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
