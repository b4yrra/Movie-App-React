import { MoreLikeThisMovies } from "@/app/components/more-like-movie-lists";
import { CategoriesReturn } from "@/app/components/moviecard-tags";
import { PaginationBar } from "@/app/components/pagination";
import { getSimilarMovies } from "@/lib/get-more-like";

const Home = async ({
  params,
  searchParams, // NEW: read page from URL
}: {
  params: Promise<{ movieId: string }>;
  searchParams: Promise<{ page?: string }>; // NEW
}) => {
  const { movieId } = await params;
  const { page } = await searchParams; // NEW
  const currentPage = Number(page) || 1; // NEW: was hardcoded to 1

  const movieResponse = await getSimilarMovies(movieId, page); // NEW: pass page

  return (
    <div className="flex flex-col items-center w-full mb-30">
      <div className="max-w-full">
        <CategoriesReturn onClick={"/"} text="More Like This" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          <MoreLikeThisMovies movies={movieResponse.results} showAll={true} />
        </div>
        <div className="mt-10">
          <PaginationBar
            currentPage={currentPage} // NEW: was hardcoded to 1
            totalPages={movieResponse.total_pages}
            basePath={`/similar-movies/${movieId}`} // NEW: was missing, caused /genre redirect
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
