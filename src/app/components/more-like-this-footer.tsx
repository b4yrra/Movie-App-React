import { MoreLikeThisResult } from "@/lib/more-like-type";
import { MoreLikeThisMovies } from "./more-like-movie-lists";
import { CategoriesTag } from "./moviecard-tags";
import { getSimilarMovies } from "@/lib/get-more-like";

type MoreLikeProps = {
  movieId: string;
  category?: string;
};

export const MoreLike = async ({ movieId, category }: MoreLikeProps) => {
  const currentPage = 1;
  const movieResponse = await getSimilarMovies(movieId, currentPage.toString());

  const total_pages = movieResponse?.total_pages;

  return (
    <div className="max-w-full">
      <CategoriesTag
        onClick={`/similar-movies/${movieId}`}
        text="More Like This"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-4">
        <MoreLikeThisMovies
          movies={movieResponse.results}
          showAll={category === "similar-movies"}
        />
      </div>
    </div>
  );
};
