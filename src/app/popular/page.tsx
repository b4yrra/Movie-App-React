import { CategoriesReturn } from "@/components/moviecard-tags";
import { PopularMovies } from "@/components/popular-moviecards";

export default function Movies() {
  return (
    <div className="flex flex-col items-center">
      <CategoriesReturn onClick={"/"} text="Upcoming" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 p-4">
        <PopularMovies />
      </div>
    </div>
  );
}
