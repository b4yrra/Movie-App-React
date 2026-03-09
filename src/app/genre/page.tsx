import {
  getMovieByGenres,
  getGenres,
  getMovieByLanguage,
} from "@/lib/get-genres";
import { searchMovies } from "@/lib/search-movies";
import { MovieList } from "../components/movie-lists";
import { PaginationBar } from "../components/pagination";
import { GenreNames } from "../components/genre-names";
import { Movie } from "@/lib/types";

// Special pseudo-genre id that maps to Mongolian language filter
const MONGOLIA_GENRE_ID = "mn";

export const GenreMovies = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { genre, page, query } = await searchParams;

  const genreStr = Array.isArray(genre) ? genre[0] : String(genre ?? "");
  const queryStr = Array.isArray(query) ? query[0] : String(query ?? "");
  const pageStr = Array.isArray(page) ? page[0] : page;
  const currentPage = Number(pageStr) || 1;

  const genreIds = genreStr ? genreStr.split(",").filter(Boolean) : [];

  // Check if the Mongolia pseudo-genre is selected (alone or mixed)
  const hasMongolia = genreIds.includes(MONGOLIA_GENRE_ID);
  const realGenreIds = genreIds.filter((id) => id !== MONGOLIA_GENRE_ID);

  const { genres } = await getGenres();

  let movies: Movie[] = [];
  let total_pages = 1;
  let total_results = 0;

  if (queryStr && genreStr) {
    // Search + genre filter
    const data = await searchMovies(queryStr, currentPage);
    movies = data.results.filter((movie) => {
      const passesRealGenres = realGenreIds.every((id) =>
        movie.genre_ids.includes(Number(id)),
      );
      // For Mongolia filter in combination with search we can only do client-side
      // language filtering — TMDB search doesn't support language filter directly.
      return passesRealGenres;
    });
    total_pages = data.total_pages;
    total_results = movies.length;
  } else if (hasMongolia && realGenreIds.length === 0) {
    // Pure Mongolia filter — use language discovery
    const data = await getMovieByLanguage(MONGOLIA_GENRE_ID, pageStr);
    movies = data.results;
    total_pages = data.total_pages;
    total_results = data.total_results;
  } else if (queryStr) {
    const data = await searchMovies(queryStr, currentPage);
    movies = data.results;
    total_pages = data.total_pages;
    total_results = data.total_results;
  } else if (genreStr) {
    // Normal genre filter (may or may not include Mongolia mixed in)
    if (realGenreIds.length > 0) {
      const data = await getMovieByGenres(realGenreIds.join(","), pageStr);
      movies = data.results;
      total_pages = data.total_pages;
      total_results = data.total_results;
    }
  }

  const hasFilters = !!(queryStr || genreStr);

  const getHeading = () => {
    if (queryStr && genreStr)
      return `Results for "${queryStr}" in selected genres`;
    if (queryStr) return `Search results for "${queryStr}"`;
    if (hasMongolia && realGenreIds.length === 0) return "🇲🇳 Mongolian Movies";
    if (genreStr) return "Movies by Genre";
    return "Select a genre or search to browse movies";
  };

  return (
    <div className="my-30 flex justify-center">
      <div className="flex justify-between w-400 max-w-full max-md:flex-col max-md:gap-4">
        <div className="mt-4 w-75 max-w-full flex flex-col gap-4 max-md:pb-3">
          <h2 className="text-[30px] max-md:text-[20px] font-semibold px-3">
            Search Filter
          </h2>
          <div className="px-5">
            <GenreNames genres={genres} selectedGenre={genreStr} />
          </div>
        </div>
        <div className="md:border-l md:pl-3">
          <div className="flex flex-col gap-1 pb-3 px-3">
            <div className="text-[20px] max-md:text-[15px] font-semibold">
              {getHeading()}
            </div>
            {hasFilters && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {total_results} result{total_results !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
                <MovieList movies={movies} showAll={true} />
              </div>
              <div className="mt-10">
                <PaginationBar
                  currentPage={currentPage}
                  totalPages={total_pages}
                  query={queryStr}
                  genre={genreStr}
                />
              </div>
            </>
          ) : (
            hasFilters && (
              <p className="dark:text-white px-4">No movies found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreMovies;
