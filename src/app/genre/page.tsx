import { getMovieByGenres, getGenres } from "@/lib/get-genres";
import { MovieList } from "../components/movie-lists";
import { PaginationBar } from "../components/pagination";
import Link from "next/link";

export const GenreMovies = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { genre, page } = await searchParams;

  const genreStr = Array.isArray(genre) ? genre[0] : String(genre ?? "");
  const pageStr = Array.isArray(page) ? page[0] : page;

  const { results: genreMovies, total_pages } = await getMovieByGenres(
    String(genreStr),
    pageStr,
  );

  const genresData = await getGenres();
  const genreId = Number(genreStr);
  const currentGenre = genresData?.genres?.find((g) => g.id === genreId) ?? {
    id: genreId || 0,
    name: String(genreStr) || "",
  };

  return (
    <div className="my-30 flex justify-center">
      <div className="flex justify-center">
        <div className="flex justify-between w-400 max-w-full max-xl:block">
          <div className="mt-4 w-75 max-w-full flex flex-col gap-4">
            <h2 className="text-[30px] max-md:text-[20px] font-semibold">
              Search Filter
            </h2>
            <div className="flex flex-wrap gap-2">
              {(genresData?.genres ?? []).map((g) => (
                <Link
                  key={g.id}
                  href={`/genre?genre=${g.id}`}
                  className="px-3 py-1 border rounded-full text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div>
              {total_pages} title in {currentGenre.name}
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
    </div>
  );
};

export default GenreMovies;
