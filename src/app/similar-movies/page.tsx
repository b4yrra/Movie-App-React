import { MoreLikeThisMovies } from "@/app/components/more-like-movie-lists";
import { CategoriesReturn } from "@/app/components/moviecard-tags";
import { getSimilarMovies } from "@/lib/get-more-like";

const Home = async ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = await params;

  const movie = await getSimilarMovies(movieId);

  return (
    <div className="flex flex-col items-center w-full mb-30">
      <div className="max-w-full">
        <CategoriesReturn onClick={"/"} text="More Like This" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MoreLikeThisMovies movies={movie.results} showAll={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;
