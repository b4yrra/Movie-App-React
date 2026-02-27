import { getMovieByGenres, getGenres } from "@/lib/get-genres";
import { MovieList } from "../components/movie-lists";
import { PaginationBar } from "../components/pagination";
import { GenreNames } from "../components/genre-names";

export const GenreMovies = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { genre, page } = await searchParams;

  const genreStr = Array.isArray(genre) ? genre[0] : String(genre ?? "");
  const pageStr = Array.isArray(page) ? page[0] : page;

  const [{ results: genreMovies, total_pages }, { genres }] = await Promise.all(
    [getMovieByGenres(genreStr, pageStr), getGenres()],
  );

  return (
    <div className="my-30 flex justify-center">
      <div className="flex justify-between w-400 max-w-full max-md:flex-col max-md:gap-4">
        <div className="mt-4 w-75 max-w-full flex flex-col gap-4 max-md:pb-3">
          <h2 className="text-[30px] max-md:text-[20px] font-semibold">
            Search Filter
          </h2>
          <div>
            <GenreNames genres={genres} selectedGenre={genreStr} />
          </div>
        </div>
        <div className="md:border-l md:pl-3">
          <div className="text-[20px] max-md:text[15px] font-semibold pb-3">
            See lists of movies by genre
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
            <MovieList movies={genreMovies} showAll={true} />
          </div>
          <div className="mt-10">
            <PaginationBar
              currentPage={Number(page) || 1}
              totalPages={total_pages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreMovies;
