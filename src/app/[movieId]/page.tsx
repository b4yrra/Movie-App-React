import { MovieDetails } from "@/components/movie-details";
import { getMovieDetails } from "@/lib/get-movie-details";

export default async function Home() {
  const movie = await getMovieDetails(278);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-full p-10">
        <h1 className="text-[24px] font-semibold">Movie Details</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 p-4">
        <MovieDetails movies={[movie]} />
      </div>
    </div>
  );
}
