import { CreditResponse } from "./credit-type";

export const getCredtiDetails = async (
  movieId: string,
): Promise<CreditResponse> => {
  const movieCreditDetails = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTlmYmRjYzE5ZTUwMDdmMmM4YTUwNTI5Yzc5MDI4OSIsIm5iZiI6MTc3MDY4ODU1OC43NTQsInN1YiI6IjY5OGE5MDJlOWE5N2I2ZTEzYmM3MmY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q9qwrgEEnFEPtA7Fmn9tKDYlvZfBC6SwUkvAtFA3OoY";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(movieCreditDetails, options);
  const data = await response.json();

  return data;
};
