import { MoreMovies } from "@/components/more-movies";
import { CategoriesReturn } from "@/components/moviecard-tags";
import { getTopRatedMovies } from "@/lib/api";

export default async function Movies() {
  const { results: TopRatedMovies } = await getTopRatedMovies();

  return (
    <div className="flex flex-col items-center w-full mb-30">
      <div className="max-w-full">
        <CategoriesReturn onClick={"/"} text="Popular Movies" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MoreMovies movies={TopRatedMovies} />
        </div>
      </div>
    </div>
  );
}
