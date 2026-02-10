import { MoreMovies } from "@/components/more-movies";
import { CategoriesReturn } from "@/components/moviecard-tags";
import { getUpcomingMovies } from "@/lib/api";

export default async function Movies() {
  const { results: UpcomingMovies } = await getUpcomingMovies();

  return (
    <div className="flex flex-col items-center mb-30">
      <CategoriesReturn onClick={"/"} text="Upcoming" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
        <MoreMovies movies={UpcomingMovies} />
      </div>
    </div>
  );
}
