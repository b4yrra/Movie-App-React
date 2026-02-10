import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/api";
import { MovieList } from "./movie-lists";
import { CategoriesTag } from "./moviecard-tags";

export const Movies = async () => {
  const { results: PopularMovies } = await getPopularMovies();
  const { results: UpcomingMovies } = await getUpcomingMovies();
  const { results: TopRatedMovies } = await getTopRatedMovies();
  return (
    <div className="flex flex-col items-center w-full mb-20">
      <div className="max-w-full">
        <CategoriesTag onClick="/upcoming-movies" text="Upcoming" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={UpcomingMovies} />
        </div>
      </div>
      <div className="max-w-full">
        <CategoriesTag onClick="/popular" text="Popular" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={PopularMovies} />
        </div>
      </div>
      <div className="max-w-full">
        <CategoriesTag onClick="/top-rated-movies" text="Top Rated" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={TopRatedMovies} />
        </div>
      </div>
    </div>
  );
};
