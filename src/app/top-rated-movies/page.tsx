import { MovieList } from "@/components/movie-lists";
import { CategoriesReturn } from "@/components/moviecard-tags";
import { getTopRatedMovies } from "@/lib/api";

export default async function Movies() {
  const { results: TopRatedMovies } = await getTopRatedMovies();

  return (
    <div className="flex flex-col items-center w-full mb-30">
      <div className="max-w-full">
        <CategoriesReturn onClick={"/"} text="Popular Movies" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={TopRatedMovies} showAll={true} />
        </div>
      </div>
    </div>
  );
}
