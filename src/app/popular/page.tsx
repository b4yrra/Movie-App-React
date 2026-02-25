import { getPopularMovies } from "@/lib/api";
import { CategoriesReturn } from "../components/moviecard-tags";
import { MovieList } from "../components/movie-lists";
import { PaginationBar } from "../components/pagination";

type MoviesProps = {
  searchParams: Promise<{ page: string | undefined }>;
};

export default async function Movies({ searchParams }: MoviesProps) {
  const { page } = await searchParams;

  const { results: PopularMovies, total_pages } = await getPopularMovies(page);

  return (
    <div className="flex flex-col items-center w-full mb-30">
      <div className="max-w-full">
        <CategoriesReturn onClick={"/"} text="Popular Movies" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={PopularMovies} showAll={true} />
        </div>
        <div className="mt-10">
          <PaginationBar
            currentPage={Number(page) || 1}
            totalPages={total_pages}
          />
        </div>
      </div>
    </div>
  );
}
