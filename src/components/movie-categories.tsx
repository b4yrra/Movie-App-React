import {
  MovieList,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from "./movie-lists";
import { CategoriesTag } from "./moviecard-tags";

export const Movies = () => {
  return (
    <div className="flex flex-col items-center w-full mb-20">
      <div>
        <CategoriesTag onClick="/upcoming" text="Upcoming" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={upcomingMovies} />
        </div>
      </div>
      <div>
        <CategoriesTag onClick="/popular" text="Popular" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={popularMovies} />
        </div>
      </div>
      <div>
        <CategoriesTag onClick="/top-rated" text="Top Rated" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MovieList movies={topRatedMovies} />
        </div>
      </div>
    </div>
  );
};
