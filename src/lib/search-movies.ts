import { Response } from "./types";

export const searchMovies = async (
  searchValue: string,
  page: number = 1,
): Promise<Response> => {
  // FIXED: NEXT_PUBLIC_TMDB_TOKEN may not be set — fall back to TMDB_TOKEN
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ4MjI1MjFkZjgxZGY4YzdhYjFlOGIwNGIyYjU5ZSIsIm5iZiI6MTc3MDYzNTMzNi40MzUwMDAyLCJzdWIiOiI2OTg5YzA0ODZiMzMyYjhlZWY1ZDkzOWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-eBs0VvEU5hF3dYTPkFUiXzMFWlRXiVvmNoyyyeaf4o";
  if (!token) throw new Error("TMDB_TOKEN environment variable is not set");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchValue)}&language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("searchMovies failed:", error);
    return { page: 1, results: [], total_pages: 1, total_results: 0 };
  }
};
