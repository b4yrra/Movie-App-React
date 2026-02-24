import { Response } from "./types";

export const searchMovies = async (searchValue: string): Promise<Response> => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTlmYmRjYzE5ZTUwMDdmMmM4YTUwNTI5Yzc5MDI4OSIsIm5iZiI6MTc3MDY4ODU1OC43NTQsInN1YiI6IjY5OGE5MDJlOWE5N2I2ZTEzYmM3MmY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q9qwrgEEnFEPtA7Fmn9tKDYlvZfBC6SwUkvAtFA3OoY";

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US`,

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
