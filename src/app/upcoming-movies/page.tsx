import { Pagination } from "@/components/ui/pagination";
import { getUpcomingMovies } from "@/lib/api";
import { CategoriesReturn } from "../components/moviecard-tags";
import { MovieList } from "../components/movie-lists";
import { PaginationBar } from "../components/pagination";

export default async function Movies() {
  const { results: UpcomingMovies } = await getUpcomingMovies();

  return (
    <div className="flex flex-col items-center w-full mb-30">
      <div className="max-w-full">
        <CategoriesReturn onClick={"/"} text="Upcoming" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={UpcomingMovies} showAll={true} />
        </div>
        <div className="mt-10">
          <PaginationBar />
        </div>
      </div>
    </div>
  );
}
